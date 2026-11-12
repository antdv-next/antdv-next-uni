<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-row 栅格行

栅格行（= antdv-next-mobile 的 Row）：24 栅格，gutter（列之间的水平间距，像素）、align（top / middle / bottom / stretch）、justify（start / end / center / space-around / space-between / space-evenly）、wrap 同名同义。列（`<am-col>`）经 provide 拿到间距，各自左右（上下）留一半，行用负外边距抵消。

## 用法

```vue
<am-row root-class="demo__line">
  <am-col :span="24"><view><text>24</text></view></am-col>
</am-row>
```

摘自示例页 [pages/components/grid.uvue](../../pages/components/grid.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `gutter` | `number` | `0` | 列之间的水平间距，像素 |
| `verticalGutter` | `number` | `0` | 行与行之间的垂直间距（像素）= antdv-next-mobile 的 gutter[1] |
| `align` | `string` | `'top'` | top / middle / bottom / stretch |
| `justify` | `string` | `'start'` | start / end / center / space-around / space-between / space-evenly |
| `wrap` | `boolean` | `true` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 Row，文档在 [grid](https://m.antdv-next.com/components/grid) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `gutter` 只有数字（UTS 的属性不能是 number | [水平, 垂直] 的联合类型）：垂直间距用多出的 `verticalGutter`；
- 不写 align 时是 top（同 antdv-next-mobile）

登记在 [tools/parity/known/row.json](../../tools/parity/known/row.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 多出的属性 | `verticalGutter` | = gutter[1]（垂直间距）：UTS 的属性不能是 number \| [水平, 垂直] 的联合类型，gutter 只有数字 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
