<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-space-addon 紧凑组合里的附加块

紧凑组合里的附加块（= antdv-next-mobile 的 Space.Addon）：放在 `<am-space-compact>` 里，给输入框加前后缀文字（“https://”、“元”）。variant（outlined 带边框与浅底色，默认；filled；borderless）、size、disabled 同名同义；插槽 default。

## 用法

```vue
<am-space-addon text="https://" />
```

摘自示例页 [pages/components/space.uvue](../../pages/components/space.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `string` | `'outlined'` | outlined 带边框与浅底色，默认；filled；borderless |
| `size` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `text` | `string` | `''` | uni 端多出的属性：uvue 的样式不继承，默认插槽里的文字拿不到附加块的颜色与字号，所以文字用属性传 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 SpaceAddon，文档在 [space](https://m.antdv-next.com/components/space) 一页。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 文字用 `text` 属性：uvue 的样式不继承，默认插槽里的文字拿不到它的颜色与字号（插槽仍可放自定义内容，如图标）

登记在 [tools/parity/known/space-addon.json](../../tools/parity/known/space-addon.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 多出的属性 | `text` | uvue 的样式不继承，默认插槽里的文字拿不到附加块的颜色与字号，所以文字用属性传 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
