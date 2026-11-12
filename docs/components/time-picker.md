<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-time-picker 时间选择器

时间选择（= antdv-next-mobile 的 TimePicker）：触发区 + 底部弹层 + 滚轮，点“确定”才提交。v-model:value、v-model:open、format（显示的格式，也决定有哪几列：HH:mm:ss / HH:mm / mm:ss）、valueFormat（值的格式，默认同 format）、hourStep / minuteStep / secondStep、defaultOpenValue、itemHeight、visibleItemCount，以及选择类字段共有的 placeholder、disabled、allowClear、status、variant、size、trigger、suffixIcon、title、okText、cancelText、zIndex、maskClosable、destroyOnHidden 同名同义；事件 update:value、update:open、openChange、change（值、显示的文字）、select（拨动滚轮，尚未提交）、confirm、cancel、clear；插槽 header、footer。

## 用法

```vue
<am-time-picker v-model:value="time" title="选择时间" allow-clear @change="onChange" />
```

摘自示例页 [pages/components/time-picker.uvue](../../pages/components/time-picker.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string` | `''` | **`v-model:value`** |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `format` | `string` | `'HH:mm:ss'` | 显示的格式，也决定有哪几列：HH:mm:ss / HH:mm / mm:ss |
| `valueFormat` | `string` | `''` | 值的格式，默认同 format |
| `hourStep` | `number` | `1` | - |
| `minuteStep` | `number` | `1` | - |
| `secondStep` | `number` | `1` | - |
| `defaultOpenValue` | `string` | `''` | - |
| `itemHeight` | `number` | `44` | - |
| `visibleItemCount` | `number` | `5` | - |
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
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: string)` | `v-model:value` 的更新 |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `openChange` | `(open: boolean)` | - |
| `change` | `(value, text)` | 值、显示的文字 |
| `select` | `(arg1, arg2)` | 拨动滚轮，尚未提交 |
| `confirm` | `(value, text)` | - |
| `cancel` | `()` | - |
| `clear` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `header` | - | - |
| `footer` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/time-picker](https://m.antdv-next.com/components/time-picker)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- **值是字符串**（uni-app x 上没有 dayjs）：格式为 valueFormat，空字符串表示没有值；defaultOpenValue 也是这个格式；格式只认 HH mm ss 三个占位符，所以没有 use12Hours（h / a）；
- 显示哪几列只看 format，没有 showHour / showMinute / showSecond（UTS 的布尔属性分不出“没传”）；
- 没有 disabledTime / filter / renderLabel（函数属性）、virtual、defaultValue / defaultOpen、id；
- 自定义触发区用 `:trigger="false"` + `v-model:open`；title、suffixIcon 是字符串，没有同名插槽

登记在 [tools/parity/known/time-picker.json](../../tools/parity/known/time-picker.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `use12Hours` | 时间格式只支持 HH mm ss（没有 dayjs），不支持 12 小时制的 h / a |
| 没有的属性 | `showHour` | UTS 的布尔属性分不出“没传”：显示哪几列只看 format |
| 没有的属性 | `showMinute` | 同 showHour |
| 没有的属性 | `showSecond` | 同 showHour |
| 没有的属性 | `disabledTime` | UTS 的函数属性在 App 端受限，且返回节点的渲染函数无法表达 |
| 没有的属性 | `filter` | UTS 的函数属性在 App 端受限，且返回节点的渲染函数无法表达；步长用 hourStep / minuteStep / secondStep |
| 没有的属性 | `renderLabel` | UTS 的函数属性在 App 端受限，且返回节点的渲染函数无法表达；选项文字为数字 + 语言包的单位 |
| 没有的属性 | `virtual` | 滚轮是原生的 picker-view，由各端原生实现滚动，不需要虚拟列表 |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空值，非受控用法请用 v-model:value |
| 没有的属性 | `defaultOpen` | open 不绑定时组件自己管理显示状态，没有单独的初始值属性 |
| 没有的属性 | `id` | 触发器是 view，没有原生控件的 id |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
