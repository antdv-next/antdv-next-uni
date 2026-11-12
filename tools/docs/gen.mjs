#!/usr/bin/env node
// 组件文档生成：读 uni_modules/antdv-next-uni/components/am-*/am-*.uvue，每个组件生成一份
// docs/components/<组件>.md（不带 am- 前缀），外加 docs/components/README.md（按首页的分组列出）。
//
//   node tools/docs/gen.mjs            # 生成（多余的旧文件会删掉）
//   node tools/docs/gen.mjs --check    # 只在内存里生成，与磁盘上的不一致时列出文件并以退出码 1 结束（CI 用）
//
// 内容全部来自本仓库，不读 antdv-next-mobile（CI 里没有它，生成结果必须与本地逐字节相同）：
//   - 标题、说明、差异说明：组件 <script> 顶部的 `//` 注释（第一段是说明，“与 antdv-next-mobile 的差异”一段是差异）；
//   - 属性：defineProps({...})，说明取属性前面的 /** */，没有时从顶部注释的“名字（说明）”里找；
//   - 事件：defineEmits([...])，参数从源码里的 emit('名字', ...) 调用推导；
//   - 插槽：模板里的 <slot>；方法：defineExpose({...})；
//   - 用法：pages/components/<组件>.uvue 里第一个 <am-xxx>；
//   - 差异表：tools/parity/known/<组件>.json 与 _common.json；
//   - 分组：pages/index/index.uvue 的 groups。
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const componentsDir = join(root, 'uni_modules', 'antdv-next-uni', 'components')
const pagesDir = join(root, 'pages', 'components')
const knownDir = join(root, 'tools', 'parity', 'known')
const outDir = join(root, 'docs', 'components')
const MOBILE_SITE = 'https://m.antdv-next.com/components/'
const OTHER_GROUP = '其他 / 子组件'
const BANNER = '<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->'
/** 用法片段超过这么多行就只给示例页的链接 */
const MAX_SNIPPET_LINES = 30

const warnings = []
const warn = (component, message) => warnings.push(`am-${component}：${message}`)

// ---------------------------------------------------------------- 通用的小工具

const read = path => readFileSync(path, 'utf8')
const pascal = name => name.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')

/**
 * 正文里的 `<am-foo>`、`<text>` 这类标签在 Markdown 里会被当成 HTML 吃掉：不在反引号里的包上反引号。
 * 反引号成对的部分原样保留。
 */
function prose(text) {
  return String(text).split(/(`[^`]*`)/).map(part => (part.startsWith('`') ? part : part.replace(/<\/?[A-Za-z][^<>`\n]*>/g, tag => `\`${tag}\``))).join('')
}

/** 表格单元格：竖线转义、换行变空格 */
const cell = text => prose(text).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim() || '-'
const code = text => `\`${String(text).replace(/\|/g, '\\|')}\``

/**
 * 从 open（一个开括号的位置）起找到配对的闭括号，返回它的位置；跳过字符串、模板字符串和注释。
 * 找不到返回 -1。
 */
function matchBracket(source, open) {
  const pairs = { '(': ')', '[': ']', '{': '}' }
  const stack = []
  for (let index = open; index < source.length; index++) {
    const char = source[index]
    if (char === '\'' || char === '"' || char === '`') {
      index = skipString(source, index)
      continue
    }
    if (char === '/' && source[index + 1] === '/') {
      const end = source.indexOf('\n', index)
      index = end < 0 ? source.length : end
      continue
    }
    if (char === '/' && source[index + 1] === '*') {
      const end = source.indexOf('*/', index + 2)
      index = end < 0 ? source.length : end + 1
      continue
    }
    if (pairs[char])
      stack.push(pairs[char])
    else if (char === ')' || char === ']' || char === '}') {
      if (stack.pop() !== char)
        return -1
      if (stack.length === 0)
        return index
    }
  }
  return -1
}

/** 字符串从 start（引号）开始，返回结束引号的位置 */
function skipString(source, start) {
  const quote = source[start]
  for (let index = start + 1; index < source.length; index++) {
    if (source[index] === '\\')
      index++
    else if (source[index] === quote)
      return index
  }
  return source.length
}

/**
 * 把对象 / 数组字面量的内容按顶层的逗号拆开。每一项带上它前面的注释（/** *​/ 与 //）。
 * 泛型的尖括号（PropType<Map<string, string>>）里的逗号不算。
 */
function splitTopLevel(body) {
  const items = []
  let depth = 0
  let angle = 0
  let text = ''
  let comments = []
  const flush = () => {
    if (text.trim().length > 0)
      items.push({ text: text.trim(), doc: comments.join(' ').trim() })
    text = ''
    comments = []
  }
  for (let index = 0; index < body.length; index++) {
    const char = body[index]
    if (char === '\'' || char === '"' || char === '`') {
      const end = skipString(body, index)
      text += body.slice(index, end + 1)
      index = end
      continue
    }
    if (char === '/' && (body[index + 1] === '/' || body[index + 1] === '*')) {
      const block = body[index + 1] === '*'
      let end = block ? body.indexOf('*/', index + 2) : body.indexOf('\n', index)
      if (end < 0)
        end = body.length
      const raw = body.slice(index, block ? end + 2 : end)
      // 只收一项开头之前的注释（写在值中间的注释丢掉）
      if (depth === 0 && text.trim().length === 0)
        comments.push(cleanComment(raw))
      index = block ? end + 1 : end - 1
      continue
    }
    if (char === '(' || char === '[' || char === '{')
      depth++
    else if (char === ')' || char === ']' || char === '}')
      depth--
    else if (char === '<' && /[\w$]/.test(body[index - 1] ?? ''))
      angle++
    else if (char === '>' && angle > 0 && body[index - 1] !== '=')
      angle--
    if (char === ',' && depth === 0 && angle === 0) {
      flush()
      continue
    }
    text += char
  }
  flush()
  return items
}

/** 去掉注释的标记，多行合成一行 */
function cleanComment(raw) {
  if (raw.startsWith('//'))
    return raw.replace(/^\/\/\s?/, '').trim()
  return joinLines(raw.replace(/^\/\*+/, '').replace(/\*+\/$/, '').split('\n').map(line => line.replace(/^\s*\*\s?/, '').trim()).filter(Boolean))
}

/** 把折行的中文注释接回一行：两边都是 ASCII 字符时中间补一个空格 */
function joinLines(lines) {
  let result = ''
  for (const line of lines) {
    const next = line.trim()
    if (next.length === 0)
      continue
    // 中文与西文之间也补（“按\ntype” → “按 type”），标点后面不补
    const ascii = /[\x21-\x7E]$/.test(result) && /^[\x21-\x7E]/.test(next)
    const mixed = (/[\u4E00-\u9FFF]$/.test(result) && /^[\w`<'"]/.test(next)) || (/[\w`>'"]$/.test(result) && /^[\u4E00-\u9FFF]/.test(next))
    if (result.length > 0 && (ascii || mixed))
      result += ' '
    result += next
  }
  return result
}

/** `key: value` 拆成 [key, value]；简写（只有名字）时 value 为 null */
function splitEntry(text) {
  const match = /^(?:'([^']+)'|"([^"]+)"|([\w$]+))\s*(\??)\s*:\s*([\s\S]*)$/.exec(text)
  if (match)
    return [match[1] ?? match[2] ?? match[3], match[5].trim()]
  const method = /^(?:async\s+)?([\w$]+)\s*(\([\s\S]*)$/.exec(text)
  if (method)
    return [method[1], method[2].trim()]
  return [text.trim(), null]
}

// ---------------------------------------------------------------- 读组件

function sections(source, component) {
  const scriptOpen = /<script\b[^>]*>/.exec(source)
  const scriptEnd = source.indexOf('</script>')
  const script = scriptOpen && scriptEnd > 0 ? source.slice(scriptOpen.index + scriptOpen[0].length, scriptEnd) : ''
  if (!script)
    warn(component, '没有找到 <script>')
  const templateStart = source.indexOf('<template>', Math.max(scriptEnd, 0))
  const templateEnd = source.lastIndexOf('</template>')
  const template = templateStart >= 0 && templateEnd > templateStart ? source.slice(templateStart + 10, templateEnd) : ''
  if (!template)
    warn(component, '没有找到 <template>')
  return { script, template }
}

/**
 * <script> 顶部的注释：第一段连续的行首 `//`，按空的 `//` 行分段。
 * 每段是若干“块”：普通文字或以 `- ` 开头的列表项（续行接到上一块）。
 */
function readHeader(script, component) {
  const lines = script.split('\n')
  const start = lines.findIndex(line => line.startsWith('//'))
  if (start < 0) {
    warn(component, '<script> 顶部没有说明注释')
    return []
  }
  const paragraphs = []
  let blocks = []
  let end = start
  for (; end < lines.length && lines[end].startsWith('//'); end++) {
    const text = lines[end].replace(/^\/\/ ?/, '')
    if (text.trim().length === 0) {
      if (blocks.length)
        paragraphs.push(blocks)
      blocks = []
      continue
    }
    const last = blocks[blocks.length - 1]
    // 缩进四格以上、单独成段的是代码示例
    if (/^ {4,}\S/.test(text) && (!last || last.code))
      last ? last.lines.push(text) : blocks.push({ code: true, bullet: false, lines: [text] })
    else if (text.startsWith('- '))
      blocks.push({ bullet: true, lines: [text.slice(2)] })
    else if (blocks.length > 0 && (/^\s/.test(text) || !blocks[blocks.length - 1].bullet))
      blocks[blocks.length - 1].lines.push(text)
    else
      blocks.push({ bullet: false, lines: [text] })
  }
  if (blocks.length)
    paragraphs.push(blocks)
  const after = lines.slice(end).find(line => line.trim().length > 0) ?? ''
  if (!after.startsWith('defineOptions'))
    warn(component, '顶部注释后面不是 defineOptions，说明可能取错了')
  return paragraphs.map(list => list.map((block) => {
    if (!block.code)
      return { bullet: block.bullet, text: joinLines(block.lines) }
    const indent = Math.min(...block.lines.map(line => /^ */.exec(line)[0].length))
    return { code: true, bullet: false, text: block.lines.map(line => line.slice(indent).trimEnd()).join('\n') }
  }))
}

const TYPE_NAMES = { String: 'string', Number: 'number', Boolean: 'boolean', Array: 'any[]', Object: 'object', Function: 'Function' }

/** defineProps 里 type 的写法 → 文档里的类型 */
function propType(raw) {
  if (!raw)
    return 'any'
  const generic = /\bas\s+PropType\s*<([\s\S]*)>\s*$/.exec(raw)
  if (generic)
    return generic[1].replace(/\s+/g, ' ').trim()
  const list = /^\[([\s\S]*)\]$/.exec(raw)
  if (list)
    return list[1].split(',').map(item => TYPE_NAMES[item.trim()] ?? item.trim()).join(' | ')
  return TYPE_NAMES[raw] ?? raw
}

/** default 的写法 → 文档里的默认值；工厂函数取它的返回值 */
function propDefault(raw) {
  if (raw === null || raw === undefined)
    return ''
  let text = raw.trim()
  const factory = /^\(\s*\)\s*(?::\s*[^=]+?)?\s*=>\s*([\s\S]+)$/.exec(text)
  if (factory) {
    text = factory[1].trim()
    const block = /^\{\s*return\s+([\s\S]+?);?\s*\}$/.exec(text)
    if (block)
      text = block[1].trim()
    else if (text.startsWith('(') && matchBracket(text, 0) === text.length - 1)
      text = text.slice(1, -1).trim()
  }
  // `[] as number[]` 这种只为了过类型检查的断言去掉
  return text.replace(/\s*\n\s*/g, ' ').replace(/^(\[\]|\{\}|null)\s+as\s+.+$/, '$1')
}

function readProps(script, component) {
  const start = script.indexOf('defineProps(')
  if (start < 0)
    return []
  const open = start + 'defineProps('.length
  if (script[open] !== '{') {
    warn(component, 'defineProps 不是对象字面量的写法，属性没有解析')
    return []
  }
  const close = matchBracket(script, open)
  if (close < 0) {
    warn(component, 'defineProps 的花括号没有配对')
    return []
  }
  const props = []
  for (const item of splitTopLevel(script.slice(open + 1, close))) {
    const [name, value] = splitEntry(item.text)
    if (value === null) {
      warn(component, `看不懂的属性声明：${item.text.slice(0, 40)}`)
      continue
    }
    const prop = { name, type: 'any', default: '', required: false, doc: item.doc }
    if (value.startsWith('{') && matchBracket(value, 0) === value.length - 1) {
      // name: { type: ..., default: ..., required: ... }
      for (const field of splitTopLevel(value.slice(1, -1))) {
        const [key, fieldValue] = splitEntry(field.text)
        if (key === 'type')
          prop.type = propType(fieldValue)
        else if (key === 'default')
          prop.default = propDefault(fieldValue)
        else if (key === 'required')
          prop.required = fieldValue === 'true'
        else if (key !== 'validator')
          warn(component, `属性 ${name} 里有不认识的字段 ${key}`)
      }
    }
    else {
      // name: String / name: [String, Number] / name: Array as PropType<...>
      prop.type = propType(value)
    }
    props.push(prop)
  }
  return props
}

function readEmits(script, component) {
  const start = script.indexOf('defineEmits(')
  if (start < 0)
    return []
  const open = start + 'defineEmits('.length
  if (script[open] !== '[') {
    warn(component, 'defineEmits 不是数组的写法，事件没有解析')
    return []
  }
  const close = matchBracket(script, open)
  return splitTopLevel(script.slice(open + 1, close)).map(item => item.text.replace(/^['"]|['"]$/g, ''))
}

/** 在 position 所在的顶层声明里、它之前最近的一处 `name : Type`（UTS 的参数 / 变量的类型注解，冒号前有空格）或 ref / computed 的声明里找类型 */
function typeOfIdentifier(script, name, position) {
  // 只在 emit 所在的那个顶层声明里找（行首的 function / const / watch(…），别的函数里同名的变量不算
  let scopeStart = 0
  for (const match of script.slice(0, position).matchAll(/^[^\s})\]/].*$/gm))
    scopeStart = match.index
  const before = script.slice(scopeStart, position)
  const escaped = name.replace(/\$/g, '\\$')
  let found = ''
  const annotation = new RegExp(`(?<![\\w$.])${escaped}\\s+:\\s*([^,)=\\n]+?)\\s*(?=[,)=\\n])`, 'g')
  for (const match of before.matchAll(annotation))
    found = match[1].trim()
  return found
}

/** `name.value` 的类型：const name = ref<T>(…) / ref(false) / computed(() : T => …) */
function typeOfRef(script, name) {
  const escaped = name.replace(/\$/g, '\\$')
  const typed = new RegExp(`(?:const|let)\\s+${escaped}\\s*=\\s*(?:ref|shallowRef)\\s*<`).exec(script)
  if (typed) {
    const start = typed.index + typed[0].length
    let depth = 1
    let index = start
    for (; index < script.length && depth > 0; index++) {
      if (script[index] === '<')
        depth++
      else if (script[index] === '>' && script[index - 1] !== '=')
        depth--
    }
    return script.slice(start, index - 1).trim()
  }
  const computedMatch = new RegExp(`(?:const|let)\\s+${escaped}\\s*=\\s*computed\\s*(?:<([^>\\n]+)>)?\\(\\s*\\(\\s*\\)\\s*(?::\\s*([^=\\n]+?))?\\s*=>`).exec(script)
  if (computedMatch)
    return (computedMatch[1] ?? computedMatch[2] ?? '').trim()
  const literal = new RegExp(`(?:const|let)\\s+${escaped}\\s*=\\s*ref\\(\\s*([^)\\n]*)\\)`).exec(script)
  if (literal)
    return typeOfLiteral(literal[1].trim())
  return ''
}

function typeOfLiteral(text) {
  if (/^'.*'$|^".*"$|^`.*`$/.test(text))
    return 'string'
  if (text === 'true' || text === 'false')
    return 'boolean'
  if (/^-?\d+(\.\d+)?$/.test(text))
    return 'number'
  return ''
}

/**
 * 事件的参数：把源码（脚本 + 模板）里所有 emit('name', a, b) 的实参按位置合并。
 * 类型只在能确定时给出（字面量、带类型注解的标识符、props.x、xxx.value），否则留空。
 */
function readEmitPayloads(source, script, props, component) {
  const payloads = new Map()
  const scriptOffset = source.indexOf(script)
  for (const match of source.matchAll(/(?<![\w$.])emit\(\s*(['"])([^'"]+)\1/g)) {
    const open = match.index + match[0].indexOf('(')
    const close = matchBracket(source, open)
    if (close < 0) {
      warn(component, `emit('${match[2]}') 的括号没有配对`)
      continue
    }
    const position = match.index - scriptOffset
    const inScript = scriptOffset >= 0 && position >= 0 && position < script.length
    const args = splitTopLevel(source.slice(open + 1, close)).slice(1).map((item) => {
      const text = item.text.replace(/\s+/g, ' ')
      let name = ''
      let type = typeOfLiteral(text)
      const literal = type === 'string' && /^'[^']+'$/.test(text) ? text : ''
      const prop = /^props\.([\w$]+)$/.exec(text)
      const refValue = /^([\w$]+)\.value$/.exec(text)
      if (prop) {
        name = prop[1]
        type = props.find(item => item.name === prop[1])?.type ?? ''
      }
      else if (refValue && new RegExp(`(?:const|let)\\s+${refValue[1].replace(/\$/g, '\\$')}\\s*=\\s*(?:ref|shallowRef|computed)\\b`).test(script)) {
        name = refValue[1]
        type = typeOfRef(script, refValue[1])
      }
      else if (/^[\w$]+$/.test(text) && !type) {
        name = text
        if (inScript)
          type = typeOfIdentifier(script, text, position)
      }
      else if (/^[\w$]+\.[\w$]+$/.test(text)) {
        name = text.split('.')[1]
      }
      return { text, name, type, literal }
    })
    if (!payloads.has(match[2]))
      payloads.set(match[2], [])
    payloads.get(match[2]).push(args)
  }
  return payloads
}

/** 一个事件的所有调用合并成一行签名：`(value: string, option?: AmOption)` */
function emitSignature(name, calls, props) {
  if (!calls || calls.length === 0)
    return { signature: '', unknown: false, uncalled: true }
  const count = Math.max(...calls.map(args => args.length))
  if (count === 0)
    return { signature: '()', unknown: false, uncalled: false }
  const model = /^update:(.+)$/.exec(name)
  const modelProp = model ? props.find(prop => prop.name === model[1]) : null
  const parts = []
  let unknown = false
  for (let index = 0; index < count; index++) {
    const present = calls.map(args => args[index]).filter(Boolean)
    const optional = present.length < calls.length
    let label = present.find(arg => arg.name)?.name ?? ''
    const types = [...new Set(present.map(arg => arg.type).filter(Boolean))]
    let type = types.join(' | ')
    // 每次调用传的都是非空的字符串字面量：列出取值（'maxSize' | 'maxCount'）
    if (present.length > 1 && present.every(arg => arg.literal))
      type = [...new Set(present.map(arg => arg.literal))].join(' | ')
    if (index === 0 && modelProp) {
      label = modelProp.name
      type = modelProp.type
    }
    if (!label)
      label = count === 1 ? 'payload' : `arg${index + 1}`
    // 有的调用推不出类型：不拿推出来的那部分冒充全部
    if (!type || (!(index === 0 && modelProp) && present.some(arg => !arg.type))) {
      unknown = true
      type = ''
    }
    parts.push(`${label}${optional ? '?' : ''}${type ? `: ${type}` : ''}`)
  }
  return { signature: `(${parts.join(', ')})`, unknown, uncalled: false }
}

/** 模板里的标签：从 `<name` 开始找到这个开标签的 `>`（跳过引号里的） */
function tagEnd(template, start) {
  for (let index = start; index < template.length; index++) {
    const char = template[index]
    if (char === '"' || char === '\'')
      index = skipString(template, index)
    else if (char === '>')
      return index
  }
  return -1
}

/** 开标签里的属性：[名字, 值]（没有值的为 true） */
function tagAttributes(tag) {
  const attributes = []
  const body = tag.replace(/^<[\w-]+/, '').replace(/\/?>$/, '')
  for (const match of body.matchAll(/([:@#]?[\w.:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g))
    attributes.push([match[1], match[2] ?? match[3] ?? true])
  return attributes
}

function readSlots(template, script, component) {
  const slots = new Map()
  for (const match of template.matchAll(/<slot(?=[\s/>])/g)) {
    const end = tagEnd(template, match.index)
    if (end < 0)
      continue
    const tag = template.slice(match.index, end + 1)
    let name = 'default'
    let dynamic = false
    const params = []
    for (const [key, value] of tagAttributes(tag)) {
      if (key === 'name')
        name = value
      else if (key === ':name' || key === 'v-bind:name') {
        name = value
        dynamic = true
      }
      else if (key === 'v-bind') {
        params.push(`...${value}`)
      }
      else if (key.startsWith(':') && key !== ':key') {
        params.push(key.slice(1))
      }
      else if (!key.startsWith('v-') && !key.startsWith('@') && !key.startsWith(':') && key !== 'key') {
        params.push(key)
      }
    }
    let fallback = false
    if (!tag.endsWith('/>')) {
      const close = template.indexOf('</slot>', end)
      if (close < 0)
        warn(component, `插槽 ${name} 没有找到 </slot>`)
      else
        fallback = template.slice(end + 1, close).trim().length > 0
    }
    const key = (dynamic ? ':' : '') + name
    const slot = slots.get(key) ?? { name, dynamic, params: [], fallback: false }
    for (const param of params) {
      if (!slot.params.includes(param))
        slot.params.push(param)
    }
    slot.fallback = slot.fallback || fallback
    slots.set(key, slot)
  }
  if (/\bdefineSlots\s*[<(]/.test(script))
    warn(component, '用了 defineSlots：只列出了模板里的 <slot>，defineSlots 里的类型没有解析')
  return [...slots.values()].sort((a, b) => (a.name === 'default' ? -1 : b.name === 'default' ? 1 : 0))
}

/** 箭头函数 / 函数声明的“(参数) : 返回值”部分 */
function signatureOf(text) {
  if (!text.startsWith('('))
    return null
  const close = matchBracket(text, 0)
  if (close < 0)
    return null
  const params = text.slice(1, close).replace(/\s+/g, ' ').replace(/ :/g, ':').trim()
  const rest = text.slice(close + 1)
  const returns = /^\s*:\s*([^={]+?)\s*(?:=>|\{)/.exec(rest)
  return { params, returns: returns ? returns[1].trim() : '' }
}

/** 脚本里 name 的定义（function name(...) 或 const name = (...) =>），连同它前面的注释 */
function findFunction(script, name) {
  const escaped = name.replace(/\$/g, '\\$')
  const match = new RegExp(`(?:^|\\n)((?:[ \\t]*(?:\\/\\/[^\\n]*|\\/\\*\\*[^\\n]*\\*\\/)\\n)*)[ \\t]*(?:(?:async\\s+)?function\\s+${escaped}\\s*|(?:const|let)\\s+${escaped}\\s*=\\s*(?:async\\s*)?)(\\()`).exec(script)
  if (!match)
    return null
  const signature = signatureOf(script.slice(match.index + match[0].length - 1))
  if (!signature)
    return null
  const doc = joinLines(match[1].split('\n').map(line => line.trim()).filter(Boolean).map(cleanComment))
  return { ...signature, doc }
}

function readExpose(script, component) {
  const start = script.indexOf('defineExpose(')
  if (start < 0)
    return []
  const open = start + 'defineExpose('.length
  if (script[open] !== '{') {
    warn(component, 'defineExpose 不是对象字面量的写法，方法没有解析')
    return []
  }
  const close = matchBracket(script, open)
  const methods = []
  for (const item of splitTopLevel(script.slice(open + 1, close))) {
    const [name, value] = splitEntry(item.text)
    let signature = value ? signatureOf(value) : null
    let doc = item.doc
    if (!signature) {
      // 简写（{ focus, blur }）或引用别的函数（{ focus: focusInput }）
      const target = value && /^[\w$]+$/.test(value) ? value : name
      const found = findFunction(script, target)
      if (found) {
        signature = found
        doc = doc || found.doc
      }
    }
    if (!signature)
      warn(component, `方法 ${name} 的签名没有找到`)
    methods.push({ name, params: signature?.params ?? '', returns: signature?.returns ?? '', known: !!signature, doc })
  }
  return methods
}

// ---------------------------------------------------------------- 顶部注释里的“名字（说明）”

/** 全角 / 半角括号都算，返回 depth 为 0 处的切分 */
function findAtDepthZero(text, pattern, from = 0) {
  let depth = 0
  for (let index = from; index < text.length; index++) {
    const char = text[index]
    if (char === '（' || char === '(')
      depth++
    else if (char === '）' || char === ')')
      depth = Math.max(0, depth - 1)
    else if (depth === 0) {
      pattern.lastIndex = index
      const match = pattern.exec(text)
      if (match)
        return match
    }
  }
  return null
}

/**
 * 顶部注释的约定：“属性a、属性b（说明）…同名同义；事件 x、y（说明）；插槽 a、b；方法 m()。”
 * 拆成四段文字，后面按名字去里面找括号里的说明。
 */
function headerSegments(description) {
  const segments = { props: '', emits: '', slots: '', methods: '' }
  const markers = [['emits', /事件[ ：:]/y], ['slots', /插槽[ ：:]/y], ['methods', /方法[ ：:]/y]]
  const found = []
  for (const [key, pattern] of markers) {
    const match = findAtDepthZero(description, pattern)
    if (match)
      found.push({ key, start: match.index, bodyStart: match.index + match[0].length })
  }
  found.sort((a, b) => a.start - b.start)
  segments.props = found.length ? description.slice(0, found[0].start) : description
  found.forEach((entry, index) => {
    const hardEnd = index + 1 < found.length ? found[index + 1].start : description.length
    const stop = findAtDepthZero(description, /[；。]/y, entry.bodyStart)
    segments[entry.key] = description.slice(entry.bodyStart, stop && stop.index < hardEnd ? stop.index : hardEnd)
  })
  return segments
}

/** 在一段文字里找 `name（说明）`，返回说明；`v-model:name（说明）` 也算 */
function parenthetical(segment, name) {
  if (!segment)
    return ''
  const escaped = name.replace(/[$:.]/g, '\\$&')
  const pattern = new RegExp(`(?<![\\w$.-])(?:v-model:)?${escaped}(?:\\(\\))?（`, 'g')
  for (const match of segment.matchAll(pattern)) {
    // 只认顶层的（不在别的括号里面的）
    let depth = 0
    for (const char of segment.slice(0, match.index)) {
      if (char === '（')
        depth++
      else if (char === '）')
        depth--
    }
    if (depth !== 0)
      continue
    const start = match.index + match[0].length
    let level = 1
    let index = start
    for (; index < segment.length && level > 0; index++) {
      if (segment[index] === '（')
        level++
      else if (segment[index] === '）')
        level--
    }
    if (level === 0)
      return segment.slice(start, index - 1).trim()
  }
  return ''
}

// ---------------------------------------------------------------- 示例页、分组、差异登记

/** pages/index/index.uvue 的 groups：[{ title, entries: [{ title, subtitle, page }] }] */
function readGroups() {
  const path = join(root, 'pages', 'index', 'index.uvue')
  if (!existsSync(path))
    return []
  const source = read(path)
  const start = /const\s+groups\s*:[^=]*=\s*\[/.exec(source)
  if (!start)
    return []
  const open = start.index + start[0].length - 1
  const close = matchBracket(source, open)
  const groups = []
  for (const item of splitTopLevel(source.slice(open + 1, close))) {
    const title = /title:\s*'([^']*)'/.exec(item.text)?.[1] ?? ''
    const entriesStart = item.text.indexOf('entries:')
    const entries = []
    if (entriesStart >= 0) {
      const listOpen = item.text.indexOf('[', entriesStart)
      const listClose = matchBracket(item.text, listOpen)
      for (const entry of splitTopLevel(item.text.slice(listOpen + 1, listClose))) {
        const field = key => new RegExp(`${key}:\\s*'([^']*)'`).exec(entry.text)?.[1] ?? ''
        entries.push({ title: field('title'), subtitle: field('subtitle'), page: field('url').split('/').pop() })
      }
    }
    groups.push({ title, entries })
  }
  return groups
}

/** check.mjs 的 locations：uni 组件名 → 移动端的目录（子组件的文档在父组件那一页） */
function readLocations() {
  const path = join(root, 'tools', 'parity', 'check.mjs')
  const locations = {}
  if (!existsSync(path))
    return locations
  const source = read(path)
  const start = /const\s+locations\s*=\s*\{/.exec(source)
  if (!start)
    return locations
  const open = start.index + start[0].length - 1
  const body = source.slice(open + 1, matchBracket(source, open))
  for (const match of body.matchAll(/'([\w-]+)'\s*:\s*\[\s*'([\w-]+)'\s*,\s*'(\w+)'/g))
    locations[match[1]] = { dir: match[2], prefix: match[3] }
  return locations
}

function readKnown() {
  const known = {}
  if (!existsSync(knownDir))
    return known
  for (const file of readdirSync(knownDir).sort()) {
    if (file.endsWith('.json'))
      known[file.slice(0, -5)] = JSON.parse(read(join(knownDir, file)))
  }
  return known
}

/** 示例页的模板：{ 页名: 模板文字 } */
function readPages() {
  const pages = {}
  if (!existsSync(pagesDir))
    return pages
  for (const file of readdirSync(pagesDir).sort()) {
    if (!file.endsWith('.uvue'))
      continue
    const source = read(join(pagesDir, file))
    const start = source.indexOf('<template>')
    const end = source.lastIndexOf('</template>')
    pages[file.slice(0, -5)] = start >= 0 && end > start ? source.slice(start + 10, end) : ''
  }
  return pages
}

const countTag = (template, component) => [...template.matchAll(new RegExp(`<am-${component}(?=[\\s/>])`, 'g'))].length

/** 组件的示例页：同名的页；没有就找用到它的页（优先父组件的页，其次用得最多的） */
function demoPageOf(component, pages, locations) {
  if (pages[component] !== undefined)
    return { page: component, own: true }
  const candidates = Object.keys(pages)
    .map(page => ({ page, count: countTag(pages[page], component) }))
    .filter(item => item.count > 0)
  if (candidates.length === 0)
    return null
  const parent = locations[component]?.dir
  candidates.sort((a, b) => {
    const rank = item => (item.page === parent ? 0 : parent && item.page.startsWith(`${parent}-`) ? 1 : component.startsWith(`${item.page}-`) ? 2 : 3)
    return rank(a) - rank(b) || b.count - a.count || a.page.localeCompare(b.page)
  })
  return { page: candidates[0].page, own: false }
}

/** 示例页里第一个 <am-xxx>：整个元素（含子元素），去掉示例页自己的 demo__ 类，去掉公共缩进 */
function usageSnippet(component, template) {
  const start = new RegExp(`<am-${component}(?=[\\s/>])`).exec(template)
  if (!start)
    return ''
  const openEnd = tagEnd(template, start.index)
  if (openEnd < 0)
    return ''
  let end = openEnd
  if (template[openEnd - 1] !== '/') {
    // 找配对的闭标签（同名标签可以嵌套）
    const tags = new RegExp(`<am-${component}(?=[\\s/>])|</am-${component}\\s*>`, 'g')
    tags.lastIndex = openEnd
    let depth = 1
    let match
    end = -1
    while ((match = tags.exec(template)) !== null) {
      if (match[0].startsWith('</')) {
        depth--
        if (depth === 0) {
          end = match.index + match[0].length - 1
          break
        }
      }
      else {
        const nestedEnd = tagEnd(template, match.index)
        if (nestedEnd < 0)
          return ''
        if (template[nestedEnd - 1] !== '/')
          depth++
        tags.lastIndex = nestedEnd
      }
    }
    if (end < 0)
      return ''
  }
  const lineStart = template.lastIndexOf('\n', start.index) + 1
  const indent = /^[\t ]*/.exec(template.slice(lineStart, start.index))[0]
  const lines = template.slice(start.index, end + 1).split('\n')
    .map((line, index) => (index > 0 && line.startsWith(indent) ? line.slice(indent.length) : line))
    .map(line => line.replace(/\s+class="demo__[^"]*"/g, '').replace(/\t/g, '  ').trimEnd())
  if (lines.length > MAX_SNIPPET_LINES)
    return ''
  return lines.join('\n')
}

// ---------------------------------------------------------------- 生成

function buildModel(component, context) {
  const source = read(join(componentsDir, `am-${component}`, `am-${component}.uvue`))
  const { script, template } = sections(source, component)
  const header = readHeader(script, component)
  const props = readProps(script, component)
  const emits = readEmits(script, component)
  const payloads = readEmitPayloads(source, script, props, component)
  const slots = readSlots(template, script, component)
  const methods = readExpose(script, component)
  if (/\bdefineModel\s*[<(]/.test(script))
    warn(component, '用了 defineModel：没有解析，属性 / 事件表里缺它')

  const isDifference = paragraph => /^与 antdv-next-mobile 的差异/.test(paragraph[0]?.text ?? '')
  const description = header.length > 0 && !isDifference(header[0]) ? header[0] : []
  const differences = header.filter(isDifference)
  const notes = header.filter(paragraph => paragraph !== description && !isDifference(paragraph))
  const descriptionText = description.filter(block => !block.code).map(block => block.text).join('')
  // 说明的开头：“按钮（= antdv-next-mobile 的 Button）：……”
  const lead = /^([^（：:。]+?)(?:（[^）]*）)?[：:]/.exec(descriptionText)
  const segments = headerSegments(descriptionText)

  const own = context.known[component] ?? {}
  const page = demoPageOf(component, context.pages, context.locations)
  const entry = context.entryOfPage[component]
  return {
    component,
    title: entry?.subtitle || (lead ? lead[1].trim() : ''),
    description,
    differences,
    notes,
    segments,
    props,
    emits,
    payloads,
    slots,
    methods,
    own,
    page,
    snippet: page ? usageSnippet(component, context.pages[page.page]) : '',
    group: entry ? context.groupOfPage[component] : OTHER_GROUP,
    mobileDir: own.uniOnly ? '' : (context.locations[component]?.dir ?? component),
    isSub: !own.uniOnly && !!context.locations[component] && context.locations[component].dir !== component,
  }
}

function renderBlocks(blocks) {
  const lines = []
  let previousBullet = null
  for (const block of blocks) {
    if (previousBullet !== null && previousBullet !== block.bullet)
      lines.push('')
    else if (previousBullet === false)
      lines.push('')
    if (block.code)
      lines.push(block.text.startsWith('<') ? '```vue' : '```', block.text, '```')
    else
      lines.push(block.bullet ? `- ${prose(block.text)}` : prose(block.text))
    previousBullet = block.bullet
  }
  return lines
}

function propDescription(model, prop) {
  const parts = []
  const isModel = model.emits.includes(`update:${prop.name}`)
  if (isModel)
    parts.push(prop.name === 'modelValue' ? '**`v-model`**' : `**\`v-model:${prop.name}\`**`)
  let text = prop.doc || parenthetical(model.segments.props, prop.name)
  // 括号里只是把类型又写了一遍的不算说明
  if (text === prop.type)
    text = ''
  if (!text && prop.name === 'rootClass')
    text = '加在组件根节点上的类名'
  if (!text && model.own.extraProps?.[prop.name])
    text = `uni 端多出的属性：${model.own.extraProps[prop.name]}`
  if (text)
    parts.push(text)
  if (prop.required)
    parts.push('必填')
  return parts.join(' ')
}

function renderComponent(model, context) {
  const { component } = model
  const out = [BANNER, '', `# am-${component}${model.title ? ` ${model.title}` : ''}`, '']

  if (model.description.length)
    out.push(...renderBlocks(model.description), '')
  else
    out.push('（组件源码顶部没有说明注释）', '')
  for (const paragraph of model.notes)
    out.push(...renderBlocks(paragraph), '')

  out.push('## 用法', '')
  const pageLink = model.page ? `[pages/components/${model.page.page}.uvue](../../pages/components/${model.page.page}.uvue)` : ''
  if (model.snippet) {
    out.push('```vue', model.snippet, '```', '')
    out.push(`摘自示例页 ${pageLink}（片段里用到的变量见该页的 \`<script>\`）。`, '')
  }
  else if (model.page) {
    out.push(`完整的用法见示例页 ${pageLink}。`, '')
  }
  else {
    out.push('示例应用里没有直接用到这个组件。', '')
  }

  out.push('## 属性', '')
  if (model.props.length) {
    out.push('| 属性 | 类型 | 默认值 | 说明 |', '| --- | --- | --- | --- |')
    for (const prop of model.props)
      out.push(`| ${code(prop.name)} | ${code(prop.type)} | ${prop.default ? code(prop.default) : '-'} | ${cell(propDescription(model, prop))} |`)
    out.push('')
    if (model.props.some(prop => !propDescription(model, prop)) && model.mobileDir)
      out.push('没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。', '')
  }
  else {
    out.push('没有属性。', '')
  }

  out.push('## 事件', '')
  if (model.emits.length) {
    out.push('| 事件 | 参数 | 说明 |', '| --- | --- | --- |')
    let unknown = false
    for (const name of model.emits) {
      const info = emitSignature(name, model.payloads.get(name), model.props)
      unknown = unknown || info.unknown
      const model_ = /^update:(.+)$/.exec(name)
      let text = parenthetical(model.segments.emits, name)
      if (!text && model_)
        text = `\`v-model:${model_[1]}\` 的更新`
      if (!text && model.own.extraEmits?.[name])
        text = `uni 端多出的事件：${model.own.extraEmits[name]}`
      if (info.uncalled)
        text = [text, '（源码里没有找到对应的 emit 调用）'].filter(Boolean).join(' ')
      out.push(`| ${code(name)} | ${info.signature ? code(info.signature) : '-'} | ${cell(text)} |`)
    }
    out.push('')
    out.push(`参数由源码里的 \`emit()\` 调用推导：名字是实参的写法${unknown ? '，没有写类型的是推不出来的' : ''}。模板里用短横线写法监听（如 \`@open-change\`）。`, '')
  }
  else {
    out.push('没有事件。', '')
  }

  out.push('## 插槽', '')
  if (model.slots.length) {
    out.push('| 插槽 | 参数 | 说明 |', '| --- | --- | --- |')
    for (const slot of model.slots) {
      const name = slot.dynamic ? `动态：${slot.name}` : slot.name
      const parts = [parenthetical(model.segments.slots, slot.name), slot.fallback ? '有默认内容' : ''].filter(Boolean)
      out.push(`| ${code(name)} | ${slot.params.length ? code(`{ ${slot.params.join(', ')} }`) : '-'} | ${cell(parts.join('；'))} |`)
    }
    out.push('')
  }
  else {
    out.push('没有插槽。', '')
  }

  if (model.methods.length) {
    out.push('## 方法', '')
    out.push(`通过模板引用调用：\`ref<Am${pascal(component)}ComponentPublicInstance | null>(null)\`。`, '')
    out.push('| 方法 | 说明 |', '| --- | --- |')
    for (const method of model.methods) {
      const signature = method.known ? `${method.name}(${method.params})${method.returns ? `: ${method.returns}` : ''}` : method.name
      out.push(`| ${code(signature)} | ${cell(method.doc || parenthetical(model.segments.methods, method.name))} |`)
    }
    out.push('')
  }

  out.push('## 与 antdv-next-mobile 的差异', '')
  if (model.own.uniOnly) {
    out.push(`uni 端特有的组件，antdv-next-mobile 里没有对应的公开组件：${prose(model.own.uniOnly)}`, '')
  }
  else {
    const target = model.isSub
      ? `antdv-next-mobile 的 ${context.locations[component].prefix}，文档在 [${model.mobileDir}](${MOBILE_SITE}${model.mobileDir}) 一页`
      : `antdv-next-mobile 的同名组件：[${MOBILE_SITE}${model.mobileDir}](${MOBILE_SITE}${model.mobileDir})`
    out.push(`对应 ${target}。`, '')
  }
  for (const paragraph of model.differences) {
    const [first, ...rest] = paragraph
    // 第一块是“与 antdv-next-mobile 的差异（uni-app x 的限制）：”这个小标题
    const heading = first.text.replace(/[：:]$/, '')
    out.push(`${prose(heading)}：`, '', ...renderBlocks(rest), '')
  }
  const rows = []
  const kinds = [['missingProps', '没有的属性'], ['extraProps', '多出的属性'], ['missingEmits', '没有的事件'], ['extraEmits', '多出的事件']]
  for (const [key, label] of kinds) {
    for (const [name, reason] of Object.entries(model.own[key] ?? {}))
      rows.push(`| ${label} | ${code(name)} | ${cell(reason)} |`)
  }
  if (rows.length) {
    out.push(`登记在 [tools/parity/known/${component}.json](../../tools/parity/known/${component}.json) 的接口差异（由 \`node tools/parity/check.mjs\` 核对）：`, '')
    out.push('| 差异 | 名称 | 原因 |', '| --- | --- | --- |', ...rows, '')
  }
  else if (!model.own.uniOnly) {
    out.push(`[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致${model.differences.length ? '（类型、取值上的差别见上面的说明）' : ''}。`, '')
  }
  if (!model.own.uniOnly) {
    const commonRows = []
    for (const [key, label] of kinds) {
      for (const [name, reason] of Object.entries(context.common[key] ?? {}))
        commonRows.push(`| ${label} | ${code(name)} | ${cell(reason)} |`)
    }
    if (commonRows.length) {
      out.push('所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：', '')
      out.push('| 差异 | 名称 | 原因 |', '| --- | --- | --- |', ...commonRows, '')
    }
  }
  while (out[out.length - 1] === '')
    out.pop()
  return `${out.join('\n')}\n`
}

function renderIndex(models, groups, context) {
  const out = [BANNER, '', '# 组件', '']
  out.push(`共 ${models.length} 个组件，分组与示例应用首页（[pages/index/index.uvue](../../pages/index/index.uvue)）相同。`
    + `每个组件的文档由 \`node tools/docs/gen.mjs\` 从源码生成。`, '')
  const byName = new Map(models.map(model => [model.component, model]))
  const brief = (model) => {
    const text = model.description.filter(block => !block.code).map(block => block.text).join('')
    const body = text.replace(/^[^（：:。]+?(?:（[^）]*）)?[：:]/, '')
    const sentence = /^[^。；]*?[。；]/.exec(body)
    // 只有“一句话的介绍”才放进索引；以属性清单开头的说明不放
    return sentence && !/同名同义|[a-z][A-Za-z]*（|、[a-z]/.test(sentence[0]) ? sentence[0].replace(/[。；]$/, '') : ''
  }
  for (const group of groups) {
    out.push(`## ${group.title}`, '', '| 组件 | 名称 | 说明 |', '| --- | --- | --- |')
    for (const entry of group.entries) {
      const model = byName.get(entry.page)
      if (model) {
        out.push(`| [am-${model.component}](./${model.component}.md) | ${cell(`${entry.title} ${entry.subtitle}`)} | ${cell(brief(model))} |`)
      }
      else {
        // 这一页没有同名的组件（Grid、Typography、message…）：列出它演示的、没有自己示例页的组件
        const related = models.filter(item => item.page && !item.page.own && item.page.page === entry.page)
        const links = related.map(item => `[am-${item.component}](./${item.component}.md)`).join('、')
        const text = links ? `示例页演示的组件：${links}` : '没有对应的组件（函数式 API 见 [指南](../guide/differences.md)）'
        out.push(`| [${entry.page}.uvue](../../pages/components/${entry.page}.uvue) | ${cell(`${entry.title} ${entry.subtitle}`)} | ${cell(text)} |`)
      }
    }
    out.push('')
  }
  const others = models.filter(model => model.group === OTHER_GROUP)
  if (others.length) {
    out.push(`## ${OTHER_GROUP}`, '', '没有同名示例页的组件：子组件、内部组件与 uni 端特有的组件。', '')
    out.push('| 组件 | 名称 | 示例页 |', '| --- | --- | --- |')
    for (const model of others) {
      const page = model.page ? `[${model.page.page}.uvue](../../pages/components/${model.page.page}.uvue)` : '-'
      const title = model.title + (context.known[model.component]?.uniOnly ? '（uni 端特有）' : '')
      out.push(`| [am-${model.component}](./${model.component}.md) | ${cell(title)} | ${page} |`)
    }
    out.push('')
  }
  while (out[out.length - 1] === '')
    out.pop()
  return `${out.join('\n')}\n`
}

function generate() {
  const known = readKnown()
  const groups = readGroups()
  if (groups.length === 0)
    warnings.push('pages/index/index.uvue 的 groups 没有解析出来：所有组件都归到“其他”')
  const context = {
    known,
    common: known._common ?? {},
    locations: readLocations(),
    pages: readPages(),
    groupOfPage: {},
    entryOfPage: {},
  }
  for (const group of groups) {
    for (const entry of group.entries) {
      // 同一页登记了两次时取第一次
      context.groupOfPage[entry.page] ??= group.title
      context.entryOfPage[entry.page] ??= entry
    }
  }
  const components = readdirSync(componentsDir)
    .filter(name => name.startsWith('am-') && existsSync(join(componentsDir, name, `${name}.uvue`)))
    .map(name => name.slice(3))
    .sort()
  const models = components.map(component => buildModel(component, context))
  const files = new Map()
  for (const model of models)
    files.set(`${model.component}.md`, renderComponent(model, context))
  files.set('README.md', renderIndex(models, groups, context))
  return files
}

const check = process.argv.includes('--check')
const quiet = process.argv.includes('--quiet')
const files = generate()
const existing = existsSync(outDir) ? readdirSync(outDir).filter(file => file.endsWith('.md')) : []
const stale = existing.filter(file => !files.has(file))

if (!quiet && warnings.length)
  console.warn(`解析时的提示（${warnings.length}）：\n${warnings.map(line => `  · ${line}`).join('\n')}\n`)

if (check) {
  const different = []
  for (const [file, content] of files) {
    const path = join(outDir, file)
    if (!existsSync(path))
      different.push(`${file}（缺少）`)
    else if (read(path) !== content)
      different.push(`${file}（内容不同）`)
  }
  for (const file of stale)
    different.push(`${file}（多余：没有对应的组件）`)
  if (different.length) {
    console.error(`✖ docs/components 与源码不一致，请运行 node tools/docs/gen.mjs 后提交：\n${different.map(line => `  docs/components/${line}`).join('\n')}`)
    process.exit(1)
  }
  console.log(`✔ docs/components 是最新的（${files.size} 个文件）。`)
}
else {
  mkdirSync(outDir, { recursive: true })
  let written = 0
  for (const [file, content] of files) {
    const path = join(outDir, file)
    if (existsSync(path) && read(path) === content)
      continue
    writeFileSync(path, content)
    written++
  }
  for (const file of stale) {
    rmSync(join(outDir, file))
    console.log(`删除多余的 docs/components/${file}`)
  }
  console.log(`✔ 生成 ${files.size} 个文件到 docs/components（${written} 个有变化）。`)
}
