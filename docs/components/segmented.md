<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-segmented 分段控制器

分段控制器（= antdv-next-mobile 的 Segmented）：options（字符串 / 数字 / { label, value, icon, disabled }）、v-model:value、defaultValue、block、size、shape（default / round）、disabled、vertical、orientation 同名同义；事件 update:value、change；插槽 labelRender、iconRender（参数为选项）。选中的底是一块单独的滑块，切换时平移并改宽高滑到新的选项上；量到选项的位置之前（或平台量不到时）由选中项自己画底色，不会出现没有选中态的一帧。

## 用法

```vue
<am-segmented v-model:value="period" :options="periods" @change="onChange" />
```

摘自示例页 [pages/components/segmented.uvue](../../pages/components/segmented.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `options` | `any[]` | `[]` | 字符串 / 数字 / { label, value, icon, disabled } |
| `value` | `string \| number` | `''` | **`v-model:value`** |
| `defaultValue` | `string \| number` | `''` | 没有传 value 时的初始值；也没有时为第一个选项 |
| `block` | `boolean` | `false` | - |
| `size` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `shape` | `string` | `'default'` | default / round |
| `vertical` | `boolean` | `false` | - |
| `orientation` | `string` | `''` | horizontal / vertical，优先于 vertical |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: string \| number)` | `v-model:value` 的更新 |
| `change` | `(value)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `iconRender` | `{ option, label, value, icon, disabled }` | 参数为选项；有默认内容 |
| `labelRender` | `{ option, label, value, icon, disabled }` | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/segmented](https://m.antdv-next.com/components/segmented)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 选项的 label 是文字、icon 是图标名（UTS 里不能把 VNode 放进数据）；自定义内容用插槽；
- 选项没有 className（传给内部节点的类在 App 端不生效）

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
