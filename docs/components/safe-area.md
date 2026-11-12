<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-safe-area 安全区

安全区域（= antdv-next-mobile 的 SafeArea）：position（top / bottom）同名同义。在刘海、底部横条的位置留出空白，放在吸顶 / 吸底的栏里（内容写在默认插槽里时，空白加在内容的上方 / 下方）。

## 用法

```vue
<am-safe-area position="top" root-class="demo__area" />
```

摘自示例页 [pages/components/safe-area.uvue](../../pages/components/safe-area.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | `string` | `'bottom'` | top / bottom |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/safe-area](https://m.antdv-next.com/components/safe-area)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 高度来自 uni-app x 的 --uni-safe-area-inset-top / bottom（不是 env()），没有 --am-safe-area-multiple（没有 calc()）；
- 有原生导航栏的页面顶部安全区域为 0（导航栏已经避开了刘海）

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
