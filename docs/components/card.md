<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-card 卡片

卡片（= antdv-next-mobile 的 Card）：title、extra、cover、footer、loading、variant（outlined / borderless）、bordered（variant 的别名，false = borderless）、size（default / middle / small）、type（inner）、clickable 同名同义；插槽 default、title、extra、cover、footer、actions。

## 用法

```vue
<am-card title="卡片标题" extra="更多">
  <text>卡片的内容写在默认插槽里。</text>
  <text>默认带一圈细边框。</text>
</am-card>
```

摘自示例页 [pages/components/card.uvue](../../pages/components/card.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | - |
| `extra` | `string` | `''` | - |
| `cover` | `string` | `''` | 封面图片的地址 |
| `footer` | `string` | `''` | - |
| `loading` | `boolean` | `false` | - |
| `variant` | `string` | `''` | outlined / borderless |
| `bordered` | `boolean` | `true` | variant 的别名，false = borderless |
| `size` | `string` | `''` | default / middle / small |
| `type` | `string` | `''` | inner |
| `clickable` | `boolean` | `false` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `click` | `(event: UniPointerEvent)` | uni 端多出的事件：uvue 里组件上没声明的事件不会落到根节点，要显式声明（移动端库靠 attrs 透传） |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `title` | - | - |
| `extra` | - | - |
| `cover` | - | 有默认内容 |
| `footer` | - | - |
| `actions` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/card](https://m.antdv-next.com/components/card)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- title / extra / footer 是字符串，`cover` 是图片地址；自定义内容用同名插槽；
- 没有 `actions` 属性（节点数组放不进数据）：操作写在 actions 插槽里，每项自己写 flex: 1；
- `loading` 的骨架是几条静态的色块（没有 @keyframes，闪动不起来）；
- 多出 click 事件（组件上没声明的事件不会落到根节点），写了 clickable 才有按下的反馈；
- 头部固定高度（App 端的 min-height 不含内边距），标题只显示一行

登记在 [tools/parity/known/card.json](../../tools/parity/known/card.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `actions` | 节点数组放不进数据（UTS 里不能存 VNode）：操作写在 actions 插槽里 |
| 多出的事件 | `click` | uvue 里组件上没声明的事件不会落到根节点，要显式声明（移动端库靠 attrs 透传） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
