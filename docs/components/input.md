<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-input 输入框

输入框（= antdv-next-mobile 的 Input）：v-model:value、placeholder、type、allowClear、maxlength、showCount、prefix / suffix、variant（outlined / filled / borderless / underlined）、status（error / warning）、size、disabled、readOnly、align（start / end）、autofocus、enterkeyhint 同名同义；事件 update:value、change、input、focus、blur、pressEnter、clear；方法 focus()、blur()。

在 `<am-space-compact>` 里（utils/compact.uts）：尺寸跟随组，默认 outlined（在无边框的表单里也是），内侧的圆角去掉、边框与前一项叠在一起，横向时占满剩余的宽度

## 用法

```vue
<am-input v-model:value="basic" placeholder="请输入内容" />
```

摘自示例页 [pages/components/input.uvue](../../pages/components/input.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string` | `''` | **`v-model:value`** |
| `placeholder` | `string` | `''` | - |
| `type` | `string` | `'text'` | - |
| `allowClear` | `boolean` | `false` | - |
| `maxlength` | `number` | `-1` | - |
| `showCount` | `boolean` | `false` | - |
| `prefix` | `string` | `''` | - |
| `suffix` | `string` | `''` | - |
| `variant` | `string` | `''` | outlined / filled / borderless / underlined；空为跟随表单（表单里默认 borderless），否则 outlined |
| `status` | `string` | `''` | error / warning |
| `size` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `readOnly` | `boolean` | `false` | - |
| `align` | `string` | `'start'` | start / end |
| `autofocus` | `boolean` | `false` | - |
| `enterkeyhint` | `string` | `'done'` | - |
| `name` | `string` | `''` | 原生 input 的 name（表单提交用） |
| `id` | `string` | `''` | 原生 input 的 id |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: string)` | `v-model:value` 的更新 |
| `change` | `(value)` | - |
| `input` | `(value)` | - |
| `focus` | `(event: UniInputFocusEvent)` | - |
| `blur` | `(event: UniInputBlurEvent)` | - |
| `pressEnter` | `(value: string)` | - |
| `clear` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `prefix` | - | - |
| `clearIcon` | - | 有默认内容 |
| `suffix` | - | - |

## 方法

通过模板引用调用：`ref<AmInputComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `focus()` | - |
| `blur()` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/input](https://m.antdv-next.com/components/input)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- prefix / suffix 是字符串：是图标名时显示图标，否则显示文字；自定义内容用同名插槽；
- change / input 的参数是当前的值（字符串），不是事件对象；
- 没有 defaultValue（UTS 里分不出“没传”和空字符串），请用 v-model:value；
- maxlength 为 -1 表示不限；placeholder 的颜色在 UTS 中取主题（placeholder-style 不支持 CSS 变量）

登记在 [tools/parity/known/input.json](../../tools/parity/known/input.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空字符串，非受控用法请用 v-model:value |
| 没有的属性 | `readonly` | 只保留 readOnly 一种写法 |
| 没有的属性 | `clearTrigger` | 清除按钮在有内容时一直显示 |
| 没有的属性 | `inputmode` | 用 type（text / number / digit / tel / idcard）选择键盘 |
| 没有的属性 | `autocomplete` | 原生 input 组件没有这个属性 |
| 没有的事件 | `keydown` | 原生 input 组件没有按键事件，回车用 pressEnter |
| 没有的事件 | `keyup` | 同 keydown |
| 没有的事件 | `compositionstart` | 原生 input 组件没有输入法组合事件 |
| 没有的事件 | `compositionend` | 同 compositionstart |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
