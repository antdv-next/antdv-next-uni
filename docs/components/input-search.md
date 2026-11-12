<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-input-search 搜索框

搜索框（= antdv-next-mobile 的 InputSearch）：v-model:value、placeholder、disabled、readOnly、maxlength、allowClear、prefix（代替搜索图标）、suffix、size、status、variant（默认 filled）、enterkeyhint、autofocus、name、id、enterButton、searchIcon、loading、showCancel、cancelText、round 同名同义；事件 update:value、change、input、pressEnter、focus、blur、clear、search、cancel；方法 focus()、blur()。

## 用法

```vue
<am-input-search ref="searchRef" v-model:value="keyword" @search="onSearch" />
```

摘自示例页 [pages/components/input-more.uvue](../../pages/components/input-more.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string` | `''` | **`v-model:value`** |
| `placeholder` | `string` | `''` | 空为语言包的 InputSearch.placeholder |
| `disabled` | `boolean` | `false` | - |
| `readOnly` | `boolean` | `false` | - |
| `maxlength` | `number` | `-1` | - |
| `allowClear` | `boolean` | `true` | - |
| `prefix` | `string` | `''` | 代替搜索图标：图标名或文字 |
| `suffix` | `string` | `''` | - |
| `size` | `string` | `''` | - |
| `status` | `string` | `''` | - |
| `variant` | `string` | `''` | outlined / filled / borderless / underlined；空为 filled |
| `enterkeyhint` | `string` | `'search'` | - |
| `autofocus` | `boolean` | `false` | - |
| `name` | `string` | `''` | - |
| `id` | `string` | `''` | - |
| `enterButton` | `string` | `''` | 输入框后面的搜索按钮：按钮的文字，或图标名；空为没有 |
| `searchIcon` | `string` | `'search'` | 搜索图标的名称 |
| `loading` | `boolean` | `false` | - |
| `showCancel` | `boolean` | `false` | 显示“取消”（聚焦或有内容时出现） |
| `cancelText` | `string` | `''` | 空为语言包的 InputSearch.cancelText |
| `round` | `boolean` | `true` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: string)` | `v-model:value` 的更新 |
| `change` | `(value)` | - |
| `input` | `(value)` | - |
| `pressEnter` | `(value: string)` | - |
| `focus` | `(event: UniInputFocusEvent)` | - |
| `blur` | `(event: UniInputBlurEvent)` | - |
| `clear` | `()` | - |
| `search` | `(value: string, arg2: 'input' \| 'clear')` | - |
| `cancel` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `prefix` | - | - |
| `clearIcon` | - | 有默认内容 |
| `suffix` | - | - |
| `enterButton` | - | - |

## 方法

通过模板引用调用：`ref<AmInputSearchComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `focus()` | - |
| `blur()` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 InputSearch，文档在 [input](https://m.antdv-next.com/components/input) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- prefix / suffix / searchIcon / enterButton / cancelText 是字符串（图标名或文字），自定义内容用同名插槽；`enterButton` 是按钮的文字，或按钮的图标名（如 'search'）；空为没有按钮；
- change / input 的参数是当前的值；search 的参数是（值，来源 'input' / 'clear'），没有事件对象；
- 没有 defaultValue（用 v-model:value）、readonly（只保留 readOnly）、clearTrigger（有内容时一直显示清除按钮）、inputmode、autocomplete；maxlength 为 -1 表示不限

登记在 [tools/parity/known/input-search.json](../../tools/parity/known/input-search.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空字符串，非受控用法请用 v-model:value |
| 没有的属性 | `readonly` | 只保留 readOnly 一种写法 |
| 没有的属性 | `clearTrigger` | 清除按钮在有内容时一直显示 |
| 没有的属性 | `inputmode` | 原生 input / textarea 组件用 type 选择键盘，没有 inputmode |
| 没有的属性 | `autocomplete` | 原生 input / textarea 组件没有这个属性 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
