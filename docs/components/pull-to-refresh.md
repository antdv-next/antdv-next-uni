<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-pull-to-refresh 下拉刷新

下拉刷新（= antdv-next-mobile 的 PullToRefresh）：v-model:refreshing、pullingText / canReleaseText / refreshingText / completeText、completeDelay、headHeight、threshold、disabled 同名同义；事件 update:refreshing、refresh、change（{ status, distance }）；插槽 default、pulling、canRelease、refreshing、complete（参数 distance）。状态 status：normal、pulling（不够刷新）、canRelease（松手刷新）、refreshing、complete。

## 用法

```vue
<am-pull-to-refresh v-if="mode == '基础'" v-model:refreshing="refreshing" @refresh="onRefresh" @change="onStatus" @reach-bottom="more">
  <view v-for="row in rows" :key="row">
    <text>第 {{ round + 1 }} 次加载 · 第 {{ row % 100 }} 条</text>
  </view>
</am-pull-to-refresh>
```

摘自示例页 [pages/components/pull-to-refresh.uvue](../../pages/components/pull-to-refresh.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `refreshing` | `boolean` | `false` | **`v-model:refreshing`** |
| `pullingText` | `string` | `''` | 下拉过程中的文字，空为语言包的 PullToRefresh.pulling |
| `canReleaseText` | `string` | `''` | - |
| `refreshingText` | `string` | `''` | - |
| `completeText` | `string` | `''` | - |
| `completeDelay` | `number` | `500` | 完成提示停留的时长（毫秒），0 为不显示、直接收起 |
| `headHeight` | `number` | `50` | 头部的高度（像素） |
| `threshold` | `number` | `0` | 松手刷新的下拉距离（像素），0 为同 headHeight |
| `disabled` | `boolean` | `false` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:refreshing` | `(refreshing: boolean)` | `v-model:refreshing` 的更新 |
| `refresh` | `()` | - |
| `change` | `(payload)` | { status, distance } |
| `reachBottom` | `()` | uni 端多出的事件：它自己是滚动区域、页面不滚，页面的 onReachBottom 不会触发，滚到底由它发出 |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `refreshing` | `{ distance }` | 有默认内容 |
| `complete` | `{ distance }` | 参数 distance；有默认内容 |
| `canRelease` | `{ distance }` | 有默认内容 |
| `pulling` | `{ distance }` | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/pull-to-refresh](https://m.antdv-next.com/components/pull-to-refresh)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 它自己就是纵向的滚动区域：用 scroll-view 原生的下拉（各端原生的回弹与手感），只把头部换成自己的。放在页面根节点（am-config-provider）下或 flex: 1 的容器里，它告诉根节点“页面不滚动”、自己占满剩下的高度；**页面要在 pages.json 的 style 里设 "disableScroll": true**（不禁用时 iOS 上整页回弹、手势被页面拿走）；
- 各状态的文字是字符串（默认取语言包），不是渲染函数；自定义内容用同名插槽；
- 没有 duration：回弹是原生的；不想显示“刷新成功”时把 completeDelay 设为 0；
- 多一个事件 reachBottom（滚到底）：页面不滚，页面的 onReachBottom 不会触发；里面放 `<am-infinite-scroll>` 时它自己接着加载

登记在 [tools/parity/known/pull-to-refresh.json](../../tools/parity/known/pull-to-refresh.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `duration` | 用 scroll-view 原生的下拉，回弹动画是原生的，时长不可调 |
| 多出的事件 | `reachBottom` | 它自己是滚动区域、页面不滚，页面的 onReachBottom 不会触发，滚到底由它发出 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
