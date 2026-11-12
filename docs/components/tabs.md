<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-tabs 标签页

标签页（= antdv-next-mobile 的 Tabs）：items（key、label、content、icon、disabled、forceRender、destroyOnHidden）、v-model:activeKey、defaultActiveKey、type（line / card / capsule）、size、centered、stretch、tabPlacement（top / bottom）、animated、destroyOnHidden、swipeable 同名同义；事件 update:activeKey、change、tabClick；插槽 labelRender、contentRender、default（内容的兜底）、leftExtra、rightExtra，前三个的参数是 { item, index }。下划线只有一条，切换时滑到选中项的正中（transform 平移，不改 left）：平分宽度时用百分比平移（不用量尺寸，第一帧就在对的位置）；标签可以横向滚动时量出选中项的位置，并把选中项滚到中间。

## 用法

```vue
<am-tabs v-model:activeKey="active" :items="basic" @change="onChange" />
```

摘自示例页 [pages/components/tabs.uvue](../../pages/components/tabs.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `AmTabsItem[]` | `[]` | key、label、content、icon、disabled、forceRender、destroyOnHidden |
| `activeKey` | `string` | `''` | **`v-model:activeKey`** |
| `defaultActiveKey` | `string` | `''` | - |
| `type` | `string` | `'line'` | line / card / capsule |
| `size` | `string` | `''` | - |
| `centered` | `boolean` | `false` | - |
| `tabPlacement` | `string` | `'top'` | top / bottom |
| `animated` | `boolean` | `true` | 下划线切换时是否滑动 |
| `destroyOnHidden` | `boolean` | `false` | - |
| `swipeable` | `boolean` | `false` | 在内容区左右滑动切换标签 |
| `stretch` | `boolean` | `false` | 标签平分宽度（不超过 4 个且没有 centered 时总是平分） |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:activeKey` | `(activeKey: string)` | `v-model:activeKey` 的更新 |
| `change` | `(key)` | - |
| `tabClick` | `(key, event: UniPointerEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `{ item, index }` | 内容的兜底 |
| `leftExtra` | - | - |
| `labelRender` | `{ item, index }` | 有默认内容 |
| `rightExtra` | - | - |
| `contentRender` | `{ item, index }` | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/tabs](https://m.antdv-next.com/components/tabs)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- key 是字符串；空字符串表示“没传”（这时用 defaultActiveKey，再没有就是第一个未禁用的标签）；
- 标签的 label / content 是文字、icon 是图标名（UTS 里不能把 VNode 放进数据）；自定义内容用插槽；
- stretch 是布尔值，没有“未设置”：标签不超过 4 个且没有 centered 时总是平分，stretch 只能把更多的标签也强制平分；
- animated 只有布尔值，控制下划线的滑动；内容区切换没有滑动动画；
- swipeable 是“在内容区左右一划就切换”，内容不跟手；
- 没有 sticky / offsetTop（App 端没有 position: sticky）；没有已废弃的 tabPosition

登记在 [tools/parity/known/tabs.json](../../tools/parity/known/tabs.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `tabPosition` | 已废弃的属性不移植，用 tabPlacement |
| 没有的属性 | `sticky` | App 端没有 position: sticky；需要吸顶时把标签栏放在滚动区域外面 |
| 没有的属性 | `offsetTop` | 同 sticky |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
