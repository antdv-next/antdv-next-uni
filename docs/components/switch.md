<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-switch 开关

开关（= antdv-next-mobile 的 Switch）：v-model:checked（或 v-model:value，两者同义）、checkedChildren / unCheckedChildren、disabled、loading、size（small / middle）同名同义；事件 update:checked、update:value、change（值、事件）、click（当前值、事件）。

底色、滑块的位置都写在内联 style 上（Android 上只切换类名不会过渡）

## 用法

```vue
<am-switch v-model:checked="basic" @change="onChange" />
```

摘自示例页 [pages/components/switch.uvue](../../pages/components/switch.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | **`v-model:checked`** 或 v-model:value，两者同义 |
| `value` | `boolean` | `false` | **`v-model:value`** checked 的别名（v-model:value） |
| `checkedChildren` | `string` | `''` | - |
| `unCheckedChildren` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `loading` | `boolean` | `false` | - |
| `size` | `string` | `''` | small / middle |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:checked` | `(checked: boolean)` | `v-model:checked` 的更新 |
| `update:value` | `(value: boolean)` | `v-model:value` 的更新 |
| `change` | `(next, event: UniPointerEvent)` | 值、事件 |
| `click` | `(on: boolean, event: UniPointerEvent)` | 当前值、事件 |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `checkedChildren` | - | - |
| `unCheckedChildren` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/switch](https://m.antdv-next.com/components/switch)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- checkedChildren / unCheckedChildren 是字符串（开关按字数变宽）；同名插槽里的内容不会撑开开关（量不到宽度）；
- `checked` / `value` 只有布尔值：没有 checkedValue / unCheckedValue、defaultChecked / defaultValue；
- 没有 beforeChange：要在切换前确认时不用 v-model，自己在 change 里决定要不要改值（配合 loading）；
- 没有原生 button：没有 autoFocus、title、tabIndex、id，没有 focus / blur 事件。

登记在 [tools/parity/known/switch.json](../../tools/parity/known/switch.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultChecked` | UTS 里分不出“没传”和初始值，非受控用法请用 v-model:checked |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和初始值，非受控用法请用 v-model:value |
| 没有的属性 | `checkedValue` | checked / value 只有布尔值（属性的类型要确定） |
| 没有的属性 | `unCheckedValue` | 同 checkedValue |
| 没有的属性 | `autoFocus` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `title` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `tabIndex` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `id` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的属性 | `beforeChange` | 函数属性暂不提供；要在切换前确认时不用 v-model，在 change 里自己决定要不要改值（配合 loading） |
| 没有的事件 | `focus` | 不是原生的可聚焦元素，没有焦点事件 |
| 没有的事件 | `blur` | 不是原生的可聚焦元素，没有焦点事件 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
