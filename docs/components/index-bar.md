<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-index-bar 索引栏

索引栏（= antdv-next-mobile 的 IndexBar）：通讯录、城市、品牌这类按首字母分组的长列表。indexList（默认为里面登记的锚点）、sticky、stickyOffsetTop、zIndex 同名同义；事件 select（点按或滑到某个索引）、change（滚动中当前的锚点变化）；方法 scrollTo(index)，另有 refresh()（内容变化后重新量位置）。内容放在默认插槽，每组前放 `<am-index-bar-anchor index="A" />`。右侧是索引，点按或上下滑动跳到对应分组，滑动时屏幕中间显示当前的字；sticky 时当前分组的标题吸在顶部，下一组的标题顶上来时把它推上去。

## 用法

```vue
<am-index-bar ref="barRef" @change="onChange">
  <view v-for="group in groups" :key="group.index">
    <am-index-bar-anchor :index="group.index" />
    <view v-for="name in group.names" :key="name" @click="call(name)">
      <view>
        <text>{{ name.substring(0, 1) }}</text>
      </view>
      <text>{{ name }}</text>
    </view>
  </view>
</am-index-bar>
```

摘自示例页 [pages/components/index-bar.uvue](../../pages/components/index-bar.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `indexList` | `string[]` | `[]` | 默认为里面登记的锚点 |
| `sticky` | `boolean` | `true` | - |
| `stickyOffsetTop` | `number` | `0` | 吸顶标题离滚动区域顶部的距离（像素） |
| `zIndex` | `number` | `10` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `select` | `(index)` | 点按或滑到某个索引 |
| `change` | `(current)` | 滚动中当前的锚点变化 |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 方法

通过模板引用调用：`ref<AmIndexBarComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `scrollTo(index: string)` | - |
| `refresh()` | 内容变化后重新量位置 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/index-bar](https://m.antdv-next.com/components/index-bar)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 它自己就是纵向的滚动区域（scroll-view），不是跟着页面滚动：App 端量不到页面的滚动位置，也没有 position: sticky。放在页面根节点（am-config-provider）下或 flex: 1 的容器里，它告诉根节点“页面不滚动”、自己占满剩下的高度；**页面要在 pages.json 的 style 里设 "disableScroll": true**；
- index 是字符串；吸顶的标题是文字（锚点的 title / index），锚点默认插槽里的自定义内容不会被复制到吸顶处

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
