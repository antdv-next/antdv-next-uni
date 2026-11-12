<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-popover 气泡卡片

气泡卡片（= antdv-next-mobile 的 Popover）：点触发元素，在它旁边弹出一个带箭头的气泡；给了 actions 就是一个菜单。v-model:open、title、content、placement（top / bottom / left / right 及 topLeft、bottomRight、leftTop、rightBottom 等 12 个，默认 top）、trigger（click / manual）、arrow、color（自定义背景色）、mode（light / dark）、autoAdjustOverflow（放不下时翻到对面、沿着边挪进屏幕）、closeOnClickAway、destroyOnHidden、zIndex、actions（key、text、icon、disabled、danger）、closeOnAction 同名同义；事件 update:open、openChange、action（action, index）；插槽 default（触发元素）、title、content；方法 show() / hide() / updatePosition()。

## 用法

```vue
<am-popover content="这是一段气泡里的内容" @open-change="onOpenChange">
  <am-button text="基础用法" />
</am-popover>
```

摘自示例页 [pages/components/popover.uvue](../../pages/components/popover.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `title` | `string` | `''` | - |
| `content` | `string` | `''` | - |
| `placement` | `string` | `'top'` | top / bottom / left / right 及 topLeft、bottomRight、leftTop、rightBottom 等 12 个，默认 top |
| `trigger` | `string` | `'click'` | click：点触发元素开关；manual：只由 open / show() / hide() 控制 |
| `arrow` | `boolean` | `true` | - |
| `color` | `string` | `''` | 自定义背景色 |
| `mode` | `string` | `'light'` | light / dark |
| `autoAdjustOverflow` | `boolean` | `true` | 放不下时翻到对面、沿着边挪进屏幕 |
| `closeOnClickAway` | `boolean` | `true` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `zIndex` | `number` | `1000` | - |
| `actions` | `AmPopoverAction[]` | `[]` | 菜单模式：给了它就不再显示 title / content |
| `closeOnAction` | `boolean` | `true` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `openChange` | `(open: boolean)` | - |
| `action` | `(action: AmPopoverAction, index: number)` | action, index |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 触发元素 |
| `title` | - | 有默认内容 |
| `content` | - | 有默认内容 |

## 方法

通过模板引用调用：`ref<AmPopoverComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `show()` | - |
| `hide()` | - |
| `updatePosition()` | 重新计算位置（触发元素挪动之后） |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/popover](https://m.antdv-next.com/components/popover)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 没有 Teleport（也就没有 getPopupContainer）：气泡是一块 fixed 的节点，位置按量到的触发元素（窗口坐标）和窗口大小算；量是异步的，所以打开时先透明地渲染、量好再显示；触发元素在滚动区域里时，打开后再滚动气泡不会跟着走（调用 updatePosition()）；
- closeOnClickAway：App 端没有“触摸组件以外的区域”的全局事件，做成气泡后面铺一层透明的遮罩，点它关闭（这一下点击不会落到页面上）；打开时登记到弹出层栈，Android 的返回键先关气泡；
- 触发元素包在一个 view 里，它在纵向排列的父节点里不撑满一行（align-self: flex-start），这样量到的才是内容的大小；
- title、content、actions 的 text 是字符串，icon 是图标名；自定义内容用 title / content 插槽；action 没有 onClick，用 action 事件；
- 箭头是一个旋转 45° 的小方块（没有伪元素）；气泡最宽 280px（且不超过窗口宽度 - 16px），缩放的原点在气泡中心；
- 没有 defaultOpen（UTS 的布尔属性分不出“没传”）：不绑定 open 时组件自己管开关；rootClass 加在气泡上

登记在 [tools/parity/known/popover.json](../../tools/parity/known/popover.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultOpen` | UTS 的布尔属性分不出“没传”：不绑定 open 时组件自己管开关 |
| 没有的属性 | `getPopupContainer` | uni-app x 没有 Teleport：气泡就地渲染为 fixed 节点，位置按量到的触发元素算 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
