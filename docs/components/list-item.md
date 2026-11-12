<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-list-item 列表项

列表项（= antdv-next-mobile 的 ListItem）：title、description、prefix、extra、arrow、clickable、disabled、align 同名同义；事件 click；插槽 default（标题处的自定义内容）、prefix、description、extra。

## 用法

```vue
<am-list-item title="单行列表" />
```

摘自示例页 [pages/components/list.uvue](../../pages/components/list.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | - |
| `description` | `string` | `''` | - |
| `prefix` | `string` | `''` | 左侧的图标名 |
| `extra` | `string` | `''` | 右侧的文字 |
| `arrow` | `boolean` | `false` | - |
| `clickable` | `boolean` | `false` | - |
| `disabled` | `boolean` | `false` | - |
| `align` | `string` | `'center'` | 内容的垂直对齐：center / start |
| `bordered` | `boolean` | `true` | 是否画底部的分隔线（列表的最后一项可以关掉） |
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
| `default` | - | 标题处的自定义内容 |
| `prefix` | - | - |
| `description` | - | - |
| `extra` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 ListItem，文档在 [list](https://m.antdv-next.com/components/list) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- title / description / extra 是字符串，`prefix` 是图标名；自定义内容用同名插槽；
- `clickable` 要显式写（拿不到“有没有绑定 click”）；写了 `arrow` 时默认可点击；
- `arrow` 只有布尔值；没有 href / target

登记在 [tools/parity/known/list-item.json](../../tools/parity/known/list-item.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `href` | 用 click 事件 + uni.navigateTo |
| 没有的属性 | `target` | 同 href |
| 多出的属性 | `bordered` | 没有 :last-child 选择器，最后一项的分隔线要自己关掉 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
