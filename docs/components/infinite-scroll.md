<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-infinite-scroll 无限滚动

无限滚动（= antdv-next-mobile 的 InfiniteScroll）：列表内容放在默认插槽，组件在下面画加载状态，滚到离底部不到 threshold 时发出 load。v-model:loading（发出 load 前组件已经设为 true，数据回来后使用方改回 false）、hasMore / finished（任一表示没有更多）、v-model:error（加载失败，点击重试）、threshold、disabled、immediateCheck、loadingText / finishedText / errorText 同名同义；事件 update:loading、update:error、load；插槽 default、loading、finished、error；方法 check()。每次加载完、挂载时检查一次：列表还没铺满屏幕（第一页条数少、屏幕高）时接着加载。

## 用法

```vue
<am-infinite-scroll v-model:loading="loading" v-model:error="error" :has-more="hasMore" @load="load">
  <view v-for="row in rows" :key="row">
    <text>第 {{ row }} 条</text>
  </view>
</am-infinite-scroll>
```

摘自示例页 [pages/components/infinite-scroll.uvue](../../pages/components/infinite-scroll.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | **`v-model:loading`** 发出 load 前组件已经设为 true，数据回来后使用方改回 false |
| `hasMore` | `boolean` | `true` | - |
| `finished` | `boolean` | `false` | 任一表示没有更多 |
| `error` | `boolean` | `false` | **`v-model:error`** 加载失败，点击重试 |
| `threshold` | `number` | `250` | 列表底部离可视区域底部不到这个距离时加载（像素） |
| `disabled` | `boolean` | `false` | - |
| `immediateCheck` | `boolean` | `true` | 挂载、加载完成后检查是否铺满屏幕，没铺满时接着加载 |
| `loadingText` | `string` | `''` | 加载中的文字，空为语言包的 InfiniteScroll.loading |
| `finishedText` | `string` | `''` | - |
| `errorText` | `string` | `''` | 加载失败的文字，空为语言包的“加载失败 重新加载” |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:loading` | `(loading: boolean)` | `v-model:loading` 的更新 |
| `update:error` | `(error: boolean)` | `v-model:error` 的更新 |
| `load` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `loading` | - | 有默认内容 |
| `error` | - | 有默认内容 |
| `finished` | - | 有默认内容 |

## 方法

通过模板引用调用：`ref<AmInfiniteScrollComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `check()` | 检查一次位置，离底部不到 threshold 时发出 load（列表放在自己写的滚动区域里、内容高度变化后调用） |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/infinite-scroll](https://m.antdv-next.com/components/infinite-scroll)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 滚到哪了从两处知道：放在 `<am-pull-to-refresh>` 里时用它的滚动区域；否则用页面的 onReachBottom（页面自己滚动，这时 threshold 只在“铺满检查”里生效，触底的距离由 pages.json 的 onReachBottomDistance 决定）。放在自己写的 scroll-view 里时，在它的 scrolltolower 里调用 check()；
- 各状态的文字是字符串（默认取语言包），自定义内容用同名插槽；
- 没有 direction="up"（向上加载聊天记录）

登记在 [tools/parity/known/infinite-scroll.json](../../tools/parity/known/infinite-scroll.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `direction` | 待实现：向上加载（聊天记录）要在插入内容后保持滚动位置，scroll-view 上还没有验证 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
