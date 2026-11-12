<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-form 表单

表单（= antdv-next-mobile 的 Form）：model、rules、layout（horizontal / vertical）、labelAlign、labelWidth、labelWrap、colon、disabled、size、variant（表单里的字段默认 borderless）、requiredMark（true / false / 'optional'）、validateTrigger、scrollToFirstError、mode（default / card）、contentAlign、header、footer 同名同义；事件 finish（值）、finishFailed（AmFormValidateError）、validate（字段名、是否通过、错误）、valuesChange；方法 validate / validateFields、resetFields、clearValidate、submit、getFieldValue、getFieldsValue、setFieldValue、setFieldsValue、getFieldError、getFieldsError、scrollToField。表单项用 `<am-form-item>`。

## 用法

完整的用法见示例页 [pages/components/form.uvue](../../pages/components/form.uvue)。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model` | `UTSJSONObject` | `{}` | 表单数据（响应式的 UTSJSONObject）。校验、重置、finish 都靠它 |
| `rules` | `UTSJSONObject` | `{}` | 表单级的规则：字段名 → 规则数组，与表单项自己的 rules 合并 |
| `layout` | `string` | `'horizontal'` | horizontal / vertical |
| `labelAlign` | `string` | `'start'` | - |
| `labelWidth` | `number` | `0` | 横排时标签列的宽度（像素；0 为默认的 90） |
| `labelWrap` | `boolean` | `false` | - |
| `colon` | `boolean` | `false` | - |
| `disabled` | `boolean` | `false` | - |
| `size` | `string` | `''` | - |
| `variant` | `string` | `''` | 里面的字段的变体；空为 borderless |
| `requiredMark` | `boolean \| string` | `true` | true：必填的字段显示星号；false：不显示；'optional'：非必填的字段显示“（可选）” |
| `validateTrigger` | `string` | `'change'` | - |
| `scrollToFirstError` | `boolean` | `false` | - |
| `mode` | `string` | `'default'` | default / card |
| `contentAlign` | `string` | `'start'` | - |
| `header` | `string` | `''` | - |
| `footer` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `finish` | `(payload)` | 值 |
| `finishFailed` | `(payload)` | AmFormValidateError |
| `validate` | `(name, arg2, fieldErrors: string[])` | 字段名、是否通过、错误 |
| `valuesChange` | `(changed, values: UTSJSONObject)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `header` | - | - |
| `footer` | - | - |

## 方法

通过模板引用调用：`ref<AmFormComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `validate(nameList: string[] \| null = null): Promise<UTSJSONObject>` | validateFields 的别名 |
| `validateFields(nameList: string[] \| null = null): Promise<UTSJSONObject>` | 校验：通过时 resolve 表单的值，失败时 reject AmFormValidateError（{ message, values, errorFields }） |
| `resetFields(nameList: string[] \| null = null)` | 把字段的值恢复成表单挂载时的值，并清除校验结果 |
| `clearValidate(nameList: string[] \| null = null)` | - |
| `submit()` | 提交：校验通过发出 finish（表单的值），否则发出 finishFailed（AmFormValidateError） |
| `getFieldValue(name: string): any \| null` | - |
| `getFieldsValue(): UTSJSONObject` | - |
| `setFieldValue(name: string, value: any \| null)` | 按路径把值写回 model（就地修改：model 是使用方的响应式对象） |
| `setFieldsValue(next: UTSJSONObject)` | - |
| `getFieldError(name: string): string[]` | - |
| `getFieldsError(): AmFormFieldError[]` | - |
| `scrollToField(name: string)` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/form](https://m.antdv-next.com/components/form)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `model` 是 UTSJSONObject（`reactive<UTSJSONObject>({ name: '' })`，字段上写 `v-model:value="model['name']"`）：带类型的对象在 App 端不能按字段名读写，重置时也写不回去；
- `rules` 是 UTSJSONObject（`{ name: [{ required: true }] }`，纯数据）；规则的 `pattern` 是字符串，`validator` 是同步函数、只能写在 `<am-form-item :rules>` 上（类型见 types/form.uts 的 AmFormRule）；
- 校验是同步的（没有异步的 validator、validateDebounce），validate() 仍返回 Promise；
- 字段名是字符串（嵌套用 'user.name'），不是数组；`labelWidth` 是像素数（0 为默认的 90）；
- header / footer 是字符串，自定义内容用同名插槽；`validateTrigger` 是字符串：'change' / 'blur' / 'change,blur' / 'none'；
- 没有原生表单：没有 submit / reset 事件、name、autocomplete，提交调用 submit()（校验后发出 finish / finishFailed）；
- 没有 validateMessages：提示文字用规则的 message，或语言包 / utils/form-rules.uts 里的模板

登记在 [tools/parity/known/form.json](../../tools/parity/known/form.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `name` | 没有原生表单，也不生成字段的 id |
| 没有的属性 | `validateMessages` | UTS 的类型里放不了多层的模板对象；提示文字用规则的 message，或语言包 / utils/form-rules.uts 的模板 |
| 没有的属性 | `autocomplete` | 没有原生表单 |
| 没有的事件 | `submit` | 没有原生表单的 submit 事件；提交调用实例方法 submit()，结果由 finish / finishFailed 给出 |
| 没有的事件 | `reset` | 没有原生表单的 reset 事件；重置调用实例方法 resetFields() |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
