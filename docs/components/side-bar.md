<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-side-bar 侧边导航

侧边导航（= antdv-next-mobile 的 SideBar）：分类页左侧的竖向导航，右侧放对应的内容。items（key、title、badge、disabled）、v-model:activeKey、defaultActiveKey 同名同义；事件 update:activeKey、change；插槽 title，参数是 { item, index, active }。选中项是容器色并带一条主色的竖线，它上下两项朝它的那个角是圆的。

## 用法

```vue
<am-side-bar v-model:activeKey="active" :items="items" @change="onChange" />
```

摘自示例页 [pages/components/side-bar.uvue](../../pages/components/side-bar.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `AmSideBarItem[]` | `[]` | key、title、badge、disabled |
| `activeKey` | `string` | `''` | **`v-model:activeKey`** |
| `defaultActiveKey` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:activeKey` | `(activeKey: string)` | `v-model:activeKey` 的更新 |
| `change` | `(key)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `title` | `{ item, index, active }` | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/side-bar](https://m.antdv-next.com/components/side-bar)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- key 是字符串；空字符串表示“没传”（这时用 defaultActiveKey，再没有就是第一项）；
- 项的 title 是文字（UTS 里不能把 VNode 放进数据），自定义内容用 title 插槽；项没有 class / style；
- 根节点是 scroll-view：宽 104px，高度由父元素决定（放在定高的横向容器里，或用 rootClass 写高度），没有 height: 100%；
- 徽标自己画（同 am-badge 的样子），不限制最大值

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
