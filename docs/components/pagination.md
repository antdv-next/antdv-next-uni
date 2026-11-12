<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-pagination 分页

分页（= antdv-next-mobile 的 Pagination）：v-model:current、defaultCurrent、total、pageSize、simple、disabled、size、showLessItems、hideOnSinglePage、prevIcon、nextIcon 同名同义；事件 update:current、change(page, pageSize)；插槽 itemRender（page、type：page / prev / next / jump-prev / jump-next）、showTotal（total、range）、prevIcon、nextIcon。页码的折叠规则与移动端库相同；simple 为“上一页 / 当前页 / 总页数 / 下一页”。

## 用法

```vue
<am-pagination v-model:current="current" :total="50" @change="onChange" />
```

摘自示例页 [pages/components/pagination.uvue](../../pages/components/pagination.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `current` | `number` | `0` | **`v-model:current`** 当前页（从 1 开始）；0 为没传 |
| `defaultCurrent` | `number` | `1` | - |
| `total` | `number` | `0` | - |
| `pageSize` | `number` | `10` | - |
| `simple` | `boolean` | `false` | - |
| `disabled` | `boolean` | `false` | - |
| `size` | `string` | `''` | - |
| `showLessItems` | `boolean` | `false` | - |
| `hideOnSinglePage` | `boolean` | `false` | - |
| `prevIcon` | `string` | `''` | 上一页的图标名 |
| `nextIcon` | `string` | `''` | 下一页的图标名 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:current` | `(current: number)` | `v-model:current` 的更新 |
| `change` | `(page, pageSize: number)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `showTotal` | `{ total, range }` | total、range |
| `itemRender` | `{ page, type }` | page、type：page / prev / next / jump-prev / jump-next；有默认内容 |
| `prevIcon` | - | 有默认内容 |
| `nextIcon` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/pagination](https://m.antdv-next.com/components/pagination)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- prevIcon / nextIcon 是图标名（空为默认：页码模式是箭头，simple 模式是文字“上一页 / 下一页”）；
- showTotal、itemRender 只有插槽（UTS 的属性里不能放渲染函数）；itemRender 插槽没有 element 参数；
- current 为 0 表示没传（页码从 1 开始），这时用 defaultCurrent 并由组件自己记住当前页

登记在 [tools/parity/known/pagination.json](../../tools/parity/known/pagination.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `showTotal` | UTS 的属性里不能放渲染函数，用 showTotal 插槽（参数 total、range） |
| 没有的属性 | `itemRender` | 同 showTotal，用 itemRender 插槽（参数 page、type） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
