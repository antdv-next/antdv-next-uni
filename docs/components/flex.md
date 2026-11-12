<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-flex 弹性布局

弹性布局（= antdv-next-mobile 的 Flex）：vertical、orientation（horizontal / vertical）、wrap、justify、align、flex（容器自己的 flex）、gap（small 8 / middle 16 / large 24，或像素数）同名同义；justify / align 是 CSS 的值（flex-start / center / space-between …）。

## 用法

```vue
<am-flex>
  <view><text>1</text></view>
  <view><text>2</text></view>
  <view><text>3</text></view>
</am-flex>
```

摘自示例页 [pages/components/flex.uvue](../../pages/components/flex.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `vertical` | `boolean` | `false` | - |
| `orientation` | `string` | `''` | horizontal / vertical |
| `wrap` | `boolean` | `false` | - |
| `justify` | `string` | `''` | - |
| `align` | `string` | `''` | - |
| `flex` | `string` | `''` | 容器自己的 flex |
| `gap` | `string \| number` | `''` | small 8 / middle 16 / large 24，或像素数 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/flex](https://m.antdv-next.com/components/flex)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `gap`：Web 端是容器上的 CSS `gap`；**App 端的运行时不支持 gap，子元素要放进 `<am-space-item>`**（由它加外边距）；预设值取主题的 paddingXS / padding / paddingLG，数字（或数字字符串）按像素，其他 CSS 长度原样写入；
- `wrap` 只有布尔值（true = wrap），没有 `component`（根节点只能是 view）；
- 不写 align 时子元素拉伸（uvue 的 view 默认 align-items: stretch，与 CSS 的 normal 表现相同）

登记在 [tools/parity/known/flex.json](../../tools/parity/known/flex.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `component` | uvue 的根节点只能是 view，没有动态标签 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
