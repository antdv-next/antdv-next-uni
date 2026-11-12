<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-form-item 表单项

表单项（= antdv-next-mobile 的 FormItem）：name、label、rules、required、help、extra、validateStatus、hasFeedback、validateTrigger、validateFirst、hidden、layout、labelAlign、labelWidth、clickable、arrow、contentAlign 同名同义；事件 click；插槽 default（字段）、label、help、extra、arrow。它把校验状态交给里面的字段（amFormItemStatus），字段的值变化 / 失焦时通知它（amFormItemChange / amFormItemBlur，见 utils/form-field.uts），它再让 `<am-form>` 按 change / blur 校验；没有接入约定的字段靠“model 里的值变了”触发 change 校验。

## 用法

```vue
<am-form-item name="username" label="用户名">
  <am-input v-model:value="model['username']" variant="borderless" placeholder="3-12 个字符" allow-clear />
</am-form-item>
```

摘自示例页 [pages/components/form.uvue](../../pages/components/form.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `string` | `''` | 字段在 model 里的路径：'name' 或 'user.name' |
| `label` | `string` | `''` | - |
| `rules` | `AmFormRule[]` | `[]` | - |
| `required` | `boolean` | `false` | - |
| `help` | `string` | `''` | 字段下方的说明；写了它就不再显示校验的提示 |
| `extra` | `string` | `''` | - |
| `validateStatus` | `string` | `''` | - |
| `hasFeedback` | `boolean` | `false` | 在字段的末尾显示状态图标 |
| `validateTrigger` | `string` | `''` | - |
| `validateFirst` | `boolean` | `false` | 只显示第一条没通过的规则 |
| `hidden` | `boolean` | `false` | - |
| `layout` | `string` | `''` | - |
| `labelAlign` | `string` | `''` | - |
| `labelWidth` | `number` | `0` | - |
| `clickable` | `boolean` | `false` | 按下有反馈并发出 click（打开选择器的单元格） |
| `arrow` | `boolean` | `false` | - |
| `contentAlign` | `string` | `''` | - |
| `bordered` | `boolean` | `true` | 是否画底部的分隔线（表单的最后一项可以关掉） |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `click` | `(event: UniPointerEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 字段 |
| `label` | - | - |
| `arrow` | - | - |
| `help` | - | - |
| `extra` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 FormItem，文档在 [form](https://m.antdv-next.com/components/form) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- label / help / extra 是字符串；同名插槽的内容接在文字后面（拿不到“有没有传插槽”，不能用插槽替换文字）；只有写了 `label` 才有标签列；
- `name` 是字符串（嵌套用 'user.name'）；`rules` 是 AmFormRule[]（pattern 为字符串，validator 为同步函数）；
- `required` 只有布尔值：为 true 或规则里有 required 时显示星号；`arrow` 只有布尔值（clickable 时也显示）；
- `validateTrigger` 是字符串（'change' / 'blur' / 'change,blur' / 'none'，空为沿用表单的）；`labelWidth` 是像素数；
- `bordered`（多出的属性）：底部的分隔线。没有相邻选择器，最后一项的线要自己用 `:bordered="false"` 去掉；
- 没有 noStyle、validateDebounce、messageVariables、colon（冒号只在表单上设）、id

登记在 [tools/parity/known/form-item.json](../../tools/parity/known/form-item.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `validateDebounce` | 校验是同步的，没有防抖 |
| 没有的属性 | `messageVariables` | 提示模板只有 ${label} 等内置变量；要自定义文字用规则的 message |
| 没有的属性 | `noStyle` | 没有无样式模式：UTS 里拿不到子表单项的状态来合并显示 |
| 没有的属性 | `colon` | 没有“没传”的布尔值，冒号只在 `<am-form colon>` 上设 |
| 没有的属性 | `id` | 根节点的 id 由组件生成（scrollToField 用它），不生成字段的 id |
| 多出的属性 | `bordered` | 底部的分隔线：没有相邻选择器，最后一项的线要用 :bordered="false" 去掉（同 am-list-item） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
