<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-loading 加载指示器

加载指示器（= antdv-next-mobile 内部的 Spinner）：整个库只有这一个转圈，Button、Spin、List、Toast 都用它。用内置的 loading 组件（各端原生实现）：App 端没有 @keyframes，字体图标转不起来。圆环的颜色是 border-color，且不支持 CSS 变量：color 为空时按主题取次要文字色

## 用法

```vue
<am-loading text="正在刷新" />
```

摘自示例页 [pages/components/pull-to-refresh.uvue](../../pages/components/pull-to-refresh.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | `''` | 圆环旁的文字 |
| `vertical` | `boolean` | `false` | 文字放在圆环下方 |
| `color` | `string` | `''` | - |
| `size` | `number` | `20` | - |

## 事件

没有事件。

## 插槽

没有插槽。

## 与 antdv-next-mobile 的差异

uni 端特有的组件，antdv-next-mobile 里没有对应的公开组件：对应 antdv-next-mobile 内部的 Spinner；App 端没有 @keyframes，用内置的 loading 组件
