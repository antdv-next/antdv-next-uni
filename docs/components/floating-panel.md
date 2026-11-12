<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-floating-panel 浮动面板

浮动面板（= antdv-next-mobile 的 FloatingPanel）：贴在底部、可以在几个高度之间拖动的面板（地图、播放列表那种）。v-model:height（露出来的高度，像素）、anchors（可以停住的高度，默认 [100, 可用高度的 60%]）、contentDraggable、duration（吸附动画的时长，毫秒）、safeArea、fixed（true 相对窗口；false 相对最近的定位父节点）、zIndex 同名同义；事件 update:height、heightChange（height, { animating }）；插槽 default、header（替换拖动条）；方法 setHeight(height, immediate)。手势同移动端库：跟着手指时没有过渡，拖过最高 / 最低的高度有阻尼，松手时吸到最近的高度，快速一划则去往那个方向的下一个高度。

## 用法

```vue
<am-floating-panel ref="panelRef" v-model:height="height" :anchors="anchors" :fixed="false" :safe-area="false" @height-change="onHeightChange">
  <view v-for="row in rows" :key="row">
    <text>{{ row }}</text>
  </view>
</am-floating-panel>
```

摘自示例页 [pages/components/floating-panel.uvue](../../pages/components/floating-panel.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `height` | `number` | `-1` | **`v-model:height`** 露出来的高度（像素）；-1 为没有绑定（停在最低的高度） |
| `anchors` | `number[]` | `[]` | 可以停住的高度，默认 [100, 可用高度的 60%] |
| `contentDraggable` | `boolean` | `true` | - |
| `duration` | `number` | `300` | 吸附动画的时长，毫秒 |
| `safeArea` | `boolean` | `true` | - |
| `fixed` | `boolean` | `true` | true 相对窗口；false 相对最近的定位父节点 |
| `zIndex` | `number` | `999` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:height` | `(height: number)` | `v-model:height` 的更新 |
| `heightChange` | `(height: number, info: AmFloatingPanelChangeInfo)` | height, { animating } |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `header` | - | 替换拖动条；有默认内容 |

## 方法

通过模板引用调用：`ref<AmFloatingPanelComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `setHeight(height: number, noMotion: boolean = false)` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/floating-panel](https://m.antdv-next.com/components/floating-panel)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 内容区是 scroll-view：面板没有展开到最高时它不滚动（direction 为 none），拖内容就是拖面板；展开到最高后内容可以滚，滚到顶再往下拉才拖动面板。contentDraggable 为 false 时内容一直可以滚，只有头部能拖；
- 没有 lockScroll：拖动时已经阻止了页面跟着滚（touchmove 的 preventDefault），页面的滚动锁不住也不需要；
- 高度没有绑定时用 -1 表示（没有 undefined），此时停在最低的高度；setHeight 的第二个参数是布尔值（不要动画）；
- `fixed` 为 false 时父节点的高度是量出来的（多渲染一个不可见的探针），量到之前按窗口高度算默认的 anchors；
- 用 touch 事件，电脑浏览器上不能用鼠标拖；没有 classes / styles

登记在 [tools/parity/known/floating-panel.json](../../tools/parity/known/floating-panel.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `lockScroll` | uni-app x 没有锁定页面滚动的接口；拖动面板时用 touchmove 的 preventDefault 阻止页面跟着滚 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
