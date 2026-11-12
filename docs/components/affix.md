<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-affix 固钉

固钉（= antdv-next-mobile 的 Affix）：内容滚出屏幕时把它钉在顶部（或底部）。offsetTop（离顶部多远时钉住，两个偏移都没给时为 0）、offsetBottom、zIndex 同名同义；事件 change（affixed）；方法 updatePosition()（重新量位置：上方的内容高度变了、或在自己的滚动区域里滚动时调用）。

## 用法

```vue
<am-affix @change="onTopChange">
  <view>
    <text>钉在顶部的栏：{{ topLog }}</text>
  </view>
</am-affix>
```

摘自示例页 [pages/components/affix.uvue](../../pages/components/affix.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `offsetTop` | `number` | `-1` | 离顶部不到这个距离时钉住（像素）；-1 为没给 |
| `offsetBottom` | `number` | `-1` | 离底部不到这个距离时钉住（像素）；-1 为没给 |
| `zIndex` | `number` | `10` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `change` | `(affixed)` | affixed |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 方法

通过模板引用调用：`ref<AmAffixComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `updatePosition()` | 重新量位置：上方的内容高度变了、或在自己的滚动区域里滚动时调用 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/affix](https://m.antdv-next.com/components/affix)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 没有 position: sticky，也没有元素的 scroll 事件可以订阅：监听的是**页面的滚动**（组件里的 onPageScroll，HBuilderX 5.21 起各端的蒸汽模式都支持）。位置在挂载时量一次，滚动中按 scrollTop 直接算（Android 上异步量一次要 200ms 左右，每次滚动都量会慢半拍），停下来后再量一次校正；
- 没有 `target`（指定滚动容器）：放在 scroll-view 里时页面不滚，要在 scroll-view 的 @scroll 里调用 updatePosition()（每次都要异步量，Android 上会晚一点才钉住）；
- offsetTop / offsetBottom 没给时是 -1（UTS 里没有 undefined）；
- 钉住时内容是 position: fixed，原来的位置留一个同样高的占位；宽度、左边距取占位的（量出来的）。fixed 的内容盖不住原生导航栏，offsetTop 从导航栏下面算起

登记在 [tools/parity/known/affix.json](../../tools/parity/known/affix.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `target` | uvue 里拿不到别的滚动容器的元素、也订阅不了它的 scroll：监听的是页面滚动（onPageScroll）；放在 scroll-view 里时在它的 @scroll 里调用 updatePosition() |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
