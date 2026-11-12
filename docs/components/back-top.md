<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-back-top 回到顶部

回到顶部（= antdv-next-mobile 的 BackTop）：页面滚过 visibilityHeight 之后出现的悬浮按钮，点击滚回顶部。visibilityHeight（默认 400）、duration（滚动动画的时长，毫秒）、icon、content、type、shape、badge 同名同义；事件 click；插槽 default、icon。它就是一个 `<am-float-button>`，位置、外观都相同；放在 `<am-float-button-group>` 里也可以。

## 用法

```vue
<am-back-top v-if="kind == '默认'" @click="clicks++" />
```

摘自示例页 [pages/components/back-top.uvue](../../pages/components/back-top.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visibilityHeight` | `number` | `400` | 默认 400 |
| `duration` | `number` | `450` | 滚动动画的时长，毫秒 |
| `icon` | `string` | `''` | - |
| `content` | `string` | `''` | - |
| `type` | `string` | `'default'` | - |
| `shape` | `string` | `'circle'` | - |
| `badge` | `AmFloatButtonBadge` | `AM_FLOAT_BUTTON_NO_BADGE` | - |
| `scrollTop` | `number` | `-1` | 自己的滚动区域滚过的距离（像素）；-1 为监听页面的滚动 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `click` | `(event: UniPointerEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `icon` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 BackTop，文档在 [float-button](https://m.antdv-next.com/components/float-button) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 没有 `target`（取不到滚动的元素）：默认监听页面的滚动（组件里的 onPageScroll）并用 uni.pageScrollTo 回到顶部；内容在自己的 scroll-view 里滚动时（页面本身不滚），把滚动的距离传给多出来的 `scrollTop` 属性，并在 click 事件里把 scroll-view 滚回顶部；
- `icon` 是图标名（默认 up：图标字体里没有 vertical-align-top），content 是文字；自定义内容用插槽；
- 出现 / 消失没有淡入淡出（透明度过渡写不到子组件的根节点上）；没有 ariaLabel

登记在 [tools/parity/known/back-top.json](../../tools/parity/known/back-top.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `target` | UTS 里取不到滚动的元素：默认监听页面的滚动（onPageScroll）；内容在自己的 scroll-view 里滚动时用 scrollTop 属性 |
| 没有的属性 | `ariaLabel` | view 不支持 aria-label 等无障碍属性 |
| 多出的属性 | `scrollTop` | 代替 target：把自己的滚动区域滚过的距离传进来（-1 为监听页面的滚动），并在 click 事件里把它滚回顶部 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
