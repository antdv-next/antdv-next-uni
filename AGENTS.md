# Repository Guidelines

`antdv-next-uni` 是 Antdv Next 家族的 **uni-app x**（uvue + UTS）组件库，一套代码编译到 Android、iOS、鸿蒙、Web 与微信小程序。

## 目标

1. **与 antdv-next-mobile 对齐**。组件名、属性、v-model、事件、实例方法、主题 token、语言包结构都与
   [antdv-next-mobile](https://github.com/antdv-next/antdv-next-mobile)（它又与 PC 端 antdv-next 对齐）相同：
   `<am-button type="primary">`、`v-model:open`、`v-model:value`、`--am-color-primary`。
   移动端库的源码在同级目录 `../antdv-next-mobile/packages/antdv-next-mobile/src/<组件>`，写组件前先读它的
   `interface.ts` 和文档。
2. **对齐的是接口和设计，不是代码**。移动端库是 TS + DOM + 完整 CSS，App 端编译不了；这里是独立的 uvue + UTS 实现。
3. **做不到的差异要登记**。uni-app x 的限制导致的差异写在组件顶部的注释里，并登记到
   `tools/parity/known-differences.json`（带原因）。`node tools/parity/check.mjs` 不通过不能合并。

## 目录

```
antdv-next-uni/                     本仓库 = 一个 HBuilderX 项目（不是 pnpm monorepo）
├── uni_modules/antdv-next-uni/     组件库本体（发布的就是这个目录）
│   ├── components/am-*/am-*.uvue   组件（easycom：目录名 = 文件名 = 标签名）
│   ├── theme/theme.uts             主题：token 类型、派生、CSS 变量、useAmTheme()
│   ├── locale/locale.uts           语言包（zhCN / enUS）、useAmLocale()
│   ├── utils/                      config（尺寸 / 禁用上下文）、overlay（弹出层栈）、motion、icons、ellipsis、color
│   ├── static/am-icons.ttf         图标字体（tools/icons 生成）
│   └── package.json                uni_modules 插件的元数据
├── pages/                          示例 App：每个组件一页（同时是文档与手动测试）
├── tools/parity/                   与 antdv-next-mobile 的接口对齐检查
├── tools/icons/                    图标字体生成
└── App.uvue / main.uts / manifest.json / pages.json / index.html
```

不要把本仓库放进带 `node_modules` 的上层目录或 monorepo：HBuilderX 的编译器会解析到上层的 vite 而失败。

`am-button`、`am-popup`、`am-input`、`am-list` / `am-list-item`、`am-config-provider` 是参考实现，新组件照它们的结构写。

## 组件的写法

```vue
<script setup lang="uts">
import { useAmTheme } from '../../theme/theme.uts'
import { useAmDisabled, useAmSize } from '../../utils/config.uts'

// 第一段注释：对应 antdv-next-mobile 的哪个组件、哪些属性同名同义；
// 第二段：与它的差异及原因（同时登记到 tools/parity/known-differences.json）
defineOptions({ name: 'AmFoo' })

const props = defineProps({
	value: { type: String, default: '' },
	size: { type: String, default: '' },
	disabled: { type: Boolean, default: false },
	rootClass: { type: String, default: '' }
})

const emit = defineEmits(['update:value', 'change'])

const theme = useAmTheme()                       // 取值函数：theme().colorPrimary
const sizeOf = useAmSize(() : string => props.size)
const size = computed(() : string => sizeOf())   // 'small' | 'middle' | 'large'
</script>
```

- **命名**：组件 `AmFoo`，标签与目录 `am-foo`，子组件 `am-foo-item`。类名是 BEM 单 class：`am-foo`、`am-foo--primary`、
  `am-foo__text`、`am-foo__text--primary`。
- **属性**：用运行时声明 `defineProps({ ... })`。对象 / 数组属性写 `type: Object as PropType<AmXxx>`，
  默认值用工厂函数，且**只能引用 import 进来的常量**（`defineProps` 会被提升到 setup 之外，引用本文件里的 `const` 编译报错）。
  没有 `undefined`：字符串属性用 `''` 表示“没传”，数字用 `0` 或 `-1`。
- **事件**：`defineEmits([...])`。双向绑定同时发 `update:<属性>` 和 PC 的事件（`change`、`openChange`…）。
  没有 `on*` 属性。
- **渲染类属性**：移动端库里是节点 / 渲染函数的属性（`icon`、`prefix`、`title`…），这里是**字符串**
  （图标名或文字）+ **同名插槽**。UTS 里不能把 VNode 放进数据。
- **文字**：必须写在 `<text>` 里，颜色、字号写在这个 `text` 的类上——uvue 的样式不继承。
  所以按钮的文字是 `text` 属性，不是默认插槽。
- **上下文**：尺寸 `useAmSize`、禁用 `useAmDisabled`、主题 `useAmTheme`、文案 `useAmLocale`（不要在组件里写死中文）。
  它们返回的都是**取值函数**（UTS 的 inject 写不了 `ComputedRef`），在 `computed` 里调用。
- **调用实例方法**：`defineExpose({ ... })`；使用方 `ref<AmFooComponentPublicInstance | null>(null)`
  （easycom 组件的实例类型是自动生成的全局类型，不需要 import）。
- **根节点的类**：支持 `rootClass`（根节点是组件自己的元素，类能生效）。**不要**给子组件内部节点传类：
  子组件自己的样式后加载，同优先级时盖过传进来的类。要改子组件的颜色、尺寸就用它的属性。
- **弹出层**：基于 `am-popup`（遮罩、过渡、弹出层栈、Android 返回键）。没有 Teleport，弹出层放在页面根节点下。

## 主题

- token 名、默认值、派生比例与 antdv-next-mobile 的 `style/tokens.css` 相同；颜色在 `theme/theme.uts` 的
  `deriveTheme()` 里算成字面量（App 端没有 `color-mix()`，变量的值也不能引用 `var()`）。改公式时两边一起改。
- `<am-config-provider>` 把主题写成 CSS 变量放在自己的根节点上。**每个页面的根节点都是它**
  （App 端没有 `:root`）。`theme` / `locale` / `componentSize` / `componentDisabled` 同移动端库；
  全局主题用 `setAmTheme()`，全局语言用 `setAmLocale()`。
- 组件样式只读一层变量，并带与默认主题一致的回退值：`color: var(--am-color-text, rgba(0, 0, 0, 0.88))`。
- 不能用 CSS 变量的地方（`placeholder-style`、`<loading>` 的 `border-color`、`transition`、Canvas）在 UTS 里
  用 `useAmTheme()` 取颜色拼成 style 字符串。

## uni-app x 的限制（HBuilderX 5.34 实测，来自 antdv-pro-uni 的经验）

| 限制 | 做法 |
| --- | --- |
| 只有 class 选择器，没有后代 / 标签 / 属性选择器、伪类、伪元素 | BEM 单 class；状态用额外的类或 `:style` |
| 样式不继承 | 文字在 `<text>` 里，颜色字号写在 text 上 |
| 只有 flex（默认纵向）和绝对定位；没有 `gap` | 间距写在子元素的 margin 上 |
| 用到 `var()` 的属性不能写简写（VDOM 模式） | `border-top-left-radius` ×4、`padding-left` / `padding-right` 分开写；固定值可以简写 |
| `transition` 里不能用 `var()`；没有 `@keyframes` | 时长写字面量，只过渡 transform / opacity / 宽高 / 背景色 / 边框色；转圈用内置 `<loading>` |
| Android 上只切换类名时没有过渡 | 要动的值写在 `:style` 上 |
| view 默认 `overflow: hidden`（App） | 伸出父元素的部分（徽标、阴影）在自己和父元素上写 `overflow: visible` |
| `min-height` 不含内边距（App），且不支持百分比 | 不靠 `min-height` 定行高；弹层的最大高度按 `uni.getWindowInfo().windowHeight` 算成像素 |
| 没有 `calc()`（App 蒸汽模式 5.31 之前）、`align-items: baseline`、`min-height: 100%` | 不用；Web 专用的写在 `/* #ifdef WEB */` 里 |
| `view` 不支持 `aria-label` 等无障碍属性 | 不写（编译警告） |
| 没有 Teleport | 弹出层是 fixed 根节点，登记到 `utils/overlay.uts` 的栈 |
| 对象字面量不能 `as` 成类型 | 写类型注解：`const item : AmOption = { ... }` |
| 不要把函数命名为 `valueOf`、`toString` 等 Object 原型上的名字 | iOS 编译报错 |

**Web 正常不代表 App 正常**，`lsp lint` 通过也不代表能编译：每次改组件后三端都要编译。

## 开发与检查

HBuilderX 5.x 需要先打开（CLI 连的是它的主程序）：

```bash
CLI=/Applications/HBuilderX.app/Contents/MacOS/cli
$CLI open
$CLI project open --path "$PWD"

# Web：开发服务器，端口见 manifest.json 的 web.devServer.port（19596）
$CLI launch web --project "$PWD"

# App：只编译不运行（各几秒到几十秒），--continue-on-error 一次列出全部错误
$CLI launch app-ios --project "$PWD" --iosTarget simulator --compile true --continue-on-error true
$CLI launch app-android --project "$PWD" --compile true --continue-on-error true

# 在 iOS 模拟器上运行（xcrun simctl list devices booted 查 UDID），--pagePath 直接打开某一页
$CLI launch app-ios --project "$PWD" --iosTarget simulator --deviceId <UDID> --pagePath pages/components/button

# 与 antdv-next-mobile 的接口对齐检查（需要同级目录有 antdv-next-mobile，或用 MOBILE_DIR 指定）
node tools/parity/check.mjs
```

- `launch` 命令不会自己退出时，把输出重定向到文件再看（管道接 `tail` 会一直没有输出）。
- 新增组件：`components/am-foo/am-foo.uvue` + `pages/components/foo.uvue`（在 `pages.json` 和首页登记）+ 对齐检查通过
  + Web、iOS、Android 三端编译通过。

## 提交

Conventional commits：`feat(button): ...`、`fix(popup): ...`、`docs: ...`、`chore: ...`。
