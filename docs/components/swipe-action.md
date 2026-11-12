<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-swipe-action 滑动操作

滑动操作（= antdv-next-mobile 的 SwipeAction）：左滑露出右侧的按钮、右滑露出左侧的按钮。leftActions / rightActions（key、text、color）、closeOnAction、closeOnTouchOutside、disabled、stopPropagation 同名同义；事件 action（action, event）、actionsReveal（side）、close；插槽 default、left、right；方法 show(side) / close()。手势：横向拖动超过 5px 才算滑动（竖着划照常滚动列表），跟手移动（拉过按钮宽度后有阻尼），松手时拉开超过三成就展开、否则弹回；展开着时点内容只是收起（不触发内容的点击）。

## 用法

```vue
<am-swipe-action :right-actions="right" @action="onAction" @actions-reveal="onReveal" @close="onClose">
  <am-list-item title="左滑露出右侧的按钮" description="置顶、免打扰、删除" />
</am-swipe-action>
```

摘自示例页 [pages/components/swipe-action.uvue](../../pages/components/swipe-action.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `leftActions` | `AmSwipeActionItem[]` | `[]` | - |
| `rightActions` | `AmSwipeActionItem[]` | `[]` | key、text、color |
| `closeOnAction` | `boolean` | `true` | - |
| `closeOnTouchOutside` | `boolean` | `true` | 展开另一个滑动操作时收起这一个 |
| `disabled` | `boolean` | `false` | - |
| `stopPropagation` | `boolean` | `false` | 横向拖动时阻止 touch 事件冒泡（放在轮播、可滑动的标签页里时用） |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `action` | `(action: AmSwipeActionItem, event: UniPointerEvent)` | action, event |
| `actionsReveal` | `(next: string)` | side |
| `close` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `left` | - | 有默认内容 |
| `right` | - | 有默认内容 |

## 方法

通过模板引用调用：`ref<AmSwipeActionComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `show(target: string)` | 展开某一侧的按钮：'left' / 'right'（默认） |
| `close()` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/swipe-action](https://m.antdv-next.com/components/swipe-action)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 按钮的 text 是文字，没有 onClick（UTS 的类型里不放函数）：用 action 事件；
- closeOnTouchOutside：App 端没有“触摸组件以外的区域”的全局事件，做成“同一时刻只有一个是展开的”（展开另一个时收起这一个）；滚动列表、切换页签时可以调用 utils/swipe-action.uts 的 closeAmSwipeAction()；
- 用 touch 事件，电脑浏览器上不能用鼠标拖

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
