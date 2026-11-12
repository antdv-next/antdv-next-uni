<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-checkbox-group 多选组

多选组（= antdv-next-mobile 的 CheckboxGroup）：v-model:value（数组）、options、disabled、max（最多选几项，选满后其余的不能再选）、block（列表式：每项占一行）、shape 同名同义；事件 update:value、change（选中的值）；选项用 `options`，或在默认插槽里放 `<am-checkbox value="…">`（两者可以同时用）。

## 用法

```vue
<am-checkbox-group v-model:value="fruits" :options="fruitOptions" @change="onChange" />
```

摘自示例页 [pages/components/checkbox.uvue](../../pages/components/checkbox.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `any[]` | `[]` | **`v-model:value`** 数组 |
| `options` | `any[]` | `[]` | - |
| `disabled` | `boolean` | `false` | - |
| `max` | `number` | `0` | 最多选几项；0 为不限 |
| `block` | `boolean` | `false` | 列表式：每项占一行 |
| `shape` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: any[])` | `v-model:value` 的更新 |
| `change` | `(next)` | 选中的值 |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 CheckboxGroup，文档在 [checkbox](https://m.antdv-next.com/components/checkbox) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `options` 的每一项是 AmOption（{ label, value, disabled }）、字符串或数字；label 只能是文字，没有 labelRender；
- 没有 defaultValue（用 v-model:value）、name、role

登记在 [tools/parity/known/checkbox-group.json](../../tools/parity/known/checkbox-group.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和初始值，非受控用法请用 v-model:value |
| 没有的属性 | `name` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `role` | view 不支持无障碍属性 |
| 没有的属性 | `labelRender` | UTS 里不能把渲染函数当属性传；选项的文字只能是字符串，要自定义就在默认插槽里放 `<am-checkbox>` |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
