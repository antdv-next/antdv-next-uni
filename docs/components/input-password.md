<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-input-password 密码框

密码框（= antdv-next-mobile 的 InputPassword）：一个 `<am-input>` 加上“显示 / 隐藏密码”的按钮。v-model:value、placeholder、disabled、readOnly、maxlength、showCount、allowClear、prefix、suffix、size、status、variant、enterkeyhint、autofocus、name、id、align、visibilityToggle、v-model:iconVisible 同名同义；事件 update:value、update:iconVisible、change、input、pressEnter、focus、blur、clear；方法 focus()、blur()；插槽 prefix、suffix、clearIcon、iconRender（参数 visible）。

## 用法

```vue
<am-input-password v-model:value="password" placeholder="请输入密码" prefix="lock" />
```

摘自示例页 [pages/components/input-more.uvue](../../pages/components/input-more.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string` | `''` | **`v-model:value`** |
| `placeholder` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `readOnly` | `boolean` | `false` | - |
| `maxlength` | `number` | `-1` | - |
| `showCount` | `boolean` | `false` | - |
| `allowClear` | `boolean` | `false` | - |
| `prefix` | `string` | `''` | - |
| `suffix` | `string` | `''` | - |
| `size` | `string` | `''` | - |
| `status` | `string` | `''` | - |
| `variant` | `string` | `''` | outlined / filled / borderless / underlined；空为表单的 variant，再没有则 outlined |
| `enterkeyhint` | `string` | `'done'` | - |
| `autofocus` | `boolean` | `false` | - |
| `name` | `string` | `''` | - |
| `id` | `string` | `''` | - |
| `align` | `string` | `'start'` | - |
| `visibilityToggle` | `boolean` | `true` | 是否显示“显示 / 隐藏密码”的按钮 |
| `iconVisible` | `boolean` | `false` | **`v-model:iconVisible`** 密码是否以明文显示（v-model:iconVisible） |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: string)` | `v-model:value` 的更新 |
| `update:iconVisible` | `(iconVisible: boolean)` | `v-model:iconVisible` 的更新 |
| `change` | `(value: string)` | - |
| `input` | `(value: string)` | - |
| `pressEnter` | `(value: string)` | - |
| `focus` | `(event: UniInputFocusEvent)` | - |
| `blur` | `(event: UniInputBlurEvent)` | - |
| `clear` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `prefix` | - | - |
| `clearIcon` | - | 有默认内容 |
| `suffix` | - | - |
| `iconRender` | `{ visible }` | 参数 visible；有默认内容 |

## 方法

通过模板引用调用：`ref<AmInputPasswordComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `focus()` | - |
| `blur()` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 InputPassword，文档在 [input](https://m.antdv-next.com/components/input) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 没有 `iconRender` 属性（渲染函数），自定义图标用 `iconRender` 插槽；
- `iconVisible` 没有“没传”的状态：不用 v-model:iconVisible 时由组件自己记着显示与否，传了 true 之后要靠 update:iconVisible 改回去（即受控）；
- 其余同 `<am-input>`：prefix / suffix 是字符串，change / input 的参数是值，没有 defaultValue、readonly、clearTrigger、inputmode、autocomplete

登记在 [tools/parity/known/input-password.json](../../tools/parity/known/input-password.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空字符串，非受控用法请用 v-model:value |
| 没有的属性 | `readonly` | 只保留 readOnly 一种写法 |
| 没有的属性 | `clearTrigger` | 清除按钮在有内容时一直显示 |
| 没有的属性 | `inputmode` | 原生 input / textarea 组件用 type 选择键盘，没有 inputmode |
| 没有的属性 | `autocomplete` | 原生 input / textarea 组件没有这个属性 |
| 没有的属性 | `iconRender` | UTS 里不能把渲染函数当属性传，自定义图标用 iconRender 插槽（参数 visible） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
