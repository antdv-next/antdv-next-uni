<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-badge 徽标数

徽标（= antdv-next-mobile 的 Badge）：count、dot、overflowCount、showZero、offset（[右, 上] 的偏移，像素）、color（预设色名或颜色值）、status（success / processing / default / error / warning）、text、size（default / small）同名同义；插槽 default（被包住的内容）、count（自定义角标）、text。包着内容时角标压在右上角；没有内容时角标单独显示；没有内容且写了 status / color（没有 count 或有 text）时是状态点 + 文字。

## 用法

```vue
<am-badge :count="5"><view></view></am-badge>
```

摘自示例页 [pages/components/badge.uvue](../../pages/components/badge.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `count` | `number` | `0` | - |
| `dot` | `boolean` | `false` | - |
| `overflowCount` | `number` | `99` | - |
| `showZero` | `boolean` | `false` | - |
| `offset` | `number[]` | `[]` | [右, 上] 的偏移，像素 |
| `color` | `string` | `''` | 预设色名或颜色值 |
| `status` | `string` | `''` | success / processing / default / error / warning |
| `text` | `string` | `''` | - |
| `size` | `string` | `'default'` | default / small |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 被包住的内容 |
| `text` | - | - |
| `count` | - | 自定义角标；有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/badge](https://m.antdv-next.com/components/badge)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `count` 只有数字，`text` 是字符串；文字或自定义节点用 count / text 插槽；
- `offset` 的两项只有数字（像素）；
- 没有 `title`（view 没有原生的 title 提示）；状态点没有 processing 的呼吸动画（没有 @keyframes）；
- 角标要伸出内容的右上角：外层容器如果裁剪内容（App 端 view 默认 overflow: hidden），在容器上写 overflow: visible

登记在 [tools/parity/known/badge.json](../../tools/parity/known/badge.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `title` | view 没有原生的 title 提示 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
