<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-input-otp 一次性密码框

一次性密码输入框（= antdv-next-mobile 的 InputOTP）：验证码、支付密码那种一格一个字符的输入。length、v-model:value、mask（true 显示圆点，字符串则用它的第一个字符）、separator、disabled、status、size、variant、inputMode（默认 numeric：数字键盘）、autoFocus、name、id 同名同义；事件 update:value（每次输入）、change（填满时）、input（每一格的内容）、focus、blur；插槽 separator（参数 index）；方法 focus() / blur()。做法同移动端库：格子是按值画出来的，上面盖一个透明的原生 input 管焦点、键盘与粘贴。是表单字段：禁用、状态、变体跟随所在的 Form / FormItem，值变化、失焦时通知 FormItem（utils/form-field.uts）。

## 用法

```vue
<am-input-otp ref="otpRef" v-model:value="code" @change="onChange" @input="onInput" />
```

摘自示例页 [pages/components/input-otp.uvue](../../pages/components/input-otp.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `length` | `number` | `6` | - |
| `value` | `string` | `''` | **`v-model:value`** |
| `mask` | `boolean \| string` | `false` | true 显示圆点；字符串则用它的第一个字符遮住内容（值不变） |
| `separator` | `string` | `''` | 格子之间的分隔文字 |
| `disabled` | `boolean` | `false` | - |
| `status` | `string` | `''` | - |
| `size` | `string` | `''` | - |
| `variant` | `string` | `''` | outlined / filled / borderless / underlined；空为跟随表单，否则 outlined |
| `inputMode` | `string` | `'numeric'` | numeric / decimal / tel / text |
| `autoFocus` | `boolean` | `false` | - |
| `name` | `string` | `''` | - |
| `id` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: string)` | 每次输入 |
| `change` | `(next)` | 填满时 |
| `input` | `(payload)` | 每一格的内容 |
| `focus` | `(event: UniInputFocusEvent)` | - |
| `blur` | `(event: UniInputBlurEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `separator` | `{ index }` | 参数 index；有默认内容 |

## 方法

通过模板引用调用：`ref<AmInputOtpComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `focus()` | - |
| `blur()` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 InputOTP，文档在 [input](https://m.antdv-next.com/components/input) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- separator 是字符串，自定义内容用 separator 插槽；
- 没有 formatter（函数属性在 App 端受限）：需要过滤字符时在 update:value 里自己处理；
- 没有 defaultValue（UTS 里分不出“没传”和空字符串），请用 v-model:value；
- inputMode 只认 numeric（数字键盘）、decimal（带小数点）、tel、text，对应原生 input 的 type；
- 光标是按定时器闪的（没有 @keyframes）；原生 input 的光标位置不可控，总是当作在末尾输入

登记在 [tools/parity/known/input-otp.json](../../tools/parity/known/input-otp.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空字符串，非受控用法请用 v-model:value |
| 没有的属性 | `formatter` | UTS 的函数属性在 App 端受限；需要过滤字符时在 update:value 里自己处理 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
