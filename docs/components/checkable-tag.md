<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-checkable-tag 可选中的标签

可选中的标签（= antdv-next-mobile 的 CheckableTag）：v-model:checked、defaultChecked、icon、disabled、size（small / middle / large）、round 同名同义；事件 update:checked、change、click；插槽 default、icon。

## 用法

```vue
<am-checkable-tag v-for="topic in topics" :key="topic" :checked="picked.includes(topic)" :text="topic" @change="onPick(topic, $event)" />
```

摘自示例页 [pages/components/tag.uvue](../../pages/components/tag.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | **`v-model:checked`** |
| `defaultChecked` | `boolean` | `false` | - |
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
| `update:checked` | `(checked: boolean)` | `v-model:checked` 的更新 |
| `change` | `(checked)` | - |
| `click` | `(event: UniPointerEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `icon` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 CheckableTag，文档在 [tag](https://m.antdv-next.com/components/tag) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 文字用 `text` 属性：uvue 的样式不继承，默认插槽里的文字拿不到标签的颜色与字号（插槽仍可放自定义内容）；
- `icon` 是图标名（`<am-icon>` 的 name），自定义内容用 icon 插槽；
- 属性没有 undefined，分不出“受控”与“非受控”：点击后自己先切换并发出事件，`checked` 变化时再跟随它

登记在 [tools/parity/known/checkable-tag.json](../../tools/parity/known/checkable-tag.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 多出的属性 | `text` | uvue 的样式不继承，默认插槽里的文字拿不到标签的颜色与字号，所以文字用属性传 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
