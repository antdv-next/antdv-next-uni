<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-empty 空状态

空状态（= antdv-next-mobile 的 Empty）：image、description 同名同义；插槽 default（底部的操作，通常是按钮）、image、description。description 不写时用语言包的“暂无数据”。

## 用法

```vue
<am-empty />
```

摘自示例页 [pages/components/empty.uvue](../../pages/components/empty.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image` | `string` | `''` | - |
| `description` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 底部的操作，通常是按钮 |
| `image` | - | - |
| `description` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/empty](https://m.antdv-next.com/components/empty)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 默认的图是图标字体里的 inbox（App 端没有内联 SVG，画不了插画）；`image` 是图片地址，或 'simple'（= Empty.PRESENTED_IMAGE_SIMPLE：小一号的图标与留白，用在下拉、列表里），自定义内容用 image 插槽；
- `description` 是字符串，没有 false / null（不显示说明）：要去掉或自定义就写一个 description 插槽

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
