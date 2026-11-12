<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-nav-bar 导航栏

导航栏（= antdv-next-mobile 的 NavBar）：title、subTitle、back（返回箭头旁的文字）、backIcon、left、right、fixed、placeholder、safeArea、bordered、zIndex 同名同义；事件 back；插槽 default / title、subTitle、back、backIcon、left、right。用于 pages.json 里设置了 navigationStyle: custom 的页面；safeArea 时顶部留出状态栏的高度。

## 用法

```vue
<am-nav-bar title="标题" @back="onBack" />
```

摘自示例页 [pages/components/nav-bar.uvue](../../pages/components/nav-bar.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | - |
| `subTitle` | `string` | `''` | - |
| `back` | `string` | `''` | 返回箭头旁的文字 |
| `backIcon` | `string` | `'left'` | 返回箭头的图标名；空字符串为不显示箭头 |
| `left` | `string` | `''` | 左侧（返回区域之后）的文字 |
| `right` | `string` | `''` | 右侧的文字 |
| `fixed` | `boolean` | `false` | - |
| `placeholder` | `boolean` | `false` | 固定时在文档流中保留等高的占位 |
| `safeArea` | `boolean` | `false` | 顶部留出状态栏的高度 |
| `bordered` | `boolean` | `true` | - |
| `zIndex` | `number` | `100` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `back` | `(event: UniPointerEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 有默认内容 |
| `title` | - | 有默认内容 |
| `subTitle` | - | 有默认内容 |
| `backIcon` | - | 有默认内容 |
| `back` | - | 有默认内容 |
| `left` | - | 有默认内容 |
| `right` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/nav-bar](https://m.antdv-next.com/components/nav-bar)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- title / subTitle / back / left / right 是文字，backIcon 是图标名（默认 left）；自定义内容用同名插槽；
- 没有 null / false：`back-icon=""` 只隐藏箭头；箭头和 back 文字都为空（且没有 back / backIcon 插槽）时隐藏整个返回区域；
- 只发出 back 事件，不自动返回（同移动端库）：在事件里调用 uni.navigateBack()

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
