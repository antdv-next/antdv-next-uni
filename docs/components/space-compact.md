<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-space-compact 紧凑组合

紧凑组合（= antdv-next-mobile 的 Space.Compact）：把带边框的组件（Button、Input、InputNumber、各种选择器、Space.Addon）拼成一个没有缝的控件。size（组里每一项的尺寸，子项自己的 size 优先）、orientation / direction / vertical、block（撑满父元素，输入框与选择器平分剩余的宽度）同名同义；组可以嵌套，里面的组接着外面的组（只有最外侧保留圆角）。

## 用法

```vue
<am-space-compact>
  <am-button icon="left" />
  <am-button text="上一页" />
  <am-button text="下一页" />
  <am-button icon="right" />
</am-space-compact>
```

摘自示例页 [pages/components/space.uvue](../../pages/components/space.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `string` | `''` | 组里每一项的尺寸，子项自己的 size 优先 |
| `orientation` | `string` | `''` | - |
| `direction` | `string` | `''` | orientation 的别名 |
| `vertical` | `boolean` | `false` | - |
| `block` | `boolean` | `false` | 撑满父元素，输入框与选择器平分剩余的宽度 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 SpaceCompact，文档在 [space](https://m.antdv-next.com/components/space) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- uvue 没有后代选择器，也包不了插槽里的子元素：这里用 provide 给出登记表，子项（utils/compact.uts 的 useAmCompactItem）自己画接缝。已接入的是 am-button、am-input、am-input-number、am-picker-trigger（所有选择器）、am-space-addon；其他组件放进来不会变形，但也不会去掉圆角；
- 子项的顺序按登记（setup）的先后：首次渲染等于模板里的顺序，之后用 v-if 插到中间的子项会被当成最后一个，这时给 `<am-space-compact>` 换一个 key；
- 两个实心按钮之间没有那条半透明的细线伪元素，改为后一个按钮的起始边框用半透明的容器色；
- 不是 block 的横向组里，输入框与选择器最少 120px 宽（App 端的 input 没有固有宽度）

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
