<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-avatar 头像

头像（= antdv-next-mobile 的 Avatar）：src、icon、shape（circle / square）、size（small 28 / middle 40 / large 56 或像素）、gap（文字到两边的距离，放不下时缩小字号）、fit（cover / contain / fill / none / scale-down）同名同义；事件 error（图片加载失败，退回图标 / 文字）；插槽 default（自定义内容）、icon、src。

在 `<am-avatar-group>` 里：没写 size / shape 时用组的；向组登记自己，由此得到重叠（-12px 的起始外边距）、2px 容器色的描边（盒子各大 4px），排在 max.count 之后时不渲染

## 用法

```vue
<am-avatar src="/static/logo.png" />
```

摘自示例页 [pages/components/avatar.uvue](../../pages/components/avatar.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | `string` | `''` | - |
| `icon` | `string` | `''` | - |
| `shape` | `string` | `''` | circle / square；空为跟随所在的头像组，再没有则 circle |
| `size` | `string` | `''` | small 28 / middle 40 / large 56 或像素 |
| `gap` | `number` | `4` | 文字到两边的距离，放不下时缩小字号 |
| `fit` | `string` | `'cover'` | cover / contain / fill / none / scale-down |
| `text` | `string` | `''` | 文字头像的文字 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `error` | `(event: UniImageErrorEvent)` | 图片加载失败，退回图标 / 文字 |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 自定义内容 |
| `src` | - | - |
| `icon` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/avatar](https://m.antdv-next.com/components/avatar)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 文字头像用 `text` 属性：uvue 的样式不继承，默认插槽里的文字拿不到头像的颜色与字号；
- `src` 是图片地址，`icon` 是图标名（`<am-icon>` 的 name）；自定义内容用同名插槽；
- `size` 是字符串：像素写成 size="64"（UTS 的属性不能是 string | number 的联合类型）；
- 文字的宽度量不了，`gap` 按字数估算（中文算一个字宽，其他算 0.6 个）；
- 没有 srcSet、alt、draggable、crossOrigin（image 组件没有这些属性）

登记在 [tools/parity/known/avatar.json](../../tools/parity/known/avatar.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `srcSet` | image 组件没有 srcset |
| 没有的属性 | `alt` | image 组件没有 alt |
| 没有的属性 | `draggable` | image 组件没有 draggable |
| 没有的属性 | `crossOrigin` | image 组件没有 crossorigin |
| 多出的属性 | `text` | uvue 的样式不继承，默认插槽里的文字拿不到头像的颜色与字号，所以文字头像用属性传 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
