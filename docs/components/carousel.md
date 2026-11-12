<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-carousel 走马灯

走马灯（= antdv-next-mobile 的 Carousel）：autoplay、autoplaySpeed（毫秒）、dots、dotPlacement（dotPosition 为旧名）、infinite、speed（切换动画的毫秒数）、initialSlide、vertical、draggable、allowTouchMove 同名同义；事件 beforeChange（current, next）、afterChange（current）；方法 goTo(slide, dontAnimate)、next()、prev()、resize()。

## 用法

```vue
<am-carousel @afterChange="onAfterChange">
  <swiper-item v-for="(color, index) in colors" :key="color">
    <view :style="'background-color:' + color + ';'">
      <text>{{ index + 1 }}</text>
    </view>
  </swiper-item>
</am-carousel>
```

摘自示例页 [pages/components/carousel.uvue](../../pages/components/carousel.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `autoplay` | `boolean` | `false` | - |
| `autoplaySpeed` | `number` | `3000` | 毫秒 |
| `dots` | `boolean` | `true` | - |
| `dotPlacement` | `string` | `''` | dotPosition 为旧名 |
| `dotPosition` | `string` | `''` | - |
| `infinite` | `boolean` | `true` | - |
| `speed` | `number` | `300` | 切换动画的毫秒数 |
| `initialSlide` | `number` | `0` | - |
| `vertical` | `boolean` | `false` | - |
| `draggable` | `boolean` | `true` | - |
| `allowTouchMove` | `boolean` | `true` | - |
| `height` | `number` | `160` | 高度（像素） |
| `images` | `string[]` | `[]` | 图片轮播：每张图一页（也可以在默认插槽里自己写 `<swiper-item>`） |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `beforeChange` | `(previous, next)` | current, next |
| `afterChange` | `(payload)` | current |
| `click` | `(index)` | uni 端多出的事件：配合 images：点了第几张图（插槽方式在自己的节点上绑 click） |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 方法

通过模板引用调用：`ref<AmCarouselComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `goTo(slide: number, dontAnimate: boolean)` | - |
| `next()` | - |
| `prev()` | - |
| `resize()` | 与移动端库的 CarouselRef 对齐：原生 swiper 自己处理尺寸变化，这里不用做什么 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/carousel](https://m.antdv-next.com/components/carousel)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 基于内置的 swiper（各端原生实现，手势与惯性都是原生的）：默认插槽里每一页要用 `<swiper-item>` 包起来（移动端库是“每个直接子节点就是一页”，这里拿不到插槽里有几个节点）；只是轮播图片时直接传 `images`；
- swiper 必须有确定的高度：`height`（像素，默认 160）；
- 指示点是 swiper 自带的：只能在底部（横向）或末端（纵向），dotPlacement 为 start / end 时只表示纵向滑动；没有自定义指示器（`indicator`）、指示点上的进度（autoplay 的 { dotDuration }）、`dots` 的 { class }；
- 没有 `effect="fade"`、`slideSize` / `trackOffset` / `stuckAtBoundary`（露出相邻页）、`stopPropagation`（嵌套的手势由原生处理）；
- 拿不到页数：用插槽时 next() 在最后一页、prev() 在第一页不会绕回去（用 `images` 时会）；beforeChange 在滑动结束、页码变化时触发（原生的滑动开始前没有事件），afterChange 在动画结束后触发

登记在 [tools/parity/known/carousel.json](../../tools/parity/known/carousel.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `effect` | 基于内置 swiper，只有滑动切换，没有淡入淡出 |
| 没有的属性 | `slideSize` | uni-app x 的 swiper 没有露出相邻页的 previous-margin / next-margin |
| 没有的属性 | `trackOffset` | 同 slideSize |
| 没有的属性 | `stuckAtBoundary` | 同 slideSize |
| 没有的属性 | `indicator` | 指示点是 swiper 自带的；拿不到插槽里有几页，画不了自定义指示器（可用 afterChange 自己画） |
| 没有的属性 | `stopPropagation` | 手势由原生 swiper 处理，嵌套时不需要也拦不了 |
| 多出的属性 | `height` | swiper 必须有确定的高度（像素） |
| 多出的属性 | `images` | 图片轮播的简写：默认插槽里每页都要包一层 `<swiper-item>`，只放图片时直接传地址数组 |
| 多出的事件 | `click` | 配合 images：点了第几张图（插槽方式在自己的节点上绑 click） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
