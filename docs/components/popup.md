<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-popup 弹出层

弹出层（= antdv-next-mobile 的 Popup）：v-model:open、placement（bottom / top / left / right / center）、mask、maskClosable、closable、round、safeArea、destroyOnHidden、zIndex、width、height 同名同义；事件 update:open、close、maskClick、afterOpenChange。Drawer、Modal、ActionSheet、各种选择器都基于它。

打开时先渲染再加 --show 类，关闭时先去掉类、等过渡结束再隐藏；过渡用 transform / opacity

## 用法

```vue
<am-popup v-model:open="bottom">
  <view><text>底部弹出的内容</text></view>
</am-popup>
```

摘自示例页 [pages/components/popup.uvue](../../pages/components/popup.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `placement` | `string` | `'bottom'` | bottom / top / left / right / center |
| `mask` | `boolean` | `true` | - |
| `maskClosable` | `boolean` | `true` | - |
| `closable` | `boolean` | `false` | - |
| `closeIcon` | `string` | `'close'` | 关闭图标的名称（`<am-icon>` 的 name）；自定义内容用 closeIcon 插槽 |
| `round` | `boolean` | `false` | - |
| `safeArea` | `boolean` | `true` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `zIndex` | `number` | `1000` | - |
| `width` | `number` | `0` | 面板的宽度（像素，left / right 时有效；0 为默认的 300） |
| `height` | `number` | `0` | 面板的高度（像素，top / bottom 时有效；0 为按内容） |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `close` | `()` | - |
| `maskClick` | `()` | - |
| `afterOpenChange` | `(payload: boolean)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `closeIcon` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/popup](https://m.antdv-next.com/components/popup)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 没有挂到 body 的 Teleport（也就没有 getContainer）：根节点 fixed 铺满屏幕，所以弹出层要放在页面根节点下，不要放在会裁剪内容的容器里；
- width / height 是像素数（0 为按内容 / 默认值），max-height 不支持百分比；
- 没有 keyboard、lockScroll、forceRender；Android 的返回键会先关掉最上面的弹出层（utils/overlay.uts）；
- 没有 classes / styles：传给子组件的类在 App 端不生效

登记在 [tools/parity/known/popup.json](../../tools/parity/known/popup.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `lockScroll` | fixed 的遮罩已经拦住了页面的滚动 |
| 没有的属性 | `forceRender` | 待实现 |
| 没有的属性 | `keyboard` | 手机上没有 ESC；Android 的返回键会先关掉最上面的弹出层 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
