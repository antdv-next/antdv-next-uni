<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-modal 对话框

对话框（= antdv-next-mobile 的 Modal）：v-model:open、title、content、footer、okText、cancelText、okType、confirmLoading、okCancel（false 时只有一个按钮，文字默认取语言包的 justOkText）、closable、closeIcon、mask、maskClosable、destroyOnHidden、zIndex、width、actions（用一组操作代替确定 / 取消，多于两个时竖排）、closeOnAction 同名同义；事件 update:open、ok、cancel（取消按钮、遮罩、关闭图标、Android 返回键）、action（操作、下标）、afterClose、afterOpenChange；插槽 default（内容）、title、header（标题上方：插图、图标）、footer。

## 用法

```vue
<am-modal v-model:open="basic" title="确认提交" content="提交后进入审批流程，审批期间不能修改。" @ok="onOk" @cancel="onCancel" @after-open-change="onAfterOpenChange" />
```

摘自示例页 [pages/components/modal.uvue](../../pages/components/modal.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `title` | `string` | `''` | - |
| `content` | `string` | `''` | - |
| `footer` | `boolean` | `true` | - |
| `okText` | `string` | `''` | - |
| `cancelText` | `string` | `''` | - |
| `okType` | `string` | `'primary'` | - |
| `confirmLoading` | `boolean` | `false` | - |
| `okCancel` | `boolean` | `true` | false 时只有一个按钮，文字默认取语言包的 justOkText |
| `closable` | `boolean` | `false` | - |
| `closeIcon` | `string` | `'close'` | - |
| `mask` | `boolean` | `true` | - |
| `maskClosable` | `boolean` | `true` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `zIndex` | `number` | `1000` | - |
| `width` | `number` | `0` | - |
| `actions` | `AmModalAction[]` | `[]` | 用一组操作代替确定 / 取消，多于两个时竖排 |
| `closeOnAction` | `boolean` | `false` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `ok` | `(event: UniPointerEvent)` | - |
| `cancel` | `()` | 取消按钮、遮罩、关闭图标、Android 返回键 |
| `action` | `(action, index: number)` | 操作、下标 |
| `afterClose` | `()` | - |
| `afterOpenChange` | `(open: boolean)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 内容；有默认内容 |
| `header` | - | 标题上方：插图、图标 |
| `title` | - | 有默认内容 |
| `footer` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/modal](https://m.antdv-next.com/components/modal)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- title / content / okText / cancelText 是字符串，自定义内容用插槽（title、default、footer）；closeIcon 是图标名，没有同名插槽；
- footer 是布尔值（false 不显示底部按钮），自定义底部用 footer 插槽（插槽没有 ok / cancel 参数，自己发事件）；
- okType 只影响确定按钮的颜色：danger 为错误色，其余为主色；width 是像素数；
- actions 的项没有 onClick（UTS 的数据里不放函数），用 action 事件；
- 没有 okButtonProps / cancelButtonProps、image、centered（总是居中）、keyboard、forceRender、scrollLock、rootStyle；
- 没有静态方法 Modal.confirm() 等（不能动态挂载组件）：用 utils/modal.uts 的 confirmAmModal() / alertAmModal()（原生对话框）

登记在 [tools/parity/known/modal.json](../../tools/parity/known/modal.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `okButtonProps` | 底部是对话框自己的文字按钮（不是 am-button），用 okText / okType / confirmLoading 控制；要完全自定义用 footer 插槽 |
| 没有的属性 | `cancelButtonProps` | 同 okButtonProps |
| 没有的属性 | `centered` | 移动端的对话框总是居中（移动端库里这个属性也只是为了与 PC 同名） |
| 没有的属性 | `keyboard` | 手机上没有 ESC；Android 的返回键会先关掉最上面的弹出层 |
| 没有的属性 | `forceRender` | am-popup 还没有 forceRender |
| 没有的属性 | `scrollLock` | fixed 的遮罩已经拦住了页面的滚动 |
| 没有的属性 | `image` | 顶部的图片用 header 插槽放 `<image>` |
| 没有的属性 | `rootStyle` | 根节点是 am-popup，样式不能透传到子组件内部；用 rootClass |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
