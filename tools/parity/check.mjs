#!/usr/bin/env node
// 接口对齐检查：antdv-next-uni 的每个组件要与 antdv-next-mobile 的同名组件“同名、同属性、同事件”。
//
//   node tools/parity/check.mjs                # 报告 + 未登记的差异时退出码为 1
//   node tools/parity/check.mjs --report       # 只输出报告
//   MOBILE_DIR=/path/to/antdv-next-mobile node tools/parity/check.mjs
//
// 做法：读移动端每个组件的 interface.ts（XxxProps 的字段、XxxEmits 的键），读 uni 端组件的
// defineProps({...}) / defineEmits([...])，逐个比较。uni-app x 做不到、或有意不同的地方登记在
// known/<组件>.json（带原因），其余的差异都算缺陷。
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const mobileRoot = process.env.MOBILE_DIR ?? join(root, '..', 'antdv-next-mobile')
const mobileSrc = join(mobileRoot, 'packages', 'antdv-next-mobile', 'src')
const uniComponents = join(root, 'uni_modules', 'antdv-next-uni', 'components')
// 每个组件一个文件（tools/parity/known/<组件>.json），所有组件共有的差异在 _common.json
const knownDir = join(here, 'known')
const known = {}
for (const file of readdirSync(knownDir)) {
  if (!file.endsWith('.json'))
    continue
  const name = file.slice(0, -5)
  known[name === '_common' ? '*' : name] = JSON.parse(readFileSync(join(knownDir, file), 'utf8'))
}

if (!existsSync(mobileSrc)) {
  console.error(`找不到 antdv-next-mobile 的源码：${mobileSrc}\n用 MOBILE_DIR 指定它的仓库目录。`)
  process.exit(2)
}

const pascal = name => name.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')

/** uni 组件名（去掉 am-）→ 移动端的 [目录, 类型前缀]；不在表里的按同名目录找 */
const locations = {
  'config-provider': ['config-provider', 'ConfigProvider', 'context.ts'],
  'list-item': ['list', 'ListItem'],
  'form-item': ['form', 'FormItem'],
  'checkbox-group': ['checkbox', 'CheckboxGroup'],
  'radio-group': ['radio', 'RadioGroup'],
  'collapse-panel': ['collapse', 'CollapsePanel'],
  'dropdown-item': ['dropdown', 'DropdownItem'],
  'index-bar-anchor': ['index-bar', 'IndexBarAnchor'],
  'space-compact': ['space', 'SpaceCompact'],
  'space-addon': ['space', 'SpaceAddon'],
  'avatar-group': ['avatar', 'AvatarGroup'],
  'checkable-tag': ['tag', 'CheckableTag'],
  'row': ['grid', 'Row'],
  'col': ['grid', 'Col'],
  'text-area': ['input', 'TextArea'],
  'textarea': ['input', 'TextArea'],
  'input-search': ['input', 'InputSearch'],
  'input-password': ['input', 'InputPassword'],
  'input-otp': ['input', 'InputOTP'],
}

/** 取出 `interface Name ... { ... }` 花括号里的内容（处理嵌套） */
function interfaceBody(source, name) {
  const match = new RegExp(`(?:export\\s+)?interface\\s+${name}\\b[^{]*\\{`).exec(source)
  if (!match)
    return null
  let depth = 1
  let index = match.index + match[0].length
  const start = index
  while (index < source.length && depth > 0) {
    const char = source[index]
    if (char === '{')
      depth++
    else if (char === '}')
      depth--
    index++
  }
  return source.slice(start, index - 1)
}

/** 接口顶层的字段名（忽略嵌套对象里的） */
function topLevelKeys(body) {
  const keys = []
  let depth = 0
  const text = body.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
  for (const line of text.split('\n')) {
    if (depth === 0) {
      const match = /^\s*(?:'([^']+)'|"([^"]+)"|([\w$]+))\s*\??\s*:/.exec(line)
      if (match)
        keys.push(match[1] ?? match[2] ?? match[3])
    }
    for (const char of line) {
      if (char === '{' || char === '(' || char === '[')
        depth++
      else if (char === '}' || char === ')' || char === ']')
        depth--
    }
  }
  return keys
}

function readMobile(component) {
  const [dir, prefix, file = 'interface.ts'] = locations[component] ?? [component, pascal(component)]
  const path = join(mobileSrc, dir, file)
  if (!existsSync(path))
    return null
  const source = readFileSync(path, 'utf8')
  const propsBody = interfaceBody(source, `${prefix}Props`)
  if (propsBody === null)
    return null
  const emitsBody = interfaceBody(source, `${prefix}Emits`)
  return {
    props: topLevelKeys(propsBody),
    emits: emitsBody === null ? [] : topLevelKeys(emitsBody),
  }
}

function readUni(component) {
  const path = join(uniComponents, `am-${component}`, `am-${component}.uvue`)
  const source = readFileSync(path, 'utf8')
  const props = []
  const propsMatch = /defineProps\(\{([\s\S]*?)\n\}\)/.exec(source)
  if (propsMatch) {
    for (const line of propsMatch[1].split('\n')) {
      const match = /^\t([\w$]+)\s*:\s*\{/.exec(line)
      if (match)
        props.push(match[1])
    }
  }
  const emitsMatch = /defineEmits\(\[([\s\S]*?)\]\)/.exec(source)
  const emits = emitsMatch ? [...emitsMatch[1].matchAll(/'([^']+)'/g)].map(m => m[1]) : []
  return { props, emits }
}

const reportOnly = process.argv.includes('--report')
const components = readdirSync(uniComponents)
  .filter(name => name.startsWith('am-'))
  .map(name => name.slice(3))
  .sort()

let unexpected = 0
let compared = 0
const uniOnly = []
const staleEntries = []

for (const component of components) {
  const mobile = readMobile(component)
  const uni = readUni(component)
  // "*" 里登记的是所有组件共有的差异
  const own = known[component] ?? {}
  const common = known['*'] ?? {}
  const entry = {
    ...own,
    missingProps: { ...common.missingProps, ...own.missingProps },
    extraProps: { ...common.extraProps, ...own.extraProps },
    missingEmits: { ...common.missingEmits, ...own.missingEmits },
    extraEmits: { ...common.extraEmits, ...own.extraEmits },
  }
  if (mobile === null) {
    uniOnly.push(component)
    if (!entry.uniOnly) {
      unexpected++
      console.log(`\n✖ am-${component}：antdv-next-mobile 中没有对应的组件（若是 uni 端特有的，在 tools/parity/known/<组件>.json 里写 "uniOnly": "原因"）`)
    }
    continue
  }
  compared++
  const lines = []
  const check = (kind, mobileList, uniList) => {
    const missing = mobileList.filter(name => !uniList.includes(name))
    const extra = uniList.filter(name => !mobileList.includes(name))
    const knownMissing = entry[`missing${kind}`] ?? {}
    const knownExtra = entry[`extra${kind}`] ?? {}
    for (const name of missing) {
      if (knownMissing[name])
        lines.push(`  · 缺少${kind === 'Props' ? '属性' : '事件'} ${name}（已登记：${knownMissing[name]}）`)
      else {
        unexpected++
        lines.push(`  ✖ 缺少${kind === 'Props' ? '属性' : '事件'} ${name}`)
      }
    }
    for (const name of extra) {
      if (knownExtra[name])
        lines.push(`  · 多出${kind === 'Props' ? '属性' : '事件'} ${name}（已登记：${knownExtra[name]}）`)
      else {
        unexpected++
        lines.push(`  ✖ 多出${kind === 'Props' ? '属性' : '事件'} ${name}`)
      }
    }
    // 只核对这个组件自己登记的条目（"*" 里的不一定每个组件都有）
    for (const name of Object.keys(own[`missing${kind}`] ?? {})) {
      if (!missing.includes(name))
        staleEntries.push(`${component}.missing${kind}.${name}`)
    }
    for (const name of Object.keys(own[`extra${kind}`] ?? {})) {
      if (!extra.includes(name))
        staleEntries.push(`${component}.extra${kind}.${name}`)
    }
  }
  check('Props', mobile.props, uni.props)
  check('Emits', mobile.emits, uni.emits)
  const same = mobile.props.filter(name => uni.props.includes(name)).length
  console.log(`\nam-${component}：${same} / ${mobile.props.length} 个属性同名${lines.length ? '' : '，完全一致'}`)
  lines.forEach(line => console.log(line))
}

console.log(`\n共比较 ${compared} 个组件；uni 端特有 ${uniOnly.length} 个${uniOnly.length ? `（${uniOnly.map(n => `am-${n}`).join('、')}）` : ''}。`)
if (staleEntries.length) {
  unexpected += staleEntries.length
  console.log(`\n✖ tools/parity/known/ 里有已经不存在的差异，请删掉：\n  ${staleEntries.join('\n  ')}`)
}
if (unexpected > 0) {
  console.log(`\n✖ ${unexpected} 处未登记的差异。要么对齐，要么登记到 tools/parity/known/<组件>.json 并写明原因。`)
  if (!reportOnly)
    process.exit(1)
}
else {
  console.log('\n✔ 没有未登记的差异。')
}
