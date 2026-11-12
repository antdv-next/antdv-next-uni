<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-alert 警告提示

警告提示（= antdv-next-mobile 的 Alert）：type（success / info / warning / error；banner 时默认 warning，否则 info）、variant（filled 浅色底 / outlined 只有彩色边框）、title（message 为旧名）、description、showIcon、icon、closable、closeIcon、action、banner（通栏：无边框、无圆角、默认带图标）同名同义；事件 close、afterClose；插槽 default / title / message（标题）、description、icon、closeIcon、action。

## 用法

```vue
<am-alert v-for="type in types" :key="type" root-class="demo__block" :type="type" :title="type + ' 提示的文案'" />
```

摘自示例页 [pages/components/alert.uvue](../../pages/components/alert.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `string` | `''` | success / info / warning / error；banner 时默认 warning，否则 info |
| `variant` | `string` | `'filled'` | filled 浅色底 / outlined 只有彩色边框 |
| `title` | `string` | `''` | message 为旧名 |
| `message` | `string` | `''` | - |
| `description` | `string` | `''` | - |
| `showIcon` | `boolean` | `false` | - |
| `icon` | `string` | `''` | - |
| `closable` | `boolean` | `false` | - |
| `closeIcon` | `string` | `'close'` | - |
| `action` | `string` | `''` | - |
| `banner` | `boolean` | `false` | 通栏：无边框、无圆角、默认带图标 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `close` | `(event: UniPointerEvent)` | - |
| `afterClose` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `icon` | - | 有默认内容 |
| `title` | - | - |
| `message` | - | 标题 |
| `description` | - | 有默认内容 |
| `action` | - | 有默认内容 |
| `closeIcon` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/alert](https://m.antdv-next.com/components/alert)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- title / description / action 是文字，icon / closeIcon 是图标名（`<am-icon>` 的 name），自定义内容用同名插槽；
- `closable` 只有布尔值（没有 { closeIcon, disabled } 对象）；
- `showIcon` 的默认值是 false：UTS 里分不出“没传”和 false，banner 模式下总是带图标；
- 关闭时只有淡出（App 端的高度要先量出来才能过渡，警告提示不值得）；没有 `role`（view 不支持无障碍属性）

登记在 [tools/parity/known/alert.json](../../tools/parity/known/alert.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `role` | uvue 的 view 不支持 role / aria-* 无障碍属性（编译警告） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
