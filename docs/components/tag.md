<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-tag 标签

标签（= antdv-next-mobile 的 Tag）：color（预设色名、状态色 success / processing / error / warning / default 或颜色值）、variant（filled / solid / outlined）、bordered、closable、closeIcon、icon、disabled、size（small / middle / large）、round 同名同义；事件 close；插槽 default、icon、closeIcon。

## 用法

```vue
<am-tag text="默认" @click="onClick" />
```

摘自示例页 [pages/components/tag.uvue](../../pages/components/tag.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color` | `string` | `''` | 预设色名、状态色 success / processing / error / warning / default 或颜色值 |
| `variant` | `string` | `'filled'` | filled / solid / outlined |
| `bordered` | `boolean` | `true` | - |
| `closable` | `boolean` | `false` | - |
| `closeIcon` | `string` | `'close'` | - |
| `icon` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `size` | `string` | `''` | small / middle / large |
| `round` | `boolean` | `false` | - |
| `text` | `string` | `''` | uni 端多出的属性：uvue 的样式不继承，默认插槽里的文字拿不到标签的颜色与字号，所以文字用属性传 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `close` | `(event: UniPointerEvent)` | - |
| `click` | `(event: UniPointerEvent)` | uni 端多出的事件：uvue 里组件上没声明的事件不会落到根节点，要显式声明（移动端库靠 attrs 透传） |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `icon` | - | - |
| `closeIcon` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/tag](https://m.antdv-next.com/components/tag)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 文字用 `text` 属性：uvue 的样式不继承，默认插槽里的文字拿不到标签的颜色与字号（插槽仍可放自定义内容）；
- `icon` / `closeIcon` 是图标名（`<am-icon>` 的 name），自定义内容用同名插槽；`closable` 只有布尔值；
- 点了关闭只发出 close，标签不会自己消失（事件对象上拿不到 defaultPrevented）：在 close 里用 v-if 去掉它；
- 多出 click 事件（组件上没声明的事件不会落到根节点）；没有 href / target；
- 颜色值要写成十六进制（#rgb / #rrggbb）：浅底、边框的颜色在 UTS 里按 antdv-next-mobile 的比例混出来（App 端没有 color-mix()）

登记在 [tools/parity/known/tag.json](../../tools/parity/known/tag.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `href` | uni-app x 里没有 a 标签的跳转，用 click 事件 + uni.navigateTo |
| 没有的属性 | `target` | 同 href |
| 多出的属性 | `text` | uvue 的样式不继承，默认插槽里的文字拿不到标签的颜色与字号，所以文字用属性传 |
| 多出的事件 | `click` | uvue 里组件上没声明的事件不会落到根节点，要显式声明（移动端库靠 attrs 透传） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
