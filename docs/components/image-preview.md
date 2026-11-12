<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-image-preview 图片预览

图片预览（= antdv-next-mobile 的 ImagePreview）：全屏的黑色图层，左右滑动翻页。v-model:open、images、v-model:current（从 0 开始）、loop、showIndex（“2 / 5”）、closable、closeIcon、closeOnClick、zIndex 同名同义；事件 update:open、update:current、change（current）、close、openChange、afterOpenChange；插槽 index / footer（参数 { current, total }）、image（参数 { src, index }，替换每一页的图片）、closeIcon。函数式用法（ImagePreview.show）是 utils/image-preview.uts 的 previewAmImage()：用系统的预览，带缩放。

## 用法

```vue
<am-image-preview v-model:open="basicOpen" :images="images" @change="onChange" @afterOpenChange="onAfterOpenChange" />
```

摘自示例页 [pages/components/image-preview.uvue](../../pages/components/image-preview.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `images` | `string[]` | `[]` | - |
| `current` | `number` | `0` | **`v-model:current`** 从 0 开始 |
| `loop` | `boolean` | `true` | - |
| `showIndex` | `boolean` | `true` | “2 / 5” |
| `closable` | `boolean` | `false` | - |
| `closeIcon` | `string` | `'close'` | 关闭图标的名称（`<am-icon>` 的 name）；自定义内容用 closeIcon 插槽 |
| `closeOnClick` | `boolean` | `true` | - |
| `zIndex` | `number` | `1000` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `update:current` | `(current: number)` | `v-model:current` 的更新 |
| `change` | `(next)` | current |
| `close` | `()` | - |
| `openChange` | `(payload: boolean)` | - |
| `afterOpenChange` | `(payload: boolean)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `image` | `{ src, index }` | 参数 { src, index }，替换每一页的图片；有默认内容 |
| `index` | `{ current, total }` | 有默认内容 |
| `closeIcon` | - | 有默认内容 |
| `footer` | `{ current, total }` | 参数 { current, total } |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/image-preview](https://m.antdv-next.com/components/image-preview)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 翻页用内置的 swiper（原生的手势），没有缩放：没有 maxZoom / minZoom / doubleTapZoom（双指缩放与 swiper 的手势要在原生层协调，uvue 里做不了；需要缩放时用 previewAmImage()），也没有 swipeToClose（下拉关闭）；
- images 只能是地址的数组（没有 { src, alt }：uvue 的 image 没有 alt）；closeIcon 是图标名（自定义内容用同名插槽）；
- 没有 Teleport：根节点 fixed 铺满页面（有原生导航栏的页面盖不住导航栏）；Android 的返回键会先关掉它；
- 没有 defaultOpen / defaultCurrent：UTS 里分不出“没传”，请用 v-model

登记在 [tools/parity/known/image-preview.json](../../tools/parity/known/image-preview.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultOpen` | UTS 里分不出“没传”和 false，非受控用法请用 v-model:open |
| 没有的属性 | `defaultCurrent` | 同 defaultOpen，请用 v-model:current |
| 没有的属性 | `swipeToClose` | 翻页用内置的 swiper，纵向的拖动手势要和它在原生层协调，uvue 里做不了；点一下或返回键关闭 |
| 没有的属性 | `maxZoom` | 没有缩放：双指缩放与 swiper 的手势要在原生层协调。需要缩放时用 utils/image-preview.uts 的 previewAmImage()（系统的预览） |
| 没有的属性 | `minZoom` | 同 maxZoom |
| 没有的属性 | `doubleTapZoom` | 同 maxZoom |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
