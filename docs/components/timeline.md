<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-timeline 时间轴

时间轴（= antdv-next-mobile 的 Timeline）：items（color、placement、loading、title、content、icon）、mode（start / end / alternate；left / right 为旧名）、reverse、pending、pendingDot、variant（outlined / filled）、titleSpan 同名同义；插槽 pending、pendingDot、dotRender、labelRender、contentRender（后三个的参数是 item、index）。title 显示在内容的对侧，有 title（或 mode 为 alternate）时多出标题一栏。

## 用法

```vue
<am-timeline :items="basic" />
```

摘自示例页 [pages/components/timeline.uvue](../../pages/components/timeline.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `AmTimelineItem[]` | `[]` | color、placement、loading、title、content、icon |
| `mode` | `string` | `'start'` | start / end / alternate；left / right 为旧名 |
| `reverse` | `boolean` | `false` | - |
| `pending` | `string` | `''` | - |
| `pendingDot` | `string` | `''` | - |
| `variant` | `string` | `'outlined'` | outlined / filled |
| `titleSpan` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `labelRender` | `{ item, index }` | 有默认内容 |
| `pendingDot` | - | 有默认内容 |
| `dotRender` | `{ item, index }` | 有默认内容 |
| `pending` | - | 有默认内容 |
| `contentRender` | `{ item, index }` | 后三个的参数是 item、index；有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/timeline](https://m.antdv-next.com/components/timeline)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- items 里的 title / content 是文字、icon 是图标名（UTS 里不能把节点放进数据），自定义内容用 labelRender / contentRender / dotRender 插槽；这三个只有插槽，没有同名的函数属性；
- `pending` 是字符串（只要加载中的圆点、不要文字时用 `pending` 插槽）；`pendingDot` 是图标名；
- `titleSpan` 是字符串：24 栅格的份数（如 '6'）或宽度（如 '80px'、'30%'）；
- 没有伪元素：通向 pending 节点的那段轴线是实线，不是虚线；
- items 的项没有 class / style

登记在 [tools/parity/known/timeline.json](../../tools/parity/known/timeline.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `dotRender` | 是函数（返回节点），UTS 里函数不能返回节点；用同名插槽 |
| 没有的属性 | `labelRender` | 是函数（返回节点），UTS 里函数不能返回节点；用同名插槽 |
| 没有的属性 | `contentRender` | 是函数（返回节点），UTS 里函数不能返回节点；用同名插槽 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
