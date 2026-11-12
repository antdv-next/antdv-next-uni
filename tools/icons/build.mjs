// 生成组件库的图标字体：从 @ant-design/icons-svg 挑选图标，输出 TTF 与 UTS 的名称 → 字符映射。
// uni-app x 的 App 端没有内联 SVG，也不支持伪元素，图标只能用字体 + unicode；字体随组件库分发，不依赖外网。
//   cd tools/icons && pnpm install --ignore-workspace && pnpm build
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { Readable } from 'node:stream'

import svg2ttf from 'svg2ttf'
import { SVGIcons2SVGFontStream } from 'svgicons2svgfont'

const require = createRequire(import.meta.url)
const iconsDir = join(dirname(require.resolve('@ant-design/icons-svg/package.json')), 'inline-svg')
const root = join(import.meta.dirname, '..', '..', 'uni_modules', 'antdv-next-uni')

/**
 * 收录的图标：名称为组件库中的名称（<am-icon name="cart" />），值为 Ant Design 的 主题/文件名。
 * 只收录移动端常用的，新增时在这里加一行再重新生成（字符按顺序分配，追加到末尾不会改变已有图标的字符）
 */
const ICONS = [
  ['left', 'outlined/left'],
  ['right', 'outlined/right'],
  ['up', 'outlined/up'],
  ['down', 'outlined/down'],
  ['close', 'outlined/close'],
  ['check', 'outlined/check'],
  ['plus', 'outlined/plus'],
  ['minus', 'outlined/minus'],
  ['search', 'outlined/search'],
  ['home', 'outlined/home'],
  ['home-fill', 'filled/home'],
  ['appstore', 'outlined/appstore'],
  ['appstore-fill', 'filled/appstore'],
  ['cart', 'outlined/shopping-cart'],
  ['shopping', 'outlined/shopping'],
  ['shopping-fill', 'filled/shopping'],
  ['user', 'outlined/user'],
  ['heart', 'outlined/heart'],
  ['heart-fill', 'filled/heart'],
  ['star', 'outlined/star'],
  ['star-fill', 'filled/star'],
  ['delete', 'outlined/delete'],
  ['edit', 'outlined/edit'],
  ['share', 'outlined/share-alt'],
  ['setting', 'outlined/setting'],
  ['location', 'outlined/environment'],
  ['phone', 'outlined/phone'],
  ['message', 'outlined/message'],
  ['bell', 'outlined/bell'],
  ['gift', 'outlined/gift'],
  ['wallet', 'outlined/wallet'],
  ['card', 'outlined/credit-card'],
  ['car', 'outlined/car'],
  ['shop', 'outlined/shop'],
  ['tag', 'outlined/tag'],
  ['fire', 'outlined/fire'],
  ['clock', 'outlined/clock-circle'],
  ['file', 'outlined/file-text'],
  ['service', 'outlined/customer-service'],
  ['more', 'outlined/ellipsis'],
  ['filter', 'outlined/filter'],
  ['scan', 'outlined/scan'],
  ['camera', 'outlined/camera'],
  ['picture', 'outlined/picture'],
  ['eye', 'outlined/eye'],
  ['eye-off', 'outlined/eye-invisible'],
  ['lock', 'outlined/lock'],
  ['logout', 'outlined/logout'],
  ['reload', 'outlined/reload'],
  ['loading', 'outlined/loading'],
  ['info', 'outlined/info-circle'],
  ['info-fill', 'filled/info-circle'],
  ['success', 'outlined/check-circle'],
  ['success-fill', 'filled/check-circle'],
  ['error', 'outlined/close-circle'],
  ['error-fill', 'filled/close-circle'],
  ['warning', 'outlined/exclamation-circle'],
  ['warning-fill', 'filled/exclamation-circle'],
  ['question', 'outlined/question-circle'],
  ['coupon', 'outlined/red-envelope'],
  ['order', 'outlined/profile'],
  ['undo', 'outlined/rollback'],
  ['inbox', 'outlined/inbox'],
  ['robot', 'outlined/robot'],
]

/** 字符从私有区 U+E600 开始按顺序分配 */
const FIRST = 0xe600

const fontStream = new SVGIcons2SVGFontStream({
  fontName: 'am-icons',
  fontHeight: 1024,
  normalize: true,
  centerHorizontally: true,
  log: () => {},
})
const chunks = []
fontStream.on('data', chunk => chunks.push(chunk))
const done = new Promise((resolve, reject) => {
  fontStream.on('finish', resolve)
  fontStream.on('error', reject)
})

const map = []
for (const [index, [name, source]] of ICONS.entries()) {
  const unicode = String.fromCodePoint(FIRST + index)
  const file = join(iconsDir, `${source}.svg`)
  // 原文件带 fill / class 等属性，字体只要路径：读出来交给流
  const glyph = Readable.from([readFileSync(file)])
  glyph.metadata = { name, unicode: [unicode] }
  fontStream.write(glyph)
  map.push([name, FIRST + index])
}
fontStream.end()
await done

const ttf = svg2ttf(chunks.join(''), { copyright: 'Ant Design Icons (MIT)' })
writeFileSync(join(root, 'static', 'am-icons.ttf'), Buffer.from(ttf.buffer))

const uts = `// 由 tools/icons/build.mjs 生成，不要手改：图标名称 → 字体中的字符（字体为 static/am-icons.ttf，Ant Design Icons，MIT）

/** 图标字体的名称（uni.loadFontFace 的 family） */
export const AM_ICON_FONT = 'am-icons'

const ICON_CODES = new Map<string, number>([
${map.map(([name, code]) => `\t['${name}', 0x${code.toString(16)}],`).join('\n')}
])

/** 收录的图标名称（示例页列出全部图标） */
export const AM_ICON_NAMES : string[] = [
${map.map(([name]) => `\t'${name}',`).join('\n')}
]

/** 图标对应的字符；不认识的名称返回空字符串（不显示） */
export function iconGlyph(name : string) : string {
\tconst code = ICON_CODES.get(name)
\treturn code == null ? '' : String.fromCharCode(code)
}

let loaded = false

/**
 * 加载图标字体（App.uvue 的 onLaunch 中调用一次）。global 为 true 时全部页面可用；
 * 多次调用只加载一次
 */
export function loadAmIcons() : void {
\tif (loaded) return
\tloaded = true
\tuni.loadFontFace({
\t\tglobal: true,
\t\tfamily: AM_ICON_FONT,
\t\tsource: "url('/uni_modules/antdv-next-uni/static/am-icons.ttf')",
\t\tfail: (error) => {
\t\t\tloaded = false
\t\t\tconsole.error('[antdv-next-uni] 图标字体加载失败', error)
\t\t}
\t})
}
`
writeFileSync(join(root, 'utils', 'icons.uts'), uts)
process.stdout.write(`生成 ${map.length} 个图标：static/am-icons.ttf、utils/icons.uts\n`)
