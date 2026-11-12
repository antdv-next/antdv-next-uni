<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-picker-popup 选择类字段的弹层

选择类字段的弹层（= antdv-next-mobile 内部的 PickerPopup，各个选择器共用）：底部圆角的 am-popup +头部“取消 · 标题 · 确定”。open、title、okText、cancelText、showConfirm、showCancel、confirmDisabled、zIndex、maskClosable、destroyOnHidden 同名同义；文字默认取语言包的 Picker.okText / cancelText；事件 ok（点了确定）、cancel（点了取消 / 遮罩 / Android 返回键）、afterOpenChange；插槽 default、title。

## 用法

示例应用里没有直接用到这个组件。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | - |
| `title` | `string` | `''` | - |
| `okText` | `string` | `''` | - |
| `cancelText` | `string` | `''` | - |
| `showConfirm` | `boolean` | `true` | - |
| `showCancel` | `boolean` | `true` | - |
| `confirmDisabled` | `boolean` | `false` | - |
| `zIndex` | `number` | `1000` | - |
| `maskClosable` | `boolean` | `true` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `height` | `number` | `0` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `ok` | `()` | 点了确定 |
| `cancel` | `()` | 点了取消 / 遮罩 / Android 返回键 |
| `afterOpenChange` | `(open: boolean)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `title` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

uni 端特有的组件，antdv-next-mobile 里没有对应的公开组件：内部组件：各个选择器共用的底部弹层 + 头部（= 移动端库内部的 PickerPopup，不对外导出）

与 antdv-next-mobile 的差异：

- 确定的事件叫 ok（与 Modal 一致）；title 是字符串，自定义内容用 title 插槽；
- 没有 getContainer、popupClass / popupStyle（没有 Teleport；传给子组件内部节点的类在 App 端不生效）；
- 多了 height（面板的高度，像素，0 为按内容）。

只负责显示：open 由使用它的选择器控制，这里不发 update:open
