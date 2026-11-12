<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-watermark 水印

水印（= antdv-next-mobile 的 Watermark）：在默认插槽的内容上盖一层不挡操作的水印。content（字符串，数组为多行）、image（优先于 content）、width、height、rotate、zIndex、gap（[横, 纵]）、offset（[左, 上]，默认 gap / 2）、font（color、fontSize、fontWeight、fontStyle）、fullPage（盖住整个页面）同名同义。排法同 Antdv Next：每一行的水印隔一个位置放一个，相邻两行错开。

## 用法

```vue
<am-watermark content="Antdv Next">
  <view>
    <text>水印不挡操作：点下面的按钮试试。</text>
    <view><am-button size="small" :text="'点了 ' + count + ' 次'" @click="count++" /></view>
  </view>
</am-watermark>
```

摘自示例页 [pages/components/watermark.uvue](../../pages/components/watermark.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `zIndex` | `number` | `9` | - |
| `rotate` | `number` | `-22` | 旋转的角度 |
| `width` | `number` | `0` | 一个水印的宽度（像素），0 为按内容估计（图片为 120） |
| `height` | `number` | `0` | 一个水印的高度（像素），0 为按内容估计（图片为 64） |
| `image` | `string` | `''` | 图片水印的地址，优先于 content |
| `content` | `any \| null` | `null` | 文字：字符串，或字符串数组（多行） |
| `font` | `AmWatermarkFont` | `AM_WATERMARK_DEFAULT_FONT` | color、fontSize、fontWeight、fontStyle |
| `gap` | `number[]` | `[100, 100]` | 水印之间的间距：[横向, 纵向] |
| `offset` | `number[]` | `[]` | 第一个水印离左上角的距离：[左, 上]；空为 gap 的一半 |
| `fullPage` | `boolean` | `false` | 盖住整个页面（position: fixed），而不只是插槽的内容 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 方法

通过模板引用调用：`ref<AmWatermarkComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `refresh()` | 内容的大小变化后重新量、重新排水印 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/watermark](https://m.antdv-next.com/components/watermark)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 不是 canvas 画成背景图平铺（App 端没有 background-repeat），而是在一层绝对定位、pointer-events: none 的 view 里按量出来的大小排一批旋转的 `<text>` / `<image>`；最多 400 个（面积很大时调大 gap）；
- 文字的宽高量不到：没给 width / height 时按字数与字号估计（中日韩文字按 1 个字宽、其余按 0.6 个）；
- 没有 remove 事件：uvue 里没有 MutationObserver，别的代码也拿不到这一层的节点；
- font 没有 fontFamily / textAlign（多行总是居中）；
- 内容的大小变化后（列表加载了更多）调用 refresh() 重新量

登记在 [tools/parity/known/watermark.json](../../tools/parity/known/watermark.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的事件 | `remove` | uvue 里没有 MutationObserver，别的代码也拿不到水印层的节点（不存在被外部删改的情况） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
