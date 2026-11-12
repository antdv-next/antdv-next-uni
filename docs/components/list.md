<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-list 列表

列表（= antdv-next-mobile 的 List）：移动端最常用的单元格列表。header、footer、mode（default / card）同名同义，列表项用 `<am-list-item>`。

## 用法

```vue
<am-list header="基础用法">
  <am-list-item title="单行列表" />
  <am-list-item title="带额外内容" extra="内容" />
  <am-list-item title="带描述" description="描述信息显示在标题下方" :bordered="false" />
</am-list>
```

摘自示例页 [pages/components/list.uvue](../../pages/components/list.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `header` | `string` | `''` | - |
| `footer` | `string` | `''` | - |
| `mode` | `string` | `'default'` | card：带外边距的圆角卡片 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `header` | - | - |
| `footer` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/list](https://m.antdv-next.com/components/list)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- header / footer 是字符串，自定义内容用同名插槽；
- 没有数据模式（dataSource / renderItem / virtual）：长列表请用 uni-app x 的 list-view

登记在 [tools/parity/known/list.json](../../tools/parity/known/list.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `bordered` | 待实现 |
| 没有的属性 | `size` | 待实现 |
| 没有的属性 | `dataSource` | 没有数据模式：UTS 里不能把渲染函数放进属性，长列表用 uni-app x 的 list-view |
| 没有的属性 | `renderItem` | 同 dataSource |
| 没有的属性 | `rowKey` | 同 dataSource |
| 没有的属性 | `virtual` | 同 dataSource |
| 没有的属性 | `height` | 同 dataSource |
| 没有的属性 | `itemHeight` | 同 dataSource |
| 没有的属性 | `loading` | 同 dataSource |
| 没有的属性 | `locale` | 同 dataSource |
| 没有的事件 | `reachEnd` | 同 dataSource |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
