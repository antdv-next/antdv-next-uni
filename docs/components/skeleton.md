<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-skeleton 骨架屏

骨架屏（= antdv-next-mobile 的 Skeleton）：loading（为 false 时显示默认插槽）、active（闪烁）、avatar、title、paragraph、round 同名同义；段落行数、标题宽度的默认值同 Antdv Next（有头像时 2 行、标题 50%；否则 3 行、标题 38%，最后一行 61%）。

## 用法

```vue
<am-skeleton />
```

摘自示例页 [pages/components/skeleton.uvue](../../pages/components/skeleton.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `loading` | `boolean` | `true` | 为 false 时显示默认插槽 |
| `active` | `boolean` | `false` | 闪烁 |
| `avatar` | `boolean` | `false` | - |
| `title` | `boolean` | `true` | - |
| `paragraph` | `boolean` | `true` | - |
| `round` | `boolean` | `false` | - |
| `avatarSize` | `string` | `'middle'` | 头像的尺寸：small / middle / large，或像素（如 '56'） |
| `avatarShape` | `string` | `'circle'` | 头像的形状：circle / square |
| `titleWidth` | `string` | `''` | 标题的宽度（如 '50%'、'120px'）；空为默认 |
| `rows` | `number` | `0` | 段落的行数；0 为默认（有头像时 2 行，否则 3 行） |
| `rowWidth` | `string` | `''` | 段落最后一行的宽度（如 '61%'）；空为默认 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/skeleton](https://m.antdv-next.com/components/skeleton)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- avatar / title / paragraph 只有布尔值（UTS 的属性不能是“布尔或对象”）：对象里的配置拆成 `avatarSize`（small / middle / large 或像素数字的字符串）、`avatarShape`、`titleWidth`、`rows`、`rowWidth`；
- App 端没有 @keyframes，`active` 不是扫光，而是整体的透明度来回过渡（定时器 + transition）；
- 没有 Skeleton.Button / Avatar / Input / Image 子组件

登记在 [tools/parity/known/skeleton.json](../../tools/parity/known/skeleton.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 多出的属性 | `avatarSize` | avatar 只能是布尔值（UTS 的属性不能是“布尔或对象”），对象里的 size 拆成单独的属性 |
| 多出的属性 | `avatarShape` | 同 avatarSize：avatar.shape |
| 多出的属性 | `titleWidth` | 同 avatarSize：title.width |
| 多出的属性 | `rows` | 同 avatarSize：paragraph.rows |
| 多出的属性 | `rowWidth` | 同 avatarSize：paragraph.width（最后一行的宽度） |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
