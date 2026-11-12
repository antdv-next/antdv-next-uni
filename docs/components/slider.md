<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-slider 滑动输入条

滑动输入条（= antdv-next-mobile 的 Slider）：v-model:value（数字；range 时为 [小, 大]）、min、max、step、range、disabled 同名同义；事件 update:value、change（拖动中与松手时）、changeComplete（松手时）。

## 用法

```vue
<am-slider v-model:value="basic" @changeComplete="onChangeComplete" />
```

摘自示例页 [pages/components/slider.uvue](../../pages/components/slider.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `any \| null` | `null` | **`v-model:value`** 数字；range 时为 [小, 大] |
| `min` | `number` | `0` | - |
| `max` | `number` | `100` | - |
| `step` | `number` | `1` | - |
| `range` | `boolean` | `false` | - |
| `disabled` | `boolean` | `false` | - |
| `showValue` | `boolean` | `false` | 在右侧显示当前值 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: any \| null)` | `v-model:value` 的更新 |
| `change` | `(value)` | 拖动中与松手时 |
| `changeComplete` | `(value)` | 松手时 |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

没有插槽。

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/slider](https://m.antdv-next.com/components/slider)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 用内置的 slider 组件（各端原生的拖动手感），不是自己画的轨道，所以没有 marks、dots、included、reverse、vertical / orientation、tooltip（拖动时的气泡）、keyboard、id、ariaLabelForHandle，也没有 mark / handle 插槽；
- `range` 用上下两条：上面一条调小的值，下面一条调大的值（原生 slider 只有一个滑块）；
- `showValue`（多出的属性）：在右侧显示当前值，代替 tooltip；
- 颜色在 UTS 中取主题（slider 的颜色属性不支持 CSS 变量）；没有 defaultValue（用 v-model:value）

登记在 [tools/parity/known/slider.json](../../tools/parity/known/slider.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和初始值，非受控用法请用 v-model:value |
| 没有的属性 | `marks` | 用内置的 slider 组件（各端原生的拖动），不是自己画的轨道，画不了刻度 |
| 没有的属性 | `dots` | 同 marks |
| 没有的属性 | `included` | 同 marks |
| 没有的属性 | `reverse` | 内置的 slider 没有反向 |
| 没有的属性 | `vertical` | 内置的 slider 只有横向 |
| 没有的属性 | `orientation` | 同 vertical |
| 没有的属性 | `keyboard` | 没有硬件键盘的方向键事件 |
| 没有的属性 | `tooltip` | 内置的 slider 没有拖动时的气泡；用 showValue 在右侧显示当前值 |
| 没有的属性 | `id` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `ariaLabelForHandle` | 不支持无障碍属性 |
| 多出的属性 | `showValue` | 在右侧显示当前值，代替 tooltip |
| 没有的事件 | `focus` | 不是原生的可聚焦元素，没有焦点事件 |
| 没有的事件 | `blur` | 不是原生的可聚焦元素，没有焦点事件 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
