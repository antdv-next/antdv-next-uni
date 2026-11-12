<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-dropdown-item 下拉菜单的一项

下拉菜单的一项（= antdv-next-mobile 的 DropdownItem）：菜单栏上的一个标题 + 点开后在栏下方展开的面板。title、options（label、value、disabled）、v-model:value、defaultValue、highlight、disabled、closeOnSelect、showFooter、confirmText、resetText、arrowIcon、forceRender、destroyOnHidden 同名同义；事件 update:value、change（value, option）、confirm、reset、afterOpenChange；插槽 default（自定义面板，参数 close）、title、arrowIcon。

## 用法

```vue
<am-dropdown-item item-key="sort" v-model:value="sort" :options="sorts" @change="onSort" />
```

摘自示例页 [pages/components/dropdown.uvue](../../pages/components/dropdown.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `itemKey` | `string` | `''` | 这一项的 key（对应 am-dropdown 的 activeKey）；不写时按顺序为 '0'、'1'…… |
| `title` | `string` | `''` | 菜单栏上的标题；空时显示已选选项的 label |
| `options` | `AmDropdownOption[]` | `[]` | label、value、disabled |
| `value` | `string \| number` | `''` | **`v-model:value`** |
| `defaultValue` | `string \| number` | `''` | - |
| `highlight` | `boolean` | `false` | 高亮标题（比如已经应用了筛选条件） |
| `disabled` | `boolean` | `false` | - |
| `closeOnSelect` | `boolean` | `true` | - |
| `showFooter` | `boolean` | `false` | 显示“重置 / 确定”页脚（自定义面板用） |
| `confirmText` | `string` | `''` | 确定按钮的文字，空为语言包的 Dropdown.confirm |
| `resetText` | `string` | `''` | - |
| `arrowIcon` | `string` | `''` | 箭头的图标名，优先于 am-dropdown 的 arrowIcon |
| `forceRender` | `boolean` | `false` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: string \| number)` | `v-model:value` 的更新 |
| `change` | `(value, option: AmDropdownOption)` | value, option |
| `confirm` | `()` | - |
| `reset` | `()` | - |
| `afterOpenChange` | `(payload: boolean)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `{ close }` | 自定义面板，参数 close；有默认内容 |
| `title` | - | 有默认内容 |
| `arrowIcon` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 DropdownItem，文档在 [dropdown](https://m.antdv-next.com/components/dropdown) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 多一个 `itemKey`：组件里拿不到 vnode 的 key，不写时按顺序为 '0'、'1'……；
- title、选项的 label、confirmText / resetText 是文字，arrowIcon 是图标名；自定义内容用插槽；
- 写了默认插槽就不再渲染选项列表：要用 options 时不要写默认插槽；
- 面板是 fixed 的一层（没有 Teleport），rootClass 加在这一层上；面板的最大高度是菜单栏下方可用高度的 70%（算成像素）；
- Android 的返回键会先收起面板

登记在 [tools/parity/known/dropdown-item.json](../../tools/parity/known/dropdown-item.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 多出的属性 | `itemKey` | uni-app x 的组件里拿不到 vnode 的 key，这一项的 key 用属性传（不写时按顺序为 '0'、'1'……） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
