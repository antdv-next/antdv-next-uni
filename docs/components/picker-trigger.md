<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-picker-trigger 选择类字段的触发区

选择类字段的触发区（= antdv-next-mobile 内部的 PickerTrigger，Picker / DatePicker / TimePicker / Select / Cascader 共用）：label（已选的文字，空则显示 placeholder）、placeholder、open、disabled、allowClear、status、variant、size、suffixIcon 同名同义；事件 click、clear；插槽 default（自定义已选的内容）、suffixIcon。外观与 am-input 一致。

表单约定：所有选择器的 disabled / status / variant / size 都只在这里合并上下文（下面的“字段状态”一段），接入表单（utils/form-field.uts）时只改这里；值变化的通知在 utils/picker-field.uts

在 `<am-space-compact>` 里（utils/compact.uts）：尺寸跟随组，默认 outlined（在无边框的表单里也是），内侧的圆角去掉、边框与前一项叠在一起，横向时占满剩余的宽度

## 用法

示例应用里没有直接用到这个组件。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | `string` | `''` | 已选的文字，空则显示 placeholder |
| `placeholder` | `string` | `''` | - |
| `open` | `boolean` | `false` | - |
| `disabled` | `boolean` | `false` | - |
| `allowClear` | `boolean` | `false` | - |
| `status` | `string` | `''` | - |
| `variant` | `string` | `''` | - |
| `size` | `string` | `''` | - |
| `suffixIcon` | `string` | `''` | - |
| `loading` | `boolean` | `false` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `click` | `(event: UniPointerEvent)` | - |
| `clear` | `(event: UniPointerEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 自定义已选的内容；有默认内容 |
| `suffixIcon` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

uni 端特有的组件，antdv-next-mobile 里没有对应的公开组件：内部组件：各个选择器共用的触发区（= 移动端库内部的 PickerTrigger，不对外导出）

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- label、suffixIcon 是字符串（suffixIcon 为图标名，'none' 不显示；默认 borderless 用 right，其余用 down）；
- 多了 loading（Select 加载选项时显示转圈）；没有 id、classes / styles、键盘操作与无障碍属性。
