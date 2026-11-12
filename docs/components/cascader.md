<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-cascader 级联选择

级联选择（= antdv-next-mobile 的 Cascader）：触发区 + 底部弹层，上方是已选各级的标签，下方是当前一级的列表，逐级点选。options（带 children）、fieldNames、v-model:value（每一级的值组成的数组）、v-model:open、changeOnSelect（可以只选到中间一级：弹层头部出现“确定”）、loadData（逐级加载 isLeaf 为 false 的选项的下级）、displayRender、notFoundContent、listHeight，以及选择类字段共有的 placeholder、disabled、allowClear、status、variant、size、trigger、suffixIcon、title、okText、cancelText、zIndex、maskClosable、destroyOnHidden 同名同义；事件 update:value、update:open、openChange、change（值、选中的各级选项）、select（点了某一项：选项、第几级）、confirm、cancel、clear、tabChange；插槽 notFoundContent。没开 changeOnSelect 时选到最后一级即提交并关闭。

## 用法

```vue
<am-cascader v-model:value="area" :options="areas" title="选择地区" placeholder="请选择地区" allow-clear @change="onChange" @select="onSelect" />
```

摘自示例页 [pages/components/cascader.uvue](../../pages/components/cascader.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `options` | `any[]` | `[]` | 带 children |
| `fieldNames` | `AmFieldNames \| null` | `null` | - |
| `value` | `any[]` | `[]` | **`v-model:value`** 每一级的值组成的数组 |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `changeOnSelect` | `boolean` | `false` | 可以只选到中间一级：弹层头部出现“确定” |
| `loadData` | `AmCascaderLoadData \| null` | `null` | 逐级加载 isLeaf 为 false 的选项的下级 |
| `displayRender` | `AmCascaderDisplayRender \| null` | `null` | - |
| `notFoundContent` | `string` | `''` | - |
| `listHeight` | `number` | `316` | - |
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
| `update:value` | `(value: any[])` | `v-model:value` 的更新 |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `openChange` | `(open: boolean)` | - |
| `change` | `(values: any[], selected: AmOption[])` | 值、选中的各级选项 |
| `select` | `(option: AmOption, depth)` | 点了某一项：选项、第几级 |
| `confirm` | `(values, selected: AmOption[])` | - |
| `cancel` | `()` | - |
| `clear` | `()` | - |
| `tabChange` | `(index: number)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `notFoundContent` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/cascader](https://m.antdv-next.com/components/cascader)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- options 是 AmOption[]，或任意 JSON 数组配合 fieldNames；
- loadData 的约定不同：参数同为已选的路径，但要**返回**下级选项（Promise`<AmOption[]>`），而不是把 children 写到选项上（UTS 里选项是类的实例，props 只读）；加载过的下级组件自己记着；
- displayRender 返回字符串（不能返回节点），没有 displayRender 插槽；loadData / displayRender 是函数属性（Web 已验证，App 端若不可用：静态数据用 children，显示的文字用 change 事件自己拼）；
- listHeight 是像素数；notFoundContent 是字符串，自定义内容用同名插槽；
- 没有 optionRender（option 插槽）、virtual、listItemHeight、defaultValue / defaultOpen、id；自定义触发区用 `:trigger="false"` + `v-model:open`；title、suffixIcon 是字符串

登记在 [tools/parity/known/cascader.json](../../tools/parity/known/cascader.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空值，非受控用法请用 v-model:value |
| 没有的属性 | `optionRender` | 渲染函数无法表达（UTS 里不能把节点放进数据）；选项显示 label |
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
