<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-picker-view 选择器视图

滚轮（= antdv-next-mobile 的 PickerView）：columns（AmOption[][]，每列一组选项）、v-model:value（每列一个值）、loading、itemHeight、visibleItemCount 同名同义；事件 update:value、change（值、{ items, columnIndex }）；插槽 loading。没有值（或值找不到）的列显示第一个没禁用的选项。

## 用法

```vue
<am-picker-view v-model:value="day" :columns="single" />
```

摘自示例页 [pages/components/picker-view.uvue](../../pages/components/picker-view.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columns` | `AmOption[][]` | `[]` | AmOption[][]，每列一组选项 |
| `value` | `any[]` | `[]` | **`v-model:value`** 每列一个值 |
| `loading` | `boolean` | `false` | - |
| `itemHeight` | `number` | `44` | - |
| `visibleItemCount` | `number` | `5` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: any[])` | `v-model:value` 的更新 |
| `change` | `(values: any[], info: AmPickerChangeInfo)` | 值、{ items, columnIndex } |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `loading` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/picker-view](https://m.antdv-next.com/components/picker-view)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 基于原生的 picker-view / picker-view-column（各端原生的滚动与回弹），所以没有 virtual、optionRender / option 插槽；
- columns 只能是数组，不能是函数（联动的列请在 change 里自己换 columns）；选项是 AmOption，没有 fieldNames；
- 没有 defaultValue（UTS 里分不出“没传”），请用 v-model:value；
- picker-view 的 indicator-style 不支持 CSS 变量，选中框的高度在 UTS 里拼

登记在 [tools/parity/known/picker-view.json](../../tools/parity/known/picker-view.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `fieldNames` | columns 的选项就是 AmOption（label / value / disabled），不需要映射字段名 |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空值，非受控用法请用 v-model:value |
| 没有的属性 | `optionRender` | 选项渲染在原生 picker-view-column 里，作用域插槽 / 渲染函数未在 App 端验证，暂不提供 |
| 没有的属性 | `virtual` | 滚轮是原生的 picker-view，由各端原生实现滚动，不需要虚拟列表 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
