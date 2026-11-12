<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-spin 加载中

加载中（= antdv-next-mobile 的 Spin）：spinning、size（small / middle / large）、description（tip 为旧名）、delay（毫秒，延迟显示以免一闪而过）、fullscreen（盖住整个窗口）同名同义；插槽 default（被盖住的内容）、indicator、description。有默认插槽时盖在内容上（内容变淡、不可点），否则单独显示。

## 用法

```vue
<am-spin size="small" />
```

摘自示例页 [pages/components/spin.uvue](../../pages/components/spin.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `spinning` | `boolean` | `true` | - |
| `size` | `string` | `''` | small / middle / large |
| `description` | `string` | `''` | tip 为旧名 |
| `tip` | `string` | `''` | - |
| `delay` | `number` | `0` | 毫秒，延迟显示以免一闪而过 |
| `fullscreen` | `boolean` | `false` | 盖住整个窗口 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 被盖住的内容 |
| `indicator` | - | 有默认内容 |
| `description` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/spin](https://m.antdv-next.com/components/spin)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 指示器是 `<am-loading>`（内置 loading，App 端没有 @keyframes，图标转不起来）：`indicator` 只有插槽，没有属性；
- 没有 `percent`（内置 loading 画不了进度）；
- description / tip 是字符串，自定义内容用 `description` 插槽

登记在 [tools/parity/known/spin.json](../../tools/parity/known/spin.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `indicator` | 指示器是内置 loading（App 端没有 @keyframes，图标转不起来）；自定义指示器用 indicator 插槽 |
| 没有的属性 | `percent` | 内置 loading 画不了进度；要进度用 `<am-progress type="circle">` |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
