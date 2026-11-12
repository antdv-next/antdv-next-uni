<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-float-button-group 悬浮按钮组

悬浮按钮组（= antdv-next-mobile 的 FloatButtonGroup）：固定在右下角的一组 `<am-float-button>`（放在默认插槽里）。不写 trigger 时按钮竖着排开一直显示；trigger="click" 是菜单模式：只显示一个触发按钮，点击后在 placement（top / bottom / left / right）的方向展开。shape（组里每个按钮的形状）、trigger、v-model:open、defaultOpen、placement、icon / closeIcon（触发按钮收起 / 展开时的图标）、content、type、badge 同名同义；事件 update:open、openChange、click（点了触发按钮）；插槽 default、icon、closeIcon。

位置：同 `<am-float-button>`，外层是贴着底部安全区域的 0 尺寸锚点，触发按钮在锚点里距右 24、距底 48

## 用法

```vue
<am-float-button-group v-if="kind == '一直展开'">
  <am-float-button icon="question" @click="onPick('帮助')" />
  <am-float-button icon="service" @click="onPick('客服')" />
  <am-back-top :visibility-height="0" />
</am-float-button-group>
```

摘自示例页 [pages/components/float-button-group.uvue](../../pages/components/float-button-group.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `shape` | `string` | `'circle'` | 组里每个按钮的形状 |
| `trigger` | `string` | `''` | - |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `defaultOpen` | `boolean` | `false` | - |
| `placement` | `string` | `'top'` | top / bottom / left / right |
| `closeIcon` | `string` | `'close'` | 触发按钮收起 / 展开时的图标 |
| `icon` | `string` | `''` | - |
| `content` | `string` | `''` | - |
| `type` | `string` | `'default'` | - |
| `badge` | `AmFloatButtonBadge` | `AM_FLOAT_BUTTON_NO_BADGE` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `openChange` | `(opened)` | - |
| `click` | `(event: UniPointerEvent)` | 点了触发按钮 |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `closeIcon` | - | 有默认内容 |
| `icon` | - | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 FloatButtonGroup，文档在 [float-button](https://m.antdv-next.com/components/float-button) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- icon / closeIcon 是图标名（`<am-icon>` 的 name），content 是文字；自定义内容用同名插槽；
- 属性没有 undefined，分不出“受控”与“非受控”：点击后自己先切换并发出事件，`open` 变化时再跟随它；
- 展开 / 收起是淡入 + 从触发按钮的方向滑出 12px（没有 transform-origin 的缩放）；
- 方形、不带触发按钮的组不会合成一张卡片（改不了插槽里按钮的圆角、阴影，也没有伪元素画分隔线），仍是分开的按钮；
- 组里的按钮之间的 12px 间距由按钮自己留（`<am-float-button>` 知道自己在组里）

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
