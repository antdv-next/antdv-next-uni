<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-space 间距

间距（= antdv-next-mobile 的 Space）：给一排（或一列）子元素之间留出相同的间距。size（small 8 / middle 16 / large 24，或像素数）、orientation / direction / vertical、align（start / end / center / baseline / stretch；横向默认 center）、wrap（横向时自动换行）、block（撑满父元素）同名同义；插槽 default。预设的间距取主题的 paddingXS / padding / paddingLG（紧凑主题下跟着变小）。

## 用法

```vue
<am-space>
  <am-space-item>
    <am-button type="primary" text="主按钮" />
  </am-space-item>
  <am-space-item>
    <am-button text="默认" />
  </am-space-item>
  <am-space-item>
    <am-tag text="标签" />
  </am-space-item>
  <am-space-item>
    <text>文字</text>
  </am-space-item>
</am-space>
```

摘自示例页 [pages/components/space.uvue](../../pages/components/space.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `string \| number` | `'small'` | small 8 / middle 16 / large 24，或像素数 |
| `orientation` | `string` | `''` | - |
| `direction` | `string` | `''` | orientation 的别名 |
| `vertical` | `boolean` | `false` | - |
| `align` | `string` | `''` | start / end / center / baseline / stretch；横向默认 center |
| `wrap` | `boolean` | `false` | 横向时自动换行 |
| `block` | `boolean` | `false` | 撑满父元素 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/space](https://m.antdv-next.com/components/space)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- **App 端子元素要放进 `<am-space-item>`**：App 端的运行时不支持 CSS `gap`（编译不报错但没有效果），容器又包不了插槽里的子元素，间距由 `<am-space-item>` 自己加外边距；Web 端容器的 `gap` 有效，可以不包；
- 因为包不了子元素，也就不能在子元素之间插入内容：没有 `separator` 属性与插槽（分隔线请自己写在子元素之间）；
- `size` 是一个值（字符串或数字），没有 [横向, 纵向] 的数组写法；其他 CSS 长度原样写进 gap；
- App 端没有 align-items: baseline，`align="baseline"` 按 flex-end 处理（Web 端是 baseline）

登记在 [tools/parity/known/space.json](../../tools/parity/known/space.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `separator` | 容器包不了插槽里的子元素，没法在它们之间插入内容（间距在 Web 端是容器上的 CSS gap，App 端由 am-space-item 加外边距）；分隔线请自己写在子元素之间 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
