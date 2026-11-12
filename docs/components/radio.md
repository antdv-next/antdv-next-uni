<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-radio 单选框

单选框（= antdv-next-mobile 的 Radio）：v-model:checked、disabled、value（在 `<am-radio-group>` 里用）、optionType（default / button）、block（整行：文字在前、圆圈在后）同名同义；事件 update:checked、change、click；插槽 default（文字处的自定义内容）、icon（参数 checked、disabled）。放在 `<am-radio-group>` 里时，选中与否由组的 value 决定，点击交给组处理。

选中时圆点缩放出现、边框变色：要过渡的值写在内联 style 上（Android 上只切换类名不会过渡）

## 用法

```vue
<am-radio v-model:checked="single" label="单个单选框（选中后不能取消）" />
```

摘自示例页 [pages/components/radio.uvue](../../pages/components/radio.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | **`v-model:checked`** |
| `disabled` | `boolean` | `false` | - |
| `value` | `any \| null` | `null` | 在 `<am-radio-group>` 里代表的值 |
| `optionType` | `string` | `''` | default / button |
| `block` | `boolean` | `false` | 整行：文字在前、圆圈在后 |
| `label` | `string` | `''` | 文字 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:checked` | `(checked: boolean)` | `v-model:checked` 的更新 |
| `change` | `(payload: boolean)` | - |
| `click` | `(event: UniPointerEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 文字处的自定义内容 |
| `icon` | `{ checked, disabled }` | 参数 checked、disabled；有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/radio](https://m.antdv-next.com/components/radio)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 文字用 `label` 属性（多出的属性）：uvue 的样式不继承，默认插槽里的文字拿不到字号与颜色；
- 自定义图标只有 `icon` 插槽，没有 `icon` 属性（渲染函数）；
- change 的参数是选中与否（布尔），不是事件对象；没有 defaultChecked；
- 没有原生 input：没有 name、id、title、tabIndex、autoFocus、required，没有 focus / blur 事件。

登记在 [tools/parity/known/radio.json](../../tools/parity/known/radio.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultChecked` | UTS 里分不出“没传”和初始值，非受控用法请用 v-model:checked |
| 没有的属性 | `name` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `id` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `title` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `tabIndex` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `autoFocus` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `required` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `icon` | UTS 里不能把渲染函数当属性传，自定义图标用 icon 插槽（参数 checked、disabled） |
| 多出的属性 | `label` | 文字用属性传：uvue 的样式不继承，默认插槽里的文字拿不到字号与颜色 |
| 没有的事件 | `focus` | 不是原生的可聚焦元素，没有焦点事件 |
| 没有的事件 | `blur` | 不是原生的可聚焦元素，没有焦点事件 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
