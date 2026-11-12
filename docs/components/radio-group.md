<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-radio-group 单选组

单选组（= antdv-next-mobile 的 RadioGroup）：v-model:value、options、optionType（default / button）、buttonStyle（outline / solid）、size（按钮样式的尺寸）、disabled、block（占满宽度：default 时每项是一行，button 时按钮平分）、vertical / orientation（竖排）同名同义；事件 update:value、change；选项用 `options`，或在默认插槽里放 `<am-radio value="…">`（两者可以同时用）。

## 用法

```vue
<am-radio-group v-model:value="gender" :options="genders" />
```

摘自示例页 [pages/components/radio.uvue](../../pages/components/radio.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `any \| null` | `null` | **`v-model:value`** |
| `options` | `any[]` | `[]` | - |
| `optionType` | `string` | `'default'` | default / button |
| `buttonStyle` | `string` | `'outline'` | outline / solid |
| `size` | `string` | `''` | 按钮样式的尺寸 |
| `disabled` | `boolean` | `false` | - |
| `block` | `boolean` | `false` | 占满宽度：default 时每项是一行，button 时按钮平分 |
| `vertical` | `boolean` | `false` | - |
| `orientation` | `string` | `''` | horizontal / vertical；优先于 vertical |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: any \| null)` | `v-model:value` 的更新 |
| `change` | `(value: any \| null)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 RadioGroup，文档在 [radio](https://m.antdv-next.com/components/radio) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `options` 的每一项是 AmOption（{ label, value, disabled }）、字符串或数字；label 只能是文字，没有 labelRender；
- change 的参数是选中的值，不是事件对象；
- 按钮样式的按钮之间有间距（各自带圆角），不是连成一条：没有相邻 / 首尾选择器，连在一起时边框会重叠；
- 没有 defaultValue（用 v-model:value）、name、id

登记在 [tools/parity/known/radio-group.json](../../tools/parity/known/radio-group.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和初始值，非受控用法请用 v-model:value |
| 没有的属性 | `name` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `id` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `labelRender` | UTS 里不能把渲染函数当属性传；选项的文字只能是字符串，要自定义就在默认插槽里放 `<am-radio>` |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
