<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-button 按钮

按钮（= antdv-next-mobile 的 Button）：type 是 color + variant 的语法糖，color（default / primary / danger / success / warning）、variant（solid / outlined / dashed / filled / text / link）、danger、ghost、block、size、shape、icon、iconPlacement、loading、disabled 同名同义；事件 click。

在 `<am-space-compact>` 里（utils/compact.uts）：尺寸跟随组，内侧的圆角去掉、边框与前一项叠在一起，round / circle 变成普通的一段，block 的按钮平分一行

## 用法

```vue
<am-button type="primary" text="Primary" />
```

摘自示例页 [pages/components/button.uvue](../../pages/components/button.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `string` | `'default'` | - |
| `color` | `string` | `''` | default / primary / danger / success / warning |
| `variant` | `string` | `''` | solid / outlined / dashed / filled / text / link |
| `danger` | `boolean` | `false` | - |
| `ghost` | `boolean` | `false` | - |
| `block` | `boolean` | `false` | - |
| `size` | `string` | `''` | - |
| `shape` | `string` | `'default'` | - |
| `icon` | `string` | `''` | - |
| `iconPlacement` | `string` | `'start'` | - |
| `loading` | `boolean` | `false` | - |
| `disabled` | `boolean` | `false` | - |
| `text` | `string` | `''` | uni 端多出的属性：uvue 的样式不继承，默认插槽里的文字拿不到按钮的颜色与字号，所以文字用属性传 |
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
| `icon` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/button](https://m.antdv-next.com/components/button)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 文字用 `text` 属性：uvue 的样式不继承，写在默认插槽里的文字拿不到按钮的颜色与字号（插槽仍可放自定义内容）；
- `icon` 是图标名（`<am-icon>` 的 name），不是节点；自定义图标用 `icon` 插槽；
- `loading` 只有布尔值，没有 `{ delay }`；没有 `href` / `target` / `htmlType`

登记在 [tools/parity/known/button.json](../../tools/parity/known/button.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `href` | uni-app x 里没有 a 标签的跳转，用 click 事件 + uni.navigateTo |
| 没有的属性 | `target` | 同 href |
| 没有的属性 | `htmlType` | uni-app x 没有原生表单提交，Form 做好后由 Form 提供提交方式 |
| 多出的属性 | `text` | uvue 的样式不继承，默认插槽里的文字拿不到按钮的颜色与字号，所以文字用属性传 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
