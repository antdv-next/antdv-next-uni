<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-float-button 悬浮按钮

悬浮按钮（= antdv-next-mobile 的 FloatButton）：固定在右下角（距右 24、距底 48 + 底部安全区域）。icon、content（图标下面的文字，description 是它的旧名）、type（default / primary）、shape（circle / square）、badge（{ count, dot, overflowCount, showZero, color }）、draggable、axis（x / y / xy）、magnetic（x / y：松手后吸到这个方向最近的边）、v-model:offset（左上角的位置）、gap（拖动时离边缘的最小距离）同名同义；事件 click、update:offset、offsetChange；插槽 default（图标下面的自定义内容）、icon。

在 `<am-float-button-group>` 里：不再固定在右下角，而是组里的一个 48×48 的普通节点（由组来摆放，按组的 placement 留出 12px 的间距），形状跟随组，不能拖动。

位置：外层是贴着底部安全区域的 0 尺寸锚点（没有 calc()，安全区域只能用 CSS 变量写在 bottom 上），按钮在锚点里按 right / bottom 绝对定位；拖动时改的就是这两个值

## 用法

```vue
<am-float-button v-if="kind == '基础'" icon="question" @click="onClick" />
```

摘自示例页 [pages/components/float-button.uvue](../../pages/components/float-button.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `string` | `''` | - |
| `content` | `string` | `''` | 图标下面的文字，description 是它的旧名 |
| `description` | `string` | `''` | - |
| `type` | `string` | `'default'` | default / primary |
| `shape` | `string` | `'circle'` | circle / square |
| `badge` | `AmFloatButtonBadge` | `AM_FLOAT_BUTTON_NO_BADGE` | { count, dot, overflowCount, showZero, color } |
| `draggable` | `boolean` | `false` | - |
| `axis` | `string` | `'xy'` | x / y / xy |
| `magnetic` | `string` | `''` | x / y：松手后吸到这个方向最近的边 |
| `offset` | `AmFloatButtonOffset` | `AM_FLOAT_BUTTON_NO_OFFSET` | **`v-model:offset`** 左上角的位置 |
| `gap` | `number` | `16` | 拖动时离边缘的最小距离 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `click` | `(event: UniPointerEvent)` | - |
| `update:offset` | `(offset: AmFloatButtonOffset)` | `v-model:offset` 的更新 |
| `offsetChange` | `(offset)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 图标下面的自定义内容 |
| `icon` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/float-button](https://m.antdv-next.com/components/float-button)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `icon` 是图标名（`<am-icon>` 的 name），content / description 是字符串；自定义内容用插槽；
- `offset` 的 x / y 相对页面内容区的左上角（不含原生导航栏），{ x: -1, y: -1 } 表示没有指定；`badge.count` 只有数字；这两个对象要在 script 里按类型声明（AmFloatButtonBadge / AmFloatButtonOffset）；
- 吸边、松手没有过渡（right / bottom 不能过渡）；
- 没有 href / target / htmlType / ariaLabel

登记在 [tools/parity/known/float-button.json](../../tools/parity/known/float-button.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `href` | uni-app x 里没有 a 标签的跳转，用 click 事件 + uni.navigateTo |
| 没有的属性 | `target` | 同 href |
| 没有的属性 | `htmlType` | uni-app x 没有原生表单提交 |
| 没有的属性 | `ariaLabel` | view 不支持 aria-label 等无障碍属性 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
