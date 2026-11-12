<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-action-sheet 动作面板

动作面板（= antdv-next-mobile 的 ActionSheet）：底部弹出的一组操作 + 取消。v-model:open、actions（{ key, text, description, icon, danger, bold, disabled }）、title、extra（标题下方的说明）、cancelText、showCancel、closeOnAction（默认 true）、maskClosable、round、safeArea、destroyOnHidden、zIndex 同名同义；事件 update:open、action（操作、下标）、cancel（点了取消按钮）、close（要关闭：操作、取消、遮罩、Android 返回键）、afterOpenChange；插槽 default（标题与操作之间的自定义内容）、title、extra。

## 用法

```vue
<am-action-sheet v-model:open="basic" :actions="actions" @action="onAction" @cancel="onCancel" />
```

摘自示例页 [pages/components/action-sheet.uvue](../../pages/components/action-sheet.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `actions` | `AmActionSheetAction[]` | `[]` | { key, text, description, icon, danger, bold, disabled } |
| `title` | `string` | `''` | - |
| `extra` | `string` | `''` | 标题下方的说明 |
| `cancelText` | `string` | `''` | - |
| `showCancel` | `boolean` | `true` | - |
| `closeOnAction` | `boolean` | `true` | 默认 true |
| `maskClosable` | `boolean` | `true` | - |
| `round` | `boolean` | `true` | - |
| `safeArea` | `boolean` | `true` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `zIndex` | `number` | `1000` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `action` | `(action, index: number)` | 操作、下标 |
| `cancel` | `(event: UniPointerEvent)` | 点了取消按钮 |
| `close` | `()` | 要关闭：操作、取消、遮罩、Android 返回键 |
| `afterOpenChange` | `(open: boolean)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 标题与操作之间的自定义内容 |
| `title` | - | 有默认内容 |
| `extra` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/action-sheet](https://m.antdv-next.com/components/action-sheet)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- title / extra / cancelText 是字符串（cancelText 默认取语言包；不要取消按钮用 `:show-cancel="false"`），action 的 text / description 是字符串、icon 是图标名；没有 cancelText、action 插槽；
- actions 的项没有 onClick（UTS 的数据里不放函数），用 action 事件；
- 没有 keyboard、forceRender；没有静态方法 ActionSheet.show()（不能动态挂载组件），只要文字选项时可以用 uni.showActionSheet

登记在 [tools/parity/known/action-sheet.json](../../tools/parity/known/action-sheet.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `keyboard` | 手机上没有 ESC；Android 的返回键会先关掉最上面的弹出层 |
| 没有的属性 | `forceRender` | am-popup 还没有 forceRender |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
