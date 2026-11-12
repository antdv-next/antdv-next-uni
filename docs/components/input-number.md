<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-input-number 数字输入框

数字输入框（= antdv-next-mobile 的 InputNumber）：v-model:value（数字，清空为 null）、min、max、step、precision、disabled、readOnly、controls、mode（spinner：两侧 − / + 按钮，默认；input：普通的数字输入框）、changeOnBlur、prefix、suffix、status、size、variant、placeholder、autofocus、name、id 同名同义；事件 update:value、change、input（输入中的文字）、step（值、{ offset, type: 'up' | 'down', emitter }）、pressEnter、focus、blur；方法 focus()、blur()；插槽 prefix、suffix、upIcon、downIcon。输入过程中不打断，失焦时按 min / max / precision 修正。

在 `<am-space-compact>` 里（utils/compact.uts）：高度与尺寸跟随组（spinner 不再矮一档），默认 outlined，− / 输入区 / + 三块之间没有空隙、边框叠在一起（− / + 画上边框），只有整组最外侧的角是圆的；input 模式占满剩余的宽度

## 用法

```vue
<am-input-number v-model:value="count" :min="1" :max="10" @step="onStep" />
```

摘自示例页 [pages/components/input-number.uvue](../../pages/components/input-number.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `number \| null` | `null` | **`v-model:value`** 数字，清空为 null |
| `min` | `number` | `-9007199254740991` | - |
| `max` | `number` | `9007199254740991` | - |
| `step` | `number` | `1` | - |
| `precision` | `number` | `-1` | 小数位数；-1 为不限 |
| `disabled` | `boolean` | `false` | - |
| `readOnly` | `boolean` | `false` | - |
| `controls` | `boolean` | `true` | 是否显示 − / + 按钮（mode 为 spinner 时） |
| `mode` | `string` | `'spinner'` | spinner：两侧 − / + 按钮，默认；input：普通的数字输入框 |
| `changeOnBlur` | `boolean` | `true` | 失焦时按 min / max / precision 修正输入的值 |
| `prefix` | `string` | `''` | - |
| `suffix` | `string` | `''` | - |
| `status` | `string` | `''` | - |
| `size` | `string` | `''` | - |
| `variant` | `string` | `''` | outlined / filled / borderless / underlined；空为表单的 variant，再没有则 outlined |
| `placeholder` | `string` | `''` | - |
| `autofocus` | `boolean` | `false` | - |
| `name` | `string` | `''` | - |
| `id` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: number \| null)` | `v-model:value` 的更新 |
| `change` | `(value: number \| null)` | - |
| `input` | `(value)` | 输入中的文字 |
| `step` | `(next, info)` | 值、{ offset, type: 'up' \| 'down', emitter } |
| `pressEnter` | `(value: number \| null)` | - |
| `focus` | `(event: UniInputFocusEvent)` | - |
| `blur` | `(event: UniInputBlurEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `downIcon` | - | 有默认内容 |
| `prefix` | - | - |
| `suffix` | - | - |
| `upIcon` | - | 有默认内容 |

## 方法

通过模板引用调用：`ref<AmInputNumberComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `focus()` | - |
| `blur()` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/input-number](https://m.antdv-next.com/components/input-number)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 值只有数字（没有 stringMode）；min / max 不写时为 ∓9007199254740991（即不限）；precision 为 -1 表示不限；
- `controls` 只有布尔值，按钮的图标用 upIcon / downIcon 插槽换；prefix / suffix 是字符串（图标名或文字）；
- 没有 formatter / parser（函数属性）、longPress（按住连续加减）、keyboard、inputmode（min 小于 0 时用文本键盘，否则用带小数点的数字键盘）、defaultValue（用 v-model:value）、readonly（只保留 readOnly）

登记在 [tools/parity/known/input-number.json](../../tools/parity/known/input-number.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和初始值，非受控用法请用 v-model:value |
| 没有的属性 | `readonly` | 只保留 readOnly 一种写法 |
| 没有的属性 | `formatter` | 函数属性暂不提供（显示的文字只按 precision 格式化） |
| 没有的属性 | `parser` | 同 formatter |
| 没有的属性 | `stringMode` | 值只有数字 |
| 没有的属性 | `keyboard` | 没有硬件键盘的方向键事件 |
| 没有的属性 | `longPress` | 按住连续加减暂不提供（App 端的长按与 hover-class 配合未验证） |
| 没有的属性 | `inputmode` | 原生 input 组件用 type 选择键盘：min 小于 0 时用文本键盘，否则用带小数点的数字键盘 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
