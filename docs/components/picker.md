<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-picker 选择器

选择器（= antdv-next-mobile 的 Picker）：触发区 + 底部弹层 + 滚轮，点“确定”才提交。columns（AmOption[][]）、v-model:value（每列一个值）、v-model:open、placeholder、disabled、allowClear、status、variant、size、trigger、suffixIcon、title、okText、cancelText、zIndex、maskClosable、destroyOnHidden、loading、itemHeight、visibleItemCount、format 同名同义；事件 update:value、update:open、openChange、change（提交的值变了：确定或清除）、select（拨动滚轮，尚未提交）、confirm、cancel、clear；插槽 header（头部与滚轮之间）、footer（滚轮下方）。

## 用法

```vue
<am-picker v-model:value="city" :columns="cities" title="选择城市" placeholder="请选择城市" allow-clear />
```

摘自示例页 [pages/components/picker.uvue](../../pages/components/picker.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columns` | `AmOption[][]` | `[]` | - |
| `value` | `any[]` | `[]` | **`v-model:value`** 每列一个值 |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `placeholder` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `allowClear` | `boolean` | `false` | - |
| `status` | `string` | `''` | - |
| `variant` | `string` | `''` | - |
| `size` | `string` | `''` | - |
| `trigger` | `boolean` | `true` | - |
| `suffixIcon` | `string` | `''` | - |
| `title` | `string` | `''` | - |
| `okText` | `string` | `''` | - |
| `cancelText` | `string` | `''` | - |
| `zIndex` | `number` | `1000` | - |
| `maskClosable` | `boolean` | `true` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `loading` | `boolean` | `false` | - |
| `itemHeight` | `number` | `44` | - |
| `visibleItemCount` | `number` | `5` | - |
| `format` | `AmPickerFormat \| null` | `null` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: any[])` | `v-model:value` 的更新 |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `openChange` | `(open: boolean)` | - |
| `change` | `(value, info)` | 提交的值变了：确定或清除 |
| `select` | `(value: any[], info: AmPickerChangeInfo)` | 拨动滚轮，尚未提交 |
| `confirm` | `(value, info)` | - |
| `cancel` | `()` | - |
| `clear` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `header` | - | 头部与滚轮之间 |
| `footer` | - | 滚轮下方 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/picker](https://m.antdv-next.com/components/picker)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- columns 只能是数组（联动的列在 select 事件里自己换）；选项是 AmOption，没有 fieldNames、optionRender、virtual；
- 没有 defaultValue / defaultOpen（UTS 里分不出“没传”）：不绑定 open 时组件自己管开关；
- 自定义触发区不用默认插槽（插槽参数里放不了 toggle 函数）：`:trigger="false"` + `v-model:open`；
- title、suffixIcon 是字符串（suffixIcon 为图标名），没有同名插槽（插槽要经两层组件转发，App 端转发的空插槽会不会盖掉默认内容尚未验证）；没有 id；
- format 是函数属性（Web 已验证；App 端若不可用请改用 select / change 事件自己显示）

登记在 [tools/parity/known/picker.json](../../tools/parity/known/picker.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultOpen` | UTS 的布尔属性分不出“没传”：不绑定 open 时组件自己管开关 |
| 没有的属性 | `id` | view 没有表单语义的 id；表单用 FormItem 的 name |
| 没有的属性 | `fieldNames` | columns 的选项就是 AmOption（label / value / disabled），不需要映射字段名 |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空值，非受控用法请用 v-model:value |
| 没有的属性 | `virtual` | 滚轮是原生的 picker-view，由各端原生实现滚动，不需要虚拟列表 |
| 没有的属性 | `optionRender` | 选项渲染在原生 picker-view-column 里，作用域插槽 / 渲染函数未在 App 端验证，暂不提供 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
