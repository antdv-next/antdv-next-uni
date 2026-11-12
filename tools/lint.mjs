#!/usr/bin/env node
// 不依赖 HBuilderX 的静态检查（CI 里跑）：编译器不报、但在 App 上会出问题或让示例漏掉的几类错误。
//   node tools/lint.mjs
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const lib = join(root, 'uni_modules', 'antdv-next-uni')
const problems = []
const report = (file, message) => problems.push(`${relative(root, file)}: ${message}`)

function walk(dir, out = []) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name)
		if (statSync(path).isDirectory()) walk(path, out)
		else out.push(path)
	}
	return out
}

// 去掉 JSON 里的注释（pages.json / manifest.json 允许写注释）
function readJson(file) {
	const text = readFileSync(file, 'utf8').replace(/("(?:\\.|[^"\\])*")|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (match, string) => string ?? '')
	return JSON.parse(text)
}

// 1. 组件目录：am-x/am-x.uvue（easycom 靠这个路径找组件）
for (const name of readdirSync(join(lib, 'components'))) {
	const dir = join(lib, 'components', name)
	if (!statSync(dir).isDirectory()) continue
	if (!name.startsWith('am-')) report(dir, '组件目录要以 am- 开头')
	if (!existsSync(join(dir, `${name}.uvue`))) report(dir, `缺少 ${name}.uvue`)
}

// 2. 空文件（脚本批量改写出过把文件清空的事故）
const sources = [...walk(lib), ...walk(join(root, 'pages'))].filter(file => /\.(uvue|uts)$/.test(file))
for (const file of sources) {
	if (statSync(file).size == 0) report(file, '文件是空的')
}

// 3. <style> 里的 gap：App 端能编译但运行时不生效，只允许写在 #ifdef WEB 里
for (const file of sources.filter(file => file.endsWith('.uvue'))) {
	const source = readFileSync(file, 'utf8')
	for (const style of source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
		let web = 0
		const offset = source.slice(0, style.index).split('\n').length
		style[1].split('\n').forEach((line, index) => {
			if (/#ifdef\s+WEB\b/.test(line)) web++
			else if (/#endif/.test(line) && web > 0) web--
			else if (web == 0 && /(^|[\s;{])(row-|column-)?gap\s*:/.test(line))
				report(file, `第 ${offset + index} 行：gap 在 App 端不生效，改用子元素的 margin 或 am-space-item`)
		})
	}
}

// 4. pages.json 与 pages/ 一一对应（没注册的页面不会被类型检查，也进不了示例）
const pages = readJson(join(root, 'pages.json')).pages.map(page => page.path)
for (const path of pages) {
	if (!existsSync(join(root, `${path}.uvue`))) report(join(root, 'pages.json'), `注册了不存在的页面 ${path}`)
}
for (const file of walk(join(root, 'pages')).filter(file => file.endsWith('.uvue'))) {
	const path = relative(root, file).replace(/\.uvue$/, '').split('\\').join('/')
	if (!pages.includes(path)) report(file, '没有在 pages.json 里注册')
}

// 5. 示例页都能从首页进去
const index = readFileSync(join(root, 'pages', 'index', 'index.uvue'), 'utf8')
for (const path of pages.filter(path => path.startsWith('pages/components/'))) {
	if (!index.includes(`'/${path}'`)) report(join(root, `${path}.uvue`), '首页的分组里没有它的入口')
}

// 6. 版本号一致：插件包与示例应用
const version = readJson(join(lib, 'package.json')).version
if (readJson(join(root, 'manifest.json')).versionName != version) report(join(root, 'manifest.json'), `versionName 与插件包的版本 ${version} 不一致`)
if (!new RegExp(`^## ${version.replaceAll('.', '\\.')}（\\d{4}-\\d{2}-\\d{2}）`, 'm').test(readFileSync(join(lib, 'changelog.md'), 'utf8')))
	report(join(lib, 'changelog.md'), `没有 “## ${version}（YYYY-MM-DD）” 这一节`)

if (problems.length > 0) {
	console.error(problems.join('\n'))
	console.error(`\n✘ ${problems.length} 个问题`)
	process.exit(1)
}
console.log(`✔ 静态检查通过（${sources.length} 个源文件，${pages.length} 个页面）`)
