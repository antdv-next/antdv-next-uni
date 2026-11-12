# 主题

token 的名字、默认值、派生比例与 antdv-next、antdv-next-mobile 相同，CSS 变量同为 `--am-*`。
实现在 [theme/theme.uts](../../uni_modules/antdv-next-uni/theme/theme.uts)，示例见
[pages/components/config-provider.uvue](../../pages/components/config-provider.uvue)。

和移动端库不同的是：App 端没有 `color-mix()`，变量的值也不能再引用 `var()`，所以派生色（`colorPrimaryBg`、`colorBorder` …）
是在 UTS 里按同样的比例算成字面量，再由 `<am-config-provider>` 写成 CSS 变量放在自己的根节点上。

## 全局主题：`setAmTheme`

```ts
import { AmThemeConfig, setAmTheme } from '@/uni_modules/antdv-next-uni/theme/theme.uts'

const config : AmThemeConfig = {
	algorithm: ['dark', 'compact'],
	token: { colorPrimary: '#00b96b', borderRadius: 12 }
}
setAmTheme(config)
```

`setAmTheme(config : AmThemeConfig) : void` 设置全局主题：所有**没有自己 `theme`** 的 `<am-config-provider>` 一起变
（全局状态是响应式的，不需要刷新页面）。每次调用都是整份替换，不与上一次的配置合并；传 `{}` 回到默认主题。

> UTS 里对象字面量不能 `as` 成类型，配置要写成带类型注解的变量（`const config : AmThemeConfig = { ... }`），如上例。

## `AmThemeConfig`

```ts
export type AmThemeConfig = {
	algorithm ?: any          // 'default' | 'dark' | 'compact'，或它们的数组
	token ?: AmThemeToken
}
```

### 算法：暗色与紧凑

`algorithm` 是一个名称，或名称的数组（可以叠加）：

| 值 | 常量 | 效果 |
| --- | --- | --- |
| `'default'` | `AM_ALGORITHM_DEFAULT` | 默认的亮色主题 |
| `'dark'` | `AM_ALGORITHM_DARK` | 暗色：文字 / 背景的基色互换，品牌色与功能色的默认值略暗（主色 `#1668dc`） |
| `'compact'` | `AM_ALGORITHM_COMPACT` | 紧凑：字号、控件高度、圆角、间距整体小一档（见下表括号里的值） |

```ts
const config : AmThemeConfig = { algorithm: 'dark' }
const both : AmThemeConfig = { algorithm: ['dark', 'compact'] }
```

和 antdv-next 不同，这里的算法是**字符串名称**，不是 `theme.darkAlgorithm` 这样的函数。

### token

`AmThemeToken` 里能设置的是“种子 / 别名” token，都是可选的；不写的用默认值或由其他 token 派生。
后台或 PC 端的主题配置里同名的字段可以原样传进来。

| token | 类型 | 默认值（暗色 / 紧凑） |
| --- | --- | --- |
| `colorPrimary` | `string` | `#1677ff`（暗色 `#1668dc`） |
| `colorSuccess` | `string` | `#52c41a`（暗色 `#49aa19`） |
| `colorWarning` | `string` | `#faad14`（暗色 `#d89614`） |
| `colorError` | `string` | `#ff4d4f`（暗色 `#dc4446`） |
| `colorInfo` | `string` | 同 `colorPrimary` |
| `colorLink` | `string` | 同 `colorPrimary` |
| `colorTextBase` | `string` | 文字的基色：`#000000`（暗色 `#ffffff`） |
| `colorBgBase` | `string` | 背景的基色：`#ffffff`（暗色 `#000000`） |
| `fontSize` / `fontSizeSM` / `fontSizeLG` / `fontSizeXL` | `number` | 14 / 12 / 16 / 18（紧凑 13 / 11 / 15 / 17） |
| `controlHeight` / `controlHeightXS` / `controlHeightSM` / `controlHeightLG` | `number` | 40 / 24 / 30 / 48（紧凑 34 / 20 / 26 / 42） |
| `borderRadius` / `borderRadiusXS` / `borderRadiusSM` / `borderRadiusLG` / `borderRadiusXL` | `number` | 8 / 2 / 4 / 12 / 16（紧凑 6 / 2 / 4 / 8 / 12） |
| `paddingXXS` / `paddingXS` / `paddingSM` / `padding` / `paddingMD` / `paddingLG` / `paddingXL` | `number` | 4 / 8 / 12 / 16 / 20 / 24 / 32（紧凑 2 / 6 / 8 / 12 / 16 / 20 / 24） |

颜色要写成十六进制（`#1677ff`），数值的单位是像素。

派生出来的 token（`colorPrimaryBg`、`colorPrimaryHover`、`colorText`、`colorTextSecondary`、`colorBgContainer`、`colorBgLayout`、
`colorFill`、`colorBorder`、`colorSplit` …）不能直接设置，由上面的种子算出来。完整的清单是 `AmTheme` 类型的字段。

## 局部主题：`<am-config-provider :theme>`

给 `<am-config-provider>` 传 `theme`（同样是 `AmThemeConfig`），只影响它里面的组件。嵌套在页面根的 provider 里面时，
内层只换主题变量，不再管页面的高度与背景：

```vue
<script setup lang="uts">
import { AmThemeConfig } from '@/uni_modules/antdv-next-uni/theme/theme.uts'

// 局部主题：只影响这个 provider 里面的组件
const purple : AmThemeConfig = { token: { colorPrimary: '#722ed1', borderRadius: 20 } }
</script>

<template>
	<am-config-provider>
		<am-button type="primary" block text="外层：全局主题" />
		<am-config-provider :theme="purple">
			<am-button type="primary" block text="内层：紫色 + 大圆角" />
		</am-config-provider>
	</am-config-provider>
</template>
```

规则（见 `am-config-provider.uvue`）：

- `theme` 里写了 `algorithm` 或 `token` → 用这份配置**从默认值重新算出整套主题**，不与上层或全局的配置合并
  （例如全局是暗色，局部主题只写了 `token`，那么局部是亮色的；要保持暗色就在局部也写上 `algorithm: 'dark'`）；
- `theme` 没传或是空对象 → 沿用上层 provider 的主题；没有上层时用全局主题（`setAmTheme`）。

页面根上的 provider 还会把原生导航栏的颜色设成主题的容器色，不想要时传 `:navigation-bar="false"`。

## CSS 变量

变量名是 token 名的短横线写法加 `--am-` 前缀：`colorPrimaryBg` → `--am-color-primary-bg`，`borderRadiusLG` → `--am-border-radius-lg`，
`padding` → `--am-padding`。尺寸类的变量带 `px` 单位。在自己的样式里可以直接用（写上回退值，不包 provider 时也能显示）：

```css
.card {
	background-color: var(--am-color-bg-container, #ffffff);
	border-top-left-radius: var(--am-border-radius-lg, 12px);
	border-top-right-radius: var(--am-border-radius-lg, 12px);
	border-bottom-left-radius: var(--am-border-radius-lg, 12px);
	border-bottom-right-radius: var(--am-border-radius-lg, 12px);
}
.card__title {
	color: var(--am-color-text, rgba(0, 0, 0, 0.88));
	font-size: var(--am-font-size-lg, 16px);
}
```

uni-app x 的限制（详见 [AGENTS.md](../../AGENTS.md)）：用到 `var()` 的属性不能写简写（所以上面的圆角分四条写）；
`transition` 里不能用 `var()`；样式不继承，文字的颜色、字号要写在 `<text>` 自己的类上。

## 在 UTS 里取主题：`useAmTheme`

有些地方用不了 CSS 变量（`placeholder-style`、`<loading>` 的颜色、Canvas、拼出来的 style 字符串）。在 `setup` 里调用
`useAmTheme()`，它返回一个**取值函数**（不是 ref），在 `computed` 里调用：

```ts
import { useAmTheme } from '@/uni_modules/antdv-next-uni/theme/theme.uts'

const theme = useAmTheme()
const color = computed(() : string => theme().colorPrimary)
const dark = computed(() : boolean => theme().isDark)
```

所在的 `<am-config-provider>` 有自己的 `theme` 时取到的是局部主题，否则是全局主题。返回的 `AmTheme` 除了全部 token，
还有 `isDark`、`isCompact` 两个标记。

## 其他导出

`theme/theme.uts` 还导出了组件内部用的工具，写自定义组件时可以用：

| 导出 | 说明 |
| --- | --- |
| `deriveTheme(config : AmThemeConfig) : AmTheme` | 由配置算出整套主题 |
| `themeStyle(theme : AmTheme) : string` | 主题的 CSS 变量（style 字符串） |
| `mixColor(a, percent, b) : string` | 两个十六进制颜色按比例混合（相当于 `color-mix()`） |
| `alphaColor(color, percent) : string` | 给颜色加透明度 |
| `amThemeState` | 全局主题的响应式状态（`config`、`theme`）；修改请用 `setAmTheme` |
| `AM_INHERIT_THEME` | 空配置，表示“沿用上层 / 全局主题”（provider 的 `theme` 的默认值） |
