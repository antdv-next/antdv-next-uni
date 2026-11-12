<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-avatar-group 头像组

头像组（= antdv-next-mobile 的 AvatarGroup）：一排互相压着一点的头像。max（{ count }：最多显示几个，其余的折叠成 “+N”）、size、shape（组里每个头像的尺寸与形状，头像自己写的优先）同名同义；插槽 default（若干 `<am-avatar>`）、overflow（自定义 “+N” 里的内容，参数 { count }）。

## 用法

```vue
<am-avatar-group>
  <am-avatar src="/static/logo.png" />
  <am-avatar text="张" />
  <am-avatar icon="user" />
  <am-avatar text="U" />
</am-avatar-group>
```

摘自示例页 [pages/components/avatar-group.uvue](../../pages/components/avatar-group.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `max` | `AmAvatarGroupMax` | `AM_AVATAR_GROUP_NO_MAX` | { count }：最多显示几个，其余的折叠成 “+N” |
| `size` | `string` | `''` | - |
| `shape` | `string` | `''` | 组里每个头像的尺寸与形状，头像自己写的优先 |
| `total` | `number` | `0` | 头像的总数（算 “+N” 用）；0 为按默认插槽里登记的头像数 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 若干 `<am-avatar>` |
| `overflow` | `{ count }` | 自定义 “+N” 里的内容，参数 { count }；有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 AvatarGroup，文档在 [avatar](https://m.antdv-next.com/components/avatar) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 容器包不了、也数不了插槽里的子元素：头像在 setup 里向组登记，重叠（负的起始外边距）、描边、超出 max.count 后隐藏都由 `<am-avatar>` 自己完成，所以默认插槽里只有 `<am-avatar>` 会参与（隔着别的组件也可以）；登记的顺序是 setup 的顺序，之后用 v-if 插到中间的头像会被当成最后一个；
- 多了 `total`：“+N” 默认按登记的头像数算；只渲染了前几个头像而总数更多时（成员列表只取了第一页），用 total 写总人数；
- 描边是 2px 的边框（不是向外扩的 box-shadow：App 端的阴影没有扩展半径），头像的盒子因此各大 4px；
- `size` 是字符串：像素写成 size="64"；`max` 没有 style，要在 script 里按类型声明（AmAvatarGroupMax）

登记在 [tools/parity/known/avatar-group.json](../../tools/parity/known/avatar-group.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 多出的属性 | `total` | 容器数不了插槽里的子元素：“+N” 默认按登记的 `<am-avatar>` 数量算；只渲染了前几个头像而总数更多时用 total 写总人数 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
