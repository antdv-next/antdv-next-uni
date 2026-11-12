<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-progress 进度条

进度条（= antdv-next-mobile 的 Progress）：type（line / circle）、percent、status（success / exception / normal / active，到 100 自动变 success）、showInfo、strokeWidth、strokeLinecap、strokeColor、railColor（trailColor 为旧名）、success（{ percent, strokeColor } 已完成的分段）、size、steps（分段的条数）同名同义；默认插槽是自定义的进度文字（参数 percent、successPercent）。

## 用法

```vue
<am-progress root-class="demo__block" :percent="30" />
```

摘自示例页 [pages/components/progress.uvue](../../pages/components/progress.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `string` | `'line'` | line / circle |
| `percent` | `number` | `0` | - |
| `status` | `string` | `''` | success / exception / normal / active，到 100 自动变 success |
| `showInfo` | `boolean` | `true` | - |
| `strokeWidth` | `number` | `0` | - |
| `strokeLinecap` | `string` | `'round'` | - |
| `strokeColor` | `string` | `''` | - |
| `railColor` | `string` | `''` | trailColor 为旧名 |
| `trailColor` | `string` | `''` | - |
| `success` | `AmProgressSuccess` | `AM_PROGRESS_NO_SUCCESS` | { percent, strokeColor } 已完成的分段 |
| `size` | `string` | `'default'` | - |
| `steps` | `number` | `0` | 分段的条数 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `{ percent, successPercent }` | 有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/progress](https://m.antdv-next.com/components/progress)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- uvue 没有 SVG：圆形进度用两个半圆旋转实现（每个半边裁一半，里面的半圆环按比例转进来），所以没有缺口（`gapDegree` / `gapPlacement`，`type="dashboard"` 画成整圆）、圆形的端点不是圆头、`strokeWidth` 在圆形里是像素；
- `strokeColor` 只能是一个颜色（App 端的 view 没有渐变的圆环；steps 也不能每段一个颜色）；
- `size` 是字符串：small / medium / default，或像素数字（线形为粗细、圆形为直径），没有 [宽, 高] 与对象形式；
- `steps` 只有数字；`format` / `rounding` 是函数，UTS 里函数不能返回节点：自定义文字用默认插槽；
- 没有 `percentPosition`（文字固定在线的末端外侧）；`status="active"` 没有扫光动画（App 端没有 @keyframes）

登记在 [tools/parity/known/progress.json](../../tools/parity/known/progress.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `format` | 是函数（返回节点），UTS 里函数不能返回节点；用同名插槽（默认插槽，参数 percent、successPercent） |
| 没有的属性 | `gapDegree` | uvue 没有 SVG，圆形进度用两个半圆旋转实现，画不了缺口（dashboard 画成整圆） |
| 没有的属性 | `gapPlacement` | 同 gapDegree |
| 没有的属性 | `percentPosition` | 文字固定在线的末端外侧；内嵌的文字要按进度定位，待有需求再加 |
| 没有的属性 | `rounding` | UTS 的属性里传函数在 App 端不可靠；分段固定用 Math.round |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
