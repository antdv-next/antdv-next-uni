<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-col 栅格列

栅格列（= antdv-next-mobile 的 Col）：span（占 24 份中的几份，0 为不显示）、offset（左侧空几份）、push / pull（向右 / 向左移动几份）、flex（1、'100px'、'auto'、'none'、'1 1 200px'）同名同义；放在 `<am-row>` 中。

## 用法

```vue
<am-col :span="24"><view><text>24</text></view></am-col>
```

摘自示例页 [pages/components/grid.uvue](../../pages/components/grid.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `span` | `number` | `-1` | 占 24 份中的几份，0 为不显示 |
| `offset` | `number` | `0` | 左侧空几份 |
| `push` | `number` | `0` | - |
| `pull` | `number` | `0` | 向右 / 向左移动几份 |
| `flex` | `string` | `''` | 1、'100px'、'auto'、'none'、'1 1 200px' |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 Col，文档在 [grid](https://m.antdv-next.com/components/grid) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- span / offset / push / pull 只有数字，flex 是字符串（UTS 的属性不能是 number | string 的联合类型）；
- 没有 `order`：App 端没有 CSS 的 order；
- 没写 span 也没写 flex 时占满一行（span = 24）

登记在 [tools/parity/known/col.json](../../tools/parity/known/col.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `order` | App 端没有 CSS 的 order |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
