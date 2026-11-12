<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-statistic-timer 计时器

计时器（= antdv-next-mobile 的 StatisticTimer）：type（countdown 倒计时 / countup 正计时）、value（目标 / 起始的时间戳）、format（Y M D H m s S，[] 里的文字原样输出，默认 HH:mm:ss）、title、prefix、suffix、loading、valueStyle 同名同义；事件 finish（只有倒计时）、change（每次刷新，参数为剩余 / 已过的毫秒数）；插槽 title、prefix、suffix、formatter（参数 value、formatted、time：{ days, hours, minutes, seconds, milliseconds }）。

## 用法

```vue
<am-statistic-timer title="倒计时" :value="deadline" />
```

摘自示例页 [pages/components/statistic.uvue](../../pages/components/statistic.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `string` | `'countdown'` | countdown 倒计时 / countup 正计时 |
| `value` | `number` | `0` | 目标 / 起始的时间戳 |
| `format` | `string` | `'HH:mm:ss'` | Y M D H m s S，[] 里的文字原样输出，默认 HH:mm:ss |
| `title` | `string` | `''` | - |
| `prefix` | `string` | `''` | - |
| `suffix` | `string` | `''` | - |
| `loading` | `boolean` | `false` | - |
| `valueStyle` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `finish` | `()` | 只有倒计时 |
| `change` | `(diff: number)` | 每次刷新，参数为剩余 / 已过的毫秒数 |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `title` | - | - |
| `prefix` | - | - |
| `suffix` | - | - |
| `formatter` | `{ value, formatted, time }` | 参数 value、formatted、time：{ days, hours, minutes, seconds, milliseconds }；有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 StatisticTimer，文档在 [statistic](https://m.antdv-next.com/components/statistic) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `value` 只能是时间戳（毫秒数字），不能是日期字符串；
- title / prefix / suffix 是字符串（规则同 `<am-statistic>`），`valueStyle` 是 style 字符串；
- 刷新间隔：format 里有毫秒（S）时约 30 次 / 秒（同移动端库），否则 5 次 / 秒——App 端每次刷新都要跨线程更新文字，显示不到毫秒时没必要刷那么快，change 事件也随之变少

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
