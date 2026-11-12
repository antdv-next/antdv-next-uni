<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-index-bar-anchor 索引栏的锚点

索引栏的锚点（= antdv-next-mobile 的 IndexBarAnchor）：放在 `<am-index-bar>` 里每个分组的前面，index 为右侧索引中的字；默认插槽是锚点的内容（默认显示 index）。挂载时登记到 am-index-bar（它量出每个锚点的位置，用于跳转、高亮与吸顶）。

## 用法

```vue
<am-index-bar-anchor :index="group.index" />
```

摘自示例页 [pages/components/index-bar.uvue](../../pages/components/index-bar.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `index` | `string` | `''` | - |
| `title` | `string` | `''` | 锚点（与吸顶标题）的文字，默认同 index |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 IndexBarAnchor，文档在 [index-bar](https://m.antdv-next.com/components/index-bar) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- index 是字符串；
- 多一个 `title`：吸顶的标题由 am-index-bar 另画一份（App 端没有 position: sticky），插槽的内容复制不过去，所以锚点的文字不是 index 时写在 title 上

登记在 [tools/parity/known/index-bar-anchor.json](../../tools/parity/known/index-bar-anchor.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 多出的属性 | `title` | 吸顶的标题由 am-index-bar 另画一份（App 端没有 position: sticky），插槽的内容复制不过去，锚点的文字不是 index 时写在 title 上 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
