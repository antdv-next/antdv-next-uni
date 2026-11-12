<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-descriptions 描述列表

描述列表（= antdv-next-mobile 的 Descriptions）：title、extra、items（label、content、span）、column（每行几项，默认 1）、layout（horizontal 标签在左 / vertical 标签在上）、bordered、size、colon（带边框时不显示）、contentAlign（end：内容靠右，像列表的单元格）同名同义；插槽 title、extra、labelRender、contentRender（后两个的参数是 item、index、value）。每一行都会被占满：一行放不下的项换行，上一行最后一项补齐剩下的列。

## 用法

```vue
<am-descriptions title="用户信息" :items="user" />
```

摘自示例页 [pages/components/descriptions.uvue](../../pages/components/descriptions.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | - |
| `extra` | `string` | `''` | - |
| `items` | `AmDescriptionsItem[]` | `[]` | label、content、span |
| `column` | `number` | `1` | 每行几项，默认 1 |
| `layout` | `string` | `'horizontal'` | horizontal 标签在左 / vertical 标签在上 |
| `bordered` | `boolean` | `false` | - |
| `size` | `string` | `''` | - |
| `colon` | `boolean` | `true` | 带边框时不显示 |
| `contentAlign` | `string` | `'start'` | end：内容靠右，像列表的单元格 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `title` | - | - |
| `extra` | - | - |
| `labelRender` | `{ item, index, value }` | 有默认内容 |
| `contentRender` | `{ item, index, value }` | 后两个的参数是 item、index、value；有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/descriptions](https://m.antdv-next.com/components/descriptions)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- title / extra 以及 items 里的 label / content 是文字（UTS 里不能把节点放进数据），自定义内容用同名插槽；labelRender / contentRender 只有插槽，没有同名的函数属性；
- items 的 `span: 'filled'` 写成 `filled: true`；项没有 class / style / classes / styles；
- 没有 grid：用换行的 flex + 百分比宽度排列，带边框时边框画在每一项的右、下两边

登记在 [tools/parity/known/descriptions.json](../../tools/parity/known/descriptions.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `labelRender` | 是函数（返回节点），UTS 里函数不能返回节点；用同名插槽 |
| 没有的属性 | `contentRender` | 是函数（返回节点），UTS 里函数不能返回节点；用同名插槽 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
