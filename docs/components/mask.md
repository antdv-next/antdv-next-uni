<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-mask 背景蒙层

遮罩（= antdv-next-mobile 的 Mask）：铺满屏幕的半透明层，内容放在默认插槽里。v-model:open、zIndex、lockScroll（在遮罩上滑动时页面不跟着滚）、color（default 用主题的遮罩色，white 为半透明的白，或任意颜色值）、closable（点击遮罩时发出 update:open false）、destroyOnHidden 同名同义；事件 update:open、click、afterOpenChange。点击插槽里的内容不算点击遮罩。

打开时先以透明的状态渲染一帧再变为不透明，关闭时先变透明、等过渡结束再隐藏；透明度写在 :style 上

## 用法

```vue
<am-mask v-model:open="basic" closable @after-open-change="onAfter" />
```

摘自示例页 [pages/components/mask.uvue](../../pages/components/mask.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `zIndex` | `number` | `1000` | - |
| `lockScroll` | `boolean` | `true` | 在遮罩上滑动时页面不跟着滚 |
| `color` | `string` | `'default'` | default 用主题的遮罩色，white 为半透明的白，或任意颜色值 |
| `closable` | `boolean` | `false` | 点击遮罩时发出 update:open false |
| `destroyOnHidden` | `boolean` | `false` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `click` | `(event: UniPointerEvent)` | - |
| `afterOpenChange` | `(payload: boolean)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/mask](https://m.antdv-next.com/components/mask)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 没有挂到 body 的 Teleport（也就没有 getContainer）：根节点 fixed 铺满屏幕，要放在页面根节点下，不要放在会裁剪内容的容器里；
- lockScroll 只拦住遮罩本身上的滑动；插槽里的内容滚到头之后页面是否跟着滚由平台决定；
- closable 的遮罩打开时登记到弹出层栈：Android 的返回键先关掉它（utils/overlay.uts）

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
