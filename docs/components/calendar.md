<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-calendar 日历

日历（= antdv-next-mobile 的 Calendar）：上下滚动的月历，选一天、一段日期或多个日期。v-model:value、selectionMode（single / range / multiple）、minDate / maxDate（默认今天 … 六个月后）、maxRange（range：最多几天；multiple：最多几个）、showRangePrompt、rangePrompt、allowSameDay、weekStartsOn（0 周日 / 1 周一）、title、showTitle、showMark（月份的大号水印）、showConfirm（false：选完就提交）、okText、rowHeight、virtual（只渲染可见区域附近的月份）、poppable（true：底部弹层，v-model:open；false：就地显示）、trigger（显示一个输入框样子的触发区）、format（触发区显示的格式）、placeholder、disabled、allowClear、status、variant、size、suffixIcon、zIndex、maskClosable、closable、destroyOnHidden 同名同义；事件 update:value、update:open、openChange、change（提交的值, 显示的文字）、select（点了某一天，尚未提交）、confirm、cancel、clear、monthShow、overRange；插槽 title、footer（参数 confirm、disabled）；方法 scrollToDate(date) / reset() / toggle()。是表单字段：触发区的禁用 / 状态 / 变体在 am-picker-trigger 里合并表单上下文，值提交、弹层关闭时通知 FormItem（utils/picker-field.uts）。

## 用法

```vue
<am-calendar v-model:value="single" trigger allow-clear @change="onChange" @select="onSelect" />
```

摘自示例页 [pages/components/calendar.uvue](../../pages/components/calendar.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `any \| null` | `null` | **`v-model:value`** single：YYYY-MM-DD 字符串；range：[开始, 结束]；multiple：字符串数组 |
| `selectionMode` | `string` | `'single'` | single / range / multiple |
| `minDate` | `string` | `''` | 最早可选的日期（YYYY-MM-DD），空为今天 |
| `maxDate` | `string` | `''` | 最晚可选的日期（YYYY-MM-DD），空为六个月后 |
| `maxRange` | `number` | `0` | range：最多几天；multiple：最多几个；0 为不限 |
| `showRangePrompt` | `boolean` | `true` | - |
| `rangePrompt` | `string` | `''` | 超出 maxRange 时的提示，空为语言包的 Calendar.rangePrompt |
| `allowSameDay` | `boolean` | `false` | - |
| `weekStartsOn` | `number` | `0` | 0 周日 / 1 周一 |
| `title` | `string` | `''` | - |
| `showTitle` | `boolean` | `true` | - |
| `showMark` | `boolean` | `true` | 月份的大号水印 |
| `showConfirm` | `boolean` | `true` | false：选完就提交 |
| `okText` | `string` | `''` | - |
| `rowHeight` | `number` | `64` | - |
| `virtual` | `boolean` | `true` | 只渲染可见区域附近的月份 |
| `poppable` | `boolean` | `true` | true：底部弹层，v-model:open；false：就地显示 |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `trigger` | `boolean` | `false` | 显示一个输入框样子的触发区 |
| `format` | `string` | `'YYYY-MM-DD'` | 触发区显示的格式 |
| `placeholder` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `allowClear` | `boolean` | `false` | - |
| `status` | `string` | `''` | - |
| `variant` | `string` | `''` | - |
| `size` | `string` | `''` | - |
| `suffixIcon` | `string` | `''` | - |
| `zIndex` | `number` | `1000` | - |
| `maskClosable` | `boolean` | `true` | - |
| `closable` | `boolean` | `true` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: any \| null)` | `v-model:value` 的更新 |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `openChange` | `(open: boolean)` | - |
| `change` | `(next, texts)` | 提交的值, 显示的文字 |
| `select` | `(payload)` | 点了某一天，尚未提交 |
| `confirm` | `(payload)` | - |
| `cancel` | `()` | - |
| `clear` | `()` | - |
| `monthShow` | `(info: AmCalendarMonthInfo)` | - |
| `overRange` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `title` | - | 有默认内容 |
| `footer` | `{ confirm, disabled }` | 参数 confirm、disabled；有默认内容 |

## 方法

通过模板引用调用：`ref<AmCalendarComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `scrollToDate(date: string)` | 把某一天所在的月份滚进来：YYYY-MM-DD |
| `reset()` | 放弃正在选的日期，回到已提交的值，并滚到那里 |
| `toggle()` | 开 / 关弹层 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/calendar](https://m.antdv-next.com/components/calendar)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- **值是 YYYY-MM-DD 字符串**（没有 dayjs，也就没有 valueFormat）：single 是一个字符串（空字符串为没选），range 是 [开始, 结束]，multiple 是字符串数组；minDate / maxDate、scrollToDate 的参数也是这个格式；format 只认 YYYY、MM、M、DD、D；
- 没有 disabledDate / formatter / cellRender（函数属性、渲染函数在 App 端受限）：范围用 minDate / maxDate；
- 没有 defaultValue / defaultOpen（UTS 里分不出“没传”）：不绑定 open 时组件自己管开关；没有 id；
- 自定义触发区不用默认插槽（插槽参数里放不了 toggle 函数）：不开 trigger，自己放按钮 + `v-model:open`；
- title、suffixIcon 是字符串（suffixIcon 为图标名）；reset() 没有参数（回到已提交的值）、toggle() 没有参数；
- 每周是一行、七格平分（flex: 1），不用百分比宽度；月份的高度是算出来的（标题 44px + 行数 × rowHeight）；
- 弹层的高度是窗口高度的 80%（算成像素）；就地显示时高度为 --am-calendar-height（默认 520px，在外层节点上设置这个变量可以改）

登记在 [tools/parity/known/calendar.json](../../tools/parity/known/calendar.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空值，非受控用法请用 v-model:value |
| 没有的属性 | `valueFormat` | 没有 dayjs：值固定是 YYYY-MM-DD 字符串（single 为字符串，range / multiple 为字符串数组） |
| 没有的属性 | `disabledDate` | UTS 的函数属性在 App 端受限；范围用 minDate / maxDate |
| 没有的属性 | `formatter` | UTS 的函数属性在 App 端受限：日期格子的文字固定为日 + 今天 / 开始 / 结束 |
| 没有的属性 | `cellRender` | 返回节点的渲染函数无法表达，作用域插槽在循环里的性能与 App 端表现未验证，暂不提供 |
| 没有的属性 | `defaultOpen` | UTS 的布尔属性分不出“没传”：不绑定 open 时组件自己管开关 |
| 没有的属性 | `id` | 触发器是 view，没有原生控件的 id |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
