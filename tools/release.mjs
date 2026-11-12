#!/usr/bin/env node
// 发版：改版本号、跑检查、打出可以直接解压进 uni_modules 的 zip。不提交、不打 tag、不上传。
//   node tools/release.mjs 0.2.0        改版本号并打包（先在 changelog.md 里写好 “## 0.2.0（日期）” 一节）
//   node tools/release.mjs              按当前版本号重新打包
//   node tools/release.mjs --notes      只输出当前版本在 changelog.md 里的那一节（给 GitHub Release 用）
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const lib = join(root, 'uni_modules', 'antdv-next-uni')
const packageFile = join(lib, 'package.json')
const manifestFile = join(root, 'manifest.json')

const currentVersion = () => /"version":\s*"([^"]+)"/.exec(readFileSync(packageFile, 'utf8'))[1]

function notes(version) {
	const text = readFileSync(join(lib, 'changelog.md'), 'utf8')
	const start = text.search(new RegExp(`^## ${version.replaceAll('.', '\\.')}（`, 'm'))
	if (start < 0) return null
	const rest = text.slice(start).split('\n').slice(1).join('\n')
	const end = rest.search(/^## /m)
	return (end < 0 ? rest : rest.slice(0, end)).trim()
}

const args = process.argv.slice(2)
if (args.includes('--notes')) {
	const text = notes(currentVersion())
	if (text == null) { console.error(`changelog.md 里没有 ${currentVersion()} 这一节`); process.exit(1) }
	console.log(text)
	process.exit(0)
}

const next = args.find(arg => !arg.startsWith('-'))
if (next != null) {
	if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(next)) { console.error(`版本号不合法：${next}`); process.exit(1) }
	if (notes(next) == null) { console.error(`先在 uni_modules/antdv-next-uni/changelog.md 里写 “## ${next}（YYYY-MM-DD）” 一节`); process.exit(1) }
	// 只替换版本字段，保留文件原来的缩进与注释
	writeFileSync(packageFile, readFileSync(packageFile, 'utf8').replace(/("version":\s*")[^"]+(")/, `$1${next}$2`))
	const [major, minor, patch] = next.split('-')[0].split('.').map(Number)
	writeFileSync(manifestFile, readFileSync(manifestFile, 'utf8')
		.replace(/("versionName":\s*")[^"]+(")/, `$1${next}$2`)
		.replace(/("versionCode":\s*)\d+/, `$1${major * 10000 + minor * 100 + patch}`))
}

const version = currentVersion()
const run = (...command) => execFileSync(command[0], command.slice(1), { cwd: root, stdio: 'inherit' })
run('node', 'tools/lint.mjs')
if (existsSync(join(root, 'tools', 'docs', 'gen.mjs'))) run('node', 'tools/docs/gen.mjs', '--check')
if (existsSync(process.env.MOBILE_DIR ?? join(root, '..', 'antdv-next-mobile'))) run('node', 'tools/parity/check.mjs')
else console.warn('没有找到 antdv-next-mobile（MOBILE_DIR），跳过对齐检查')

const dist = join(root, 'dist')
mkdirSync(dist, { recursive: true })
const zip = join(dist, `antdv-next-uni-${version}.zip`)
rmSync(zip, { force: true })
// 压缩包里的顶层目录是 antdv-next-uni/：解压到项目的 uni_modules/ 下即可
execFileSync('zip', ['-rqX', zip, 'antdv-next-uni', '-x', '*.DS_Store'], { cwd: join(root, 'uni_modules'), stdio: 'inherit' })
console.log(`\n✔ ${zip}`)
console.log(`接下来：三端编译（见 AGENTS.md）→ git commit → git tag v${version} → git push --follow-tags（CI 建 GitHub Release）`)
console.log('插件市场：HBuilderX 里右键 uni_modules/antdv-next-uni →“发布到插件市场”（需要 DCloud 账号，只能手动）')
