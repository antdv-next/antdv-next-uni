<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-notice-bar 通告栏

通告栏（= antdv-next-mobile 的 NoticeBar）：页面顶部的一行提示，文字放不下时横向滚动。content、color（default / info / success / warning / error，默认 warning）、icon、extra、closable、closeIcon、wrap（换行显示，不滚动）、scrollable（true 总是滚动，false 不滚动；不写时放不下才滚动）、delay（开始滚动前的等待，毫秒）、speed（像素 / 秒）、shape（rectangular / neutral / rounded）、bordered（true 四边、'block' 只有上下、false 没有）同名同义；事件 close、click、replay（每滚完一轮）；方法 reset()（重新量宽度并从头滚动）；插槽 default（内容）、icon、extra、closeIcon。

## 用法

```vue
<am-notice-bar :content="long" @replay="onReplay" />
```

摘自示例页 [pages/components/notice-bar.uvue](../../pages/components/notice-bar.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | `string` | `''` | - |
| `color` | `string` | `'warning'` | default / info / success / warning / error，默认 warning |
| `icon` | `string` | `''` | - |
| `extra` | `string` | `''` | - |
| `closable` | `boolean` | `false` | - |
| `closeIcon` | `string` | `'close'` | - |
| `wrap` | `boolean` | `false` | 换行显示，不滚动 |
| `scrollable` | `boolean \| string` | `'auto'` | true 总是滚动，false 不滚动；不写时放不下才滚动 |
| `delay` | `number` | `2000` | 开始滚动前的等待，毫秒 |
| `speed` | `number` | `50` | 像素 / 秒 |
| `shape` | `string` | `'rectangular'` | rectangular / neutral / rounded |
| `bordered` | `boolean \| string` | `'block'` | true 四边、'block' 只有上下、false 没有 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `close` | `(event: UniPointerEvent)` | - |
| `click` | `(event: UniPointerEvent)` | - |
| `replay` | `()` | 每滚完一轮 |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 内容；有默认内容 |
| `icon` | - | 有默认内容 |
| `extra` | - | 有默认内容 |
| `closeIcon` | - | 有默认内容 |

## 方法

通过模板引用调用：`ref<AmNoticeBarComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `reset()` | 重新量宽度并从头开始滚动（用默认插槽放内容、内容变化之后调用） |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/notice-bar](https://m.antdv-next.com/components/notice-bar)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- content / extra 是文字，icon / closeIcon 是图标名（`<am-icon>` 的 name）；icon 为空用默认图标（bell：图标字体里没有 sound），写 'none' 不显示；自定义内容用同名插槽；
- scrollable 没有“未设置”：默认值是字符串 'auto'；
- 没有 @keyframes 也不依赖 transitionend：滚动是 transform: translateX 的过渡，时长按量到的宽度算出来，一轮结束用定时器接下一轮（第一轮从原位滚出左边，之后每轮从右边进来）；
- 会滚动的文字在等待（delay）期间没有省略号（文字放在绝对定位的轨道里才量得到完整的宽度）；scrollable 为 false 时放不下的文字显示省略号

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
