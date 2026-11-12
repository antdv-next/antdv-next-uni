# 国际化

组件里的文案（“确定”“取消”“请选择”“暂无数据”……）都来自语言包，不写死。语言包的结构与 antdv-next-mobile 的 locale 相同
（组件名为键），内置简体中文 `zhCN` 与英文 `enUS`，默认是 `zhCN`。
实现在 [locale/locale.uts](../../uni_modules/antdv-next-uni/locale/locale.uts)。

## 全局语言：`setAmLocale`

```ts
import { enUS, setAmLocale, zhCN } from '@/uni_modules/antdv-next-uni/locale/locale.uts'

setAmLocale(enUS)   // 切到英文
setAmLocale(zhCN)   // 切回中文
```

`setAmLocale(locale : AmLocale) : void` 设置全局语言：所有没有自己 `locale` 的 `<am-config-provider>` 里面的组件跟着变
（全局状态是响应式的）。示例见 [pages/components/config-provider.uvue](../../pages/components/config-provider.uvue) 里切换语言的按钮。

函数式 API（`confirmAmModal` / `alertAmModal`，见 [差异](./differences.md#函数式-api)）的按钮文字取的也是全局语言。

## 局部语言：`<am-config-provider :locale>`

给 `<am-config-provider>` 传 `locale`，只影响它里面的组件；不传时沿用上层 provider 的，没有上层时用全局语言：

```vue
<script setup lang="uts">
import { enUS } from '@/uni_modules/antdv-next-uni/locale/locale.uts'
</script>

<template>
	<am-config-provider>
		<am-empty />
		<am-config-provider :locale="enUS">
			<am-empty />
		</am-config-provider>
	</am-config-provider>
</template>
```

## 语言包的结构：`AmLocale`

| 键 | 内容 |
| --- | --- |
| `locale` | dayjs 风格的语言代码：`zhCN` 是 `'zh-cn'`，`enUS` 是 `'en'`。**空字符串表示“沿用上层 / 全局语言”**，自定义语言包必须填 |
| `common` | `confirm`、`cancel`、`close`、`loading`、`reset`、`done`、`delete`、`back` |
| `Modal` | `okText`、`cancelText`、`justOkText` |
| `Popconfirm` | `okText`、`cancelText` |
| `ActionSheet` | `cancelText` |
| `Picker` | `okText`、`cancelText`、`placeholder` |
| `DatePicker` | `placeholder`、`rangeStartPlaceholder`、`rangeEndPlaceholder`、`year`、`quarter`、`month`、`week`、`day`、`hour`、`minute`、`second`、`am`、`pm` |
| `TimePicker` | `placeholder` |
| `Calendar` | `title`、`confirm`、`today`、`start`、`end`、`startEnd`、`monthFormat`、`weekdays`（周日开始的 7 个）、`rangePrompt` |
| `Cascader` | `placeholder`、`select` |
| `Select` | `placeholder`、`notFoundContent` |
| `Empty` | `description` |
| `Form` | `optional`、`required` |
| `Image` | `preview`、`loadFailed` |
| `Input` | `placeholder`、`clear` |
| `InputSearch` | `placeholder`、`cancelText` |
| `PullToRefresh` | `pulling`、`canRelease`、`refreshing`、`complete` |
| `InfiniteScroll` | `loading`、`noMore`、`failed`、`retry` |
| `Upload` | `upload`、`uploading`、`uploadError`、`removeFile`、`previewFile` |
| `Pagination` | `prev`、`next` |
| `NumberKeyboard` | `done`、`delete` |
| `Typography` | `expand`、`collapse`、`copy`、`copied` |
| `Spin` | `tip` |
| `Dropdown` | `confirm`、`reset` |

每个键对应一个导出的类型（`AmLocaleCommon`、`AmLocaleModal` …），所有字段都是必填的。

与 antdv-next-mobile 的差异（UTS 的类型里不能放函数与元组）：

- `DatePicker.rangePlaceholder` 拆成 `rangeStartPlaceholder` / `rangeEndPlaceholder`；
- `Calendar.rangePrompt(maxRange)` 改成带 `${maxRange}` 的模板字符串，如 `'最多选择 ${maxRange} 天'`；
- `Form.defaultValidateMessages` 只有最常用的 `required` 模板（`Form.required`，`${label}` 为字段名，如 `'请输入${label}'`）。

## 自定义语言包

没有“部分覆盖”的合并函数：`AmLocale` 的字段都是必填的。改几条文案时，以内置的语言包为底、换掉要改的那几组：

```ts
import { AmLocale, setAmLocale, zhCN } from '@/uni_modules/antdv-next-uni/locale/locale.uts'

const custom : AmLocale = {
	locale: 'zh-cn',
	common: zhCN.common,
	Modal: { okText: '好的', cancelText: '算了', justOkText: '知道了' },
	Popconfirm: zhCN.Popconfirm,
	ActionSheet: zhCN.ActionSheet,
	Picker: zhCN.Picker,
	DatePicker: zhCN.DatePicker,
	TimePicker: zhCN.TimePicker,
	Calendar: zhCN.Calendar,
	Cascader: zhCN.Cascader,
	Select: zhCN.Select,
	Empty: { description: '这里什么都没有' },
	Form: zhCN.Form,
	Image: zhCN.Image,
	Input: zhCN.Input,
	InputSearch: zhCN.InputSearch,
	PullToRefresh: zhCN.PullToRefresh,
	InfiniteScroll: zhCN.InfiniteScroll,
	Upload: zhCN.Upload,
	Pagination: zhCN.Pagination,
	NumberKeyboard: zhCN.NumberKeyboard,
	Typography: zhCN.Typography,
	Spin: zhCN.Spin,
	Dropdown: zhCN.Dropdown
}

setAmLocale(custom)
```

只想改某一个组件某一处的文字时，不必动语言包：多数文案有对应的属性（`okText`、`cancelText`、`placeholder`、`description` …），
属性为空时才取语言包。

## 在自己的组件里取文案：`useAmLocale`

在 `setup` 里调用 `useAmLocale()`，它返回一个**取值函数**，在 `computed` 或模板里调用：

```ts
import { formatAmLocale, useAmLocale } from '@/uni_modules/antdv-next-uni/locale/locale.uts'

const locale = useAmLocale()
const okText = computed(() : string => locale().Modal.okText)
// 带 ${name} 的模板用 formatAmLocale 填值
const prompt = computed(() : string => formatAmLocale(locale().Calendar.rangePrompt, 'maxRange', '7'))
```

所在的 `<am-config-provider>` 有 `locale` 时取它的，否则取全局语言。

## 其他导出

| 导出 | 说明 |
| --- | --- |
| `formatAmLocale(template, name, value) : string` | 把模板里的 `${name}` 换成值 |
| `amLocaleState` | 全局语言的响应式状态（`locale`）；修改请用 `setAmLocale` |
| `AM_INHERIT_LOCALE` | `locale` 为空字符串的占位，表示“沿用上层 / 全局语言”（provider 的 `locale` 的默认值） |
