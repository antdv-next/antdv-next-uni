<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-virtual-list 虚拟列表

虚拟列表（= antdv-next-mobile 的 VirtualList）：上万条数据的长列表，只渲染屏幕附近的项。data、height、itemHeight、itemKey、virtual、fixed 同名同义；事件 scroll、reachEnd（离底部不到 40px）；插槽 default（参数 { item, index }）、header / footer（在滚动区域里，跟着一起滚）；方法 scrollTo(target)、getScrollTop()。

## 用法

```vue
<am-virtual-list ref="fixedList" :data="rows" :height="320" :item-height="48" item-key="id" fixed>
  <template #header>
    <view><text>header 插槽：跟着列表一起滚</text></view>
  </template>
  <template #default="{ item, index }">
    <view>
      <text>{{ titleOf(item) }}</text>
      <text>#{{ index }}</text>
    </view>
  </template>
  <template #footer>
    <view><text>footer 插槽：到底了</text></view>
  </template>
</am-virtual-list>
```

摘自示例页 [pages/components/virtual-list.uvue](../../pages/components/virtual-list.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `any[]` | `[]` | - |
| `height` | `number` | `0` | 滚动区域的高度（像素），0 为占满父元素（flex: 1） |
| `itemHeight` | `number` | `44` | 每一项的高度（像素）：`fixed` 时就是它，否则只是估计值 |
| `itemKey` | `string` | `''` | 每一项的唯一标识的字段名，空为用序号 |
| `virtual` | `boolean` | `true` | false 时每一项都渲染（普通的 scroll-view） |
| `fixed` | `boolean` | `false` | 每一项的高度都是 itemHeight |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `scroll` | `(event: UniScrollEvent)` | - |
| `reachEnd` | `()` | 离底部不到 40px |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `{ item, index }` | 参数 { item, index } |
| `header` | - | - |
| `footer` | - | 在滚动区域里，跟着一起滚 |

## 方法

通过模板引用调用：`ref<AmVirtualListComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `scrollTo(target: any)` | - |
| `getScrollTop(): number` | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/virtual-list](https://m.antdv-next.com/components/virtual-list)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 用内置的 list-view + list-item（Android、iOS、鸿蒙上是原生的复用回收列表，Web 上只渲染屏幕附近的项，微信小程序 4.41 起支持），不是自己算窗口：没有 overscan、component，也没有 visibleChange 事件（渲染了哪些项由原生决定，拿不到）；
- `virtual` 为 false 时退回普通的 scroll-view + v-for（每一项都渲染）：支付宝小程序等没有 list-view 的平台用它；
- height 是像素数字，0（默认）为 flex: 1 占满父元素——list-view 必须有确定的高度，父元素要有确定的高度；
- itemHeight：`fixed` 时每一项的高度就是它；不 fixed 时高度由内容决定（原生列表自己量），它只是 scrollTo 跳到还没渲染的项时用的估计值；
- itemKey 只能是字段名（不能是函数），空为用序号。数据是带类型的对象时每次换数据都要走一遍 JSON 才能按名字取字段，上万条数据请用 UTSJSONObject，或不传 itemKey；
- scrollTo(数字) 滚到这个位置（没渲染过的项只有估计的高度，很远的位置不一定准）；scrollTo({ index }) / scrollTo({ key })滚到某一项：用原生的 scroll-into-view，align（center / end）与 offset 在落定后用元素的 scrollBy 再挪（微信小程序没有 scrollBy，只能滚到顶部）；没有 align: 'auto'、nativeElement；
- Web 上 header 插槽不是 list-item：Web 的 list-view 拿第一个量到的 list-item 的高度当作没渲染的项的估计高度，头部是 list-item 时整个列表的位置都会估偏；
- list-item 上不能有 margin（蒸汽模式），项之间的间距写在插槽内容的 padding 上

登记在 [tools/parity/known/virtual-list.json](../../tools/parity/known/virtual-list.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `overscan` | 基于内置的 list-view（原生的复用回收列表），多渲染多少项由原生决定 |
| 没有的属性 | `component` | 列表的节点固定是 list-view / list-item |
| 没有的事件 | `visibleChange` | 渲染了哪些项由原生的 list-view 决定，uvue 里拿不到 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
