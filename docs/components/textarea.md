<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-textarea 多行输入

多行输入（= antdv-next-mobile 的 TextArea）：v-model:value、placeholder、disabled、readOnly、maxlength、rows、autoSize（随内容变高）、showCount、allowClear、size、status、variant、enterkeyhint、autofocus、name、id、align 同名同义；事件 update:value、change、input、pressEnter、focus、blur、clear、resize；方法 focus()、blur()。

## 用法

```vue
<am-textarea v-model:value="note" placeholder="固定 2 行（rows 默认 2）" />
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
| `rows` | `number` | `2` | - |
| `autoSize` | `boolean` | `false` | 随内容变高 |
| `showCount` | `boolean` | `false` | - |
| `allowClear` | `boolean` | `false` | - |
| `size` | `string` | `''` | - |
| `status` | `string` | `''` | - |
| `variant` | `string` | `''` | outlined / filled / borderless / underlined；空为表单的 variant，再没有则 outlined |
| `enterkeyhint` | `string` | `'return'` | - |
| `autofocus` | `boolean` | `false` | - |
| `name` | `string` | `''` | 原生 textarea 的 name |
| `id` | `string` | `''` | 原生 textarea 的 id |
| `align` | `string` | `'start'` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: string)` | `v-model:value` 的更新 |
| `change` | `(value)` | - |
| `input` | `(value)` | - |
| `pressEnter` | `(value: string)` | - |
| `focus` | `(event: UniTextareaFocusEvent)` | - |
| `blur` | `(event: UniTextareaBlurEvent)` | - |
| `clear` | `()` | - |
| `resize` | `(payload)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `clearIcon` | - | 有默认内容 |

## 方法

通过模板引用调用：`ref<AmTextareaComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `focus()` | - |
| `blur()` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 TextArea，文档在 [input](https://m.antdv-next.com/components/input) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- change / input 的参数是当前的值（字符串），不是事件对象；resize 的参数是高度（像素数），不是 { height }；
- `autoSize` 只有布尔值（没有 minRows / maxRows：`rows` 就是最小行数）；
- 没有 defaultValue（用 v-model:value）、readonly（只保留 readOnly）、clearTrigger（有内容时一直显示清除按钮）、inputmode、autocomplete；没有 keydown / keyup / compositionstart / compositionend 事件；
- maxlength 为 -1 表示不限；placeholder 的颜色在 UTS 中取主题（placeholder-style 不支持 CSS 变量）

登记在 [tools/parity/known/textarea.json](../../tools/parity/known/textarea.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空字符串，非受控用法请用 v-model:value |
| 没有的属性 | `readonly` | 只保留 readOnly 一种写法 |
| 没有的属性 | `clearTrigger` | 清除按钮在有内容时一直显示 |
| 没有的属性 | `inputmode` | 原生 input / textarea 组件用 type 选择键盘，没有 inputmode |
| 没有的属性 | `autocomplete` | 原生 input / textarea 组件没有这个属性 |
| 没有的事件 | `keydown` | 原生 input / textarea 组件没有按键事件，回车用 pressEnter |
| 没有的事件 | `keyup` | 同 keydown |
| 没有的事件 | `compositionstart` | 原生 input / textarea 组件没有输入法组合事件 |
| 没有的事件 | `compositionend` | 同 compositionstart |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
