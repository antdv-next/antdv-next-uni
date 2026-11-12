<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-collapse 折叠面板

折叠面板（= antdv-next-mobile 的 Collapse）：items（key、label、content、extra、showArrow、collapsible、forceRender）、v-model:activeKey、defaultActiveKey、accordion、bordered（四周与面板之间的细线）、ghost（透明、没有线）、size、expandIconPlacement（start / end；expandIconPosition 为旧名）、collapsible（header / icon / disabled）、destroyOnHidden 同名同义；事件 update:activeKey、change；插槽 expandIcon（参数 panelKey、isActive）、labelRender、contentRender（参数 item、index）。展开 / 收起有高度动画：内容的高度是 auto，过渡不了，所以先量出内容的高度，在 0 与这个像素值之间过渡，展开完成后换回 auto（内容之后变高也跟着变）；量不到高度的平台直接展开、收起。

## 用法

```vue
<am-collapse v-model:activeKey="activeKey" :items="items" />
```

摘自示例页 [pages/components/collapse.uvue](../../pages/components/collapse.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `AmCollapseItem[]` | `[]` | key、label、content、extra、showArrow、collapsible、forceRender |
| `activeKey` | `string[]` | `[]` | **`v-model:activeKey`** |
| `defaultActiveKey` | `string[]` | `[]` | - |
| `accordion` | `boolean` | `false` | - |
| `bordered` | `boolean` | `true` | 四周与面板之间的细线 |
| `ghost` | `boolean` | `false` | 透明、没有线 |
| `size` | `string` | `''` | - |
| `expandIconPlacement` | `string` | `''` | start / end；expandIconPosition 为旧名 |
| `expandIconPosition` | `string` | `''` | - |
| `collapsible` | `string` | `''` | header / icon / disabled |
| `destroyOnHidden` | `boolean` | `false` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:activeKey` | `(activeKey: string[])` | `v-model:activeKey` 的更新 |
| `change` | `(next: string[])` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `expandIcon` | `{ panelKey, isActive }` | 参数 panelKey、isActive；有默认内容 |
| `labelRender` | `{ item, index }` | 有默认内容 |
| `contentRender` | `{ item, index }` | 参数 item、index；有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/collapse](https://m.antdv-next.com/components/collapse)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 只有 items 的写法，没有 `<am-collapse-panel>` 子组件（默认插槽）；
- activeKey / defaultActiveKey 只能是字符串数组（accordion 时是只有一个 key 的数组），不能是单个 key 或数字；UTS 里分不出“没传”和空数组：activeKey 为空数组时初始值取 defaultActiveKey，之后以 activeKey 的变化为准；
- items 里的 label / content / extra 是文字，自定义内容用 labelRender / contentRender 插槽；`expandIcon` 只有插槽（UTS 里函数不能返回节点）；项没有 class / style / classes / styles

登记在 [tools/parity/known/collapse.json](../../tools/parity/known/collapse.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `expandIcon` | 是函数（返回节点），UTS 里函数不能返回节点；用同名插槽 expandIcon（参数 panelKey、isActive） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
