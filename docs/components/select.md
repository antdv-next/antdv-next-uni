<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-select 选择器

选择器（= antdv-next-mobile 的 Select）：触发区 + 底部弹层的选项列表。单选点一下即选中并关闭；`mode="multiple"` 是带“确定”的多选。options、fieldNames、v-model:value（单选为值，多选为数组）、v-model:open、mode、showSearch、filterOption、notFoundContent、maxCount、maxTagCount、loading、listHeight，以及选择类字段共有的 placeholder、disabled、allowClear、status、variant、size、trigger、suffixIcon、title、okText、cancelText、zIndex、maskClosable、destroyOnHidden 同名同义；事件 update:value、update:open、openChange、change（值、选中的选项）、select / deselect（点了某一项；多选时尚未提交）、search、confirm、cancel、clear；插槽 notFoundContent。

## 用法

```vue
<am-select v-model:value="city" :options="cities" title="选择城市" placeholder="请选择城市" allow-clear @change="onChange" />
```

摘自示例页 [pages/components/select.uvue](../../pages/components/select.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `options` | `any[]` | `[]` | - |
| `fieldNames` | `AmFieldNames \| null` | `null` | - |
| `value` | `any \| null` | `null` | **`v-model:value`** 单选为值，多选为数组 |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `mode` | `string` | `''` | - |
| `showSearch` | `boolean` | `false` | - |
| `filterOption` | `boolean` | `true` | - |
| `notFoundContent` | `string` | `''` | - |
| `maxCount` | `number` | `0` | - |
| `maxTagCount` | `number` | `0` | - |
| `loading` | `boolean` | `false` | - |
| `listHeight` | `number` | `360` | - |
| `placeholder` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `allowClear` | `boolean` | `false` | - |
| `status` | `string` | `''` | - |
| `variant` | `string` | `''` | - |
| `size` | `string` | `''` | - |
| `trigger` | `boolean` | `true` | - |
| `suffixIcon` | `string` | `''` | - |
| `title` | `string` | `''` | - |
| `okText` | `string` | `''` | - |
| `cancelText` | `string` | `''` | - |
| `zIndex` | `number` | `1000` | - |
| `maskClosable` | `boolean` | `true` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: any \| null)` | `v-model:value` 的更新 |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `openChange` | `(open: boolean)` | - |
| `change` | `(values: any[] \| any \| null, option)` | 值、选中的选项 |
| `select` | `(value, option: AmOption)` | - |
| `deselect` | `(value, option: AmOption)` | 点了某一项；多选时尚未提交 |
| `search` | `(value: string)` | - |
| `confirm` | `(value)` | - |
| `cancel` | `()` | - |
| `clear` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `notFoundContent` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/select](https://m.antdv-next.com/components/select)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- options 是 AmOption[]，或任意 JSON 数组配合 fieldNames（label / value）；没有分组（`options` 嵌套）；
- 没有值：单选是 null（空字符串也当作没有值），多选是空数组；
- showSearch、filterOption 只有布尔值（filterOption 为 false 时不在本地筛选，自己在 search 事件里换 options）；
- listHeight 是像素数；notFoundContent 是字符串，自定义内容用同名插槽；
- 没有 labelInValue、optionRender / labelRender / maxTagPlaceholder（节点 / 函数属性）、virtual、listItemHeight、defaultValue / defaultOpen、id；自定义触发区用 `:trigger="false"` + `v-model:open`；title、suffixIcon 是字符串

登记在 [tools/parity/known/select.json](../../tools/parity/known/select.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空值，非受控用法请用 v-model:value |
| 没有的属性 | `labelInValue` | 值只支持原始值（字符串 / 数字）；需要选项对象时用 change 事件的第二个参数 |
| 没有的属性 | `optionRender` | 渲染函数无法表达（UTS 里不能把节点放进数据）；选项显示 label + description |
| 没有的属性 | `labelRender` | 渲染函数无法表达；触发区的文字是选项的 label |
| 没有的属性 | `maxTagPlaceholder` | 渲染函数无法表达；超出 maxTagCount 的显示为“+N” |
| 没有的属性 | `virtual` | 选项列表是 scroll-view 里直接渲染，暂无虚拟列表 |
| 没有的属性 | `listItemHeight` | 选项的高度由内容决定（没有虚拟列表，不需要估计高度） |
| 没有的属性 | `defaultOpen` | open 不绑定时组件自己管理显示状态，没有单独的初始值属性 |
| 没有的属性 | `id` | 触发器是 view，没有原生控件的 id |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
