<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-selector 选择组

选择组（= antdv-next-mobile 的 Selector）：把选项平铺成一组方块，点击选中，适合选项不多的单选 / 多选。options（label、description、value、disabled）、v-model:value（总是数组）、multiple、columns（每行几列；不写时各项按自己的宽度换行）、showCheckMark（选中项右下角的勾）、disabled、id 同名同义；事件 update:value、change（选中的值、{ items: 选中的选项 }）；插槽 label、description、checkMark，参数是 { option, index, checked, disabled }。单选时再点一次已选中的项会取消选中。它是表单字段（utils/form-field.uts）。

## 用法

```vue
<am-selector v-model:value="single" :options="fruits" @change="onChange" />
```

摘自示例页 [pages/components/selector.uvue](../../pages/components/selector.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `options` | `any[]` | `[]` | label、description、value、disabled |
| `value` | `any[]` | `[]` | **`v-model:value`** 总是数组 |
| `multiple` | `boolean` | `false` | - |
| `columns` | `number` | `0` | 每行几列；0 为各项按自己的宽度换行 |
| `showCheckMark` | `boolean` | `true` | 选中项右下角的勾 |
| `disabled` | `boolean` | `false` | - |
| `id` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: any[])` | `v-model:value` 的更新 |
| `change` | `(next: any[], extra)` | 选中的值、{ items: 选中的选项 } |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `label` | `{ option, index, checked, disabled }` | 有默认内容 |
| `description` | `{ option, index, checked, disabled }` | 有默认内容 |
| `checkMark` | `{ option, index, checked, disabled }` | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/selector](https://m.antdv-next.com/components/selector)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 选项的 label / description 是文字（UTS 里不能把 VNode 放进数据），自定义内容用插槽；选项也可以直接写字符串 / 数字；
- 没有 defaultValue（UTS 里分不出“没传”和空数组），请用 v-model:value；没有 fieldNames；
- 没有 CSS grid：columns 用百分比宽度实现，每项外面包一层留出间距的格子；
- 右下角的三角是一个转了 45° 的方块被选项裁出来的（没有 clip-path）

登记在 [tools/parity/known/selector.json](../../tools/parity/known/selector.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空数组，非受控用法请用 v-model:value |
| 没有的属性 | `fieldNames` | 暂不提供：选项按 { label, description, value, disabled } 读取（字符串 / 数字也可以直接当选项） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
