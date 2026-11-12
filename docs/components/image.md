<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-image 图片

图片（= antdv-next-mobile 的 Image）：src、width、height、fallback（加载失败时换成的图片）、placeholder（加载中的占位）、preview（点击全屏预览，默认 false）、fit（contain / cover / fill / none / scale-down）、lazy、radius、round 同名同义；事件 load、error、click、openChange；插槽 placeholder（加载中）、fallback（加载失败）。

## 用法

```vue
<am-image :src="SRC" :width="100" :height="100" />
```

摘自示例页 [pages/components/image.uvue](../../pages/components/image.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | `string` | `''` | - |
| `width` | `number` | `0` | - |
| `height` | `number` | `0` | - |
| `fallback` | `string` | `''` | 加载失败时换成的图片 |
| `placeholder` | `boolean` | `true` | 加载中的占位 |
| `preview` | `boolean` | `false` | 点击全屏预览，默认 false |
| `fit` | `string` | `'fill'` | contain / cover / fill / none / scale-down |
| `lazy` | `boolean` | `false` | - |
| `radius` | `number` | `0` | - |
| `round` | `boolean` | `false` | - |
| `previewList` | `string[]` | `[]` | 预览时可以左右切换的全部图片（不传时只预览这一张） |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `load` | `(event: UniImageLoadEvent)` | - |
| `error` | `(event: UniImageErrorEvent)` | - |
| `click` | `(event: UniPointerEvent)` | - |
| `openChange` | `(payload: boolean)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `fallback` | - | 加载失败；有默认内容 |
| `placeholder` | - | 加载中；有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/image](https://m.antdv-next.com/components/image)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- width / height / radius 是像素数字；width 为 0 时铺满父元素的宽度，height 为 0 时按图片的比例定高度（此时 fit 不起作用：uvue 的 image 没有“原始尺寸”，要么给高度，要么按宽度定高）；
- 预览用系统的 uni.previewImage：`preview` 只有布尔值（没有 { open, src, maxScale… } 对象），`openChange` 只在打开时触发 true（系统的预览关闭时没有回调）；多张一起预览用 `previewList`（移动端库是 `<am-image-preview-group>`）；
- `placeholder` 只有布尔值（自定义占位用同名插槽）；没有 `alt` / `position` / `crossorigin` / `referrerpolicy`（uvue 的 image 没有这些属性）

登记在 [tools/parity/known/image.json](../../tools/parity/known/image.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `alt` | uvue 的 image 没有 alt |
| 没有的属性 | `position` | uvue 的 image 没有 object-position（裁剪方式由 fit 映射到 mode） |
| 没有的属性 | `crossorigin` | uvue 的 image 没有这个属性 |
| 没有的属性 | `referrerpolicy` | uvue 的 image 没有这个属性 |
| 多出的属性 | `previewList` | 预览用系统的 uni.previewImage，多张一起预览的地址列表（移动端库用 `<am-image-preview-group>`，待 ImagePreview 做好后再对齐） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
