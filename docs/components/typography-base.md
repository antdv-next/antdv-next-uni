<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-typography-base 排版的公共实现

排版的公共实现（= antdv-next-mobile 内部的 TypographyBase）：`<am-typography-text>` / `<am-typography-title>` / `<am-typography-paragraph>` 都只是把属性原样传给它，`variant` 决定字号与段间距。不直接使用。

属性的含义与差异见 am-typography-text 顶部的注释。没有操作（展开 / 复制）时根节点就是一个 `<text>`（可以放进一行里）；有操作时是 view：文字 + 操作

## 用法

示例应用里没有直接用到这个组件。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `string` | `'text'` | text / title / paragraph |
| `level` | `number` | `1` | - |
| `text` | `string` | `''` | - |
| `type` | `string` | `''` | - |
| `disabled` | `boolean` | `false` | - |
| `mark` | `boolean` | `false` | - |
| `code` | `boolean` | `false` | - |
| `keyboard` | `boolean` | `false` | - |
| `underline` | `boolean` | `false` | - |
| `delete` | `boolean` | `false` | - |
| `strong` | `boolean` | `false` | - |
| `italic` | `boolean` | `false` | - |
| `ellipsis` | `boolean` | `false` | - |
| `rows` | `number` | `1` | - |
| `expandable` | `boolean` | `false` | - |
| `collapsible` | `boolean` | `false` | - |
| `expanded` | `boolean` | `false` | **`v-model:expanded`** |
| `copyable` | `boolean` | `false` | - |
| `copyText` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `expand` | `(expanded, event: UniPointerEvent)` | - |
| `update:expanded` | `(expanded: boolean)` | `v-model:expanded` 的更新 |
| `copy` | `(event: UniPointerEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

没有插槽。

## 与 antdv-next-mobile 的差异

uni 端特有的组件，antdv-next-mobile 里没有对应的公开组件：= 移动端库内部的 TypographyBase（不导出）：am-typography-text / title / paragraph 的公共实现，不直接使用
