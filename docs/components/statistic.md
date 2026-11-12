<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-statistic 统计数值

统计数值（= antdv-next-mobile 的 Statistic）：title、value、precision、prefix、suffix、groupSeparator、decimalSeparator、loading、valueStyle 同名同义；插槽 title、prefix、suffix、formatter（参数 value）。

## 用法

```vue
<am-statistic title="活跃用户" :value="112893" />
```

摘自示例页 [pages/components/statistic.uvue](../../pages/components/statistic.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | - |
| `value` | `number` | `0` | - |
| `precision` | `number` | `-1` | - |
| `prefix` | `string` | `''` | - |
| `suffix` | `string` | `''` | - |
| `groupSeparator` | `string` | `','` | - |
| `decimalSeparator` | `string` | `'.'` | - |
| `loading` | `boolean` | `false` | - |
| `valueStyle` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `title` | - | - |
| `prefix` | - | - |
| `formatter` | `{ value }` | 参数 value；有默认内容 |
| `suffix` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/statistic](https://m.antdv-next.com/components/statistic)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `value` 只能是数字（UTS 的属性不能是“数字或字符串”）；要显示文字时用 `formatter` 插槽；
- title / prefix / suffix 是字符串：prefix / suffix 是图标名（`<am-icon>` 的 name）时显示图标，否则显示文字；
- `formatter` 只有插槽（UTS 里函数不能返回节点）；`precision` 为 -1 表示不处理小数位；
- `valueStyle` 是 style 字符串（如 'color:#cf1322;'），写在数值、前后缀的 text 上（样式不继承）；
- App 端没有 align-items: baseline，数值与前后缀按底部对齐

登记在 [tools/parity/known/statistic.json](../../tools/parity/known/statistic.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `formatter` | 是函数（返回节点），UTS 里函数不能返回节点；用同名插槽 formatter（参数 value） |
| 没有的属性 | `animation` | 移动端库后加的数字滚动动画，待实现 |
| 没有的事件 | `animationEnd` | 同 animation |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
