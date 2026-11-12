<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-typography-title 标题

标题（= antdv-next-mobile 的 TypographyTitle）：level（1–5，字号 32 / 26 / 22 / 18 / 16）+ 文本的全部属性，下方留字号一半的间距。属性、事件与差异同 `<am-typography-text>`（见它顶部的注释）：文字用 `text` 属性；ellipsis / copyable 只有布尔值，配置拆成 rows / expandable / collapsible / expanded / copyText。

## 用法

```vue
<am-typography-title v-for="level in levels" :key="level" :level="level" :text="'h' + level + '. Antdv Next'" />
```

摘自示例页 [pages/components/typography.uvue](../../pages/components/typography.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `level` | `number` | `1` | 1–5，字号 32 / 26 / 22 / 18 / 16 |
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
| `rows` | `number` | `1` | 省略时最多几行（= ellipsis.rows） |
| `expandable` | `boolean` | `false` | 省略后可以展开一次（= ellipsis.expandable） |
| `collapsible` | `boolean` | `false` | 展开后还能收起（= ellipsis.expandable 为 'collapsible'） |
| `expanded` | `boolean` | `false` | **`v-model:expanded`** 是否已展开，支持 v-model:expanded（= ellipsis.expanded） |
| `copyable` | `boolean` | `false` | - |
| `copyText` | `string` | `''` | 复制的内容，空为显示的文字（= copyable.text） |
| `text` | `string` | `''` | 显示的文字 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `expand` | `(expanded: boolean, event: UniPointerEvent)` | - |
| `update:expanded` | `(expanded: boolean)` | `v-model:expanded` 的更新 |
| `copy` | `(event: UniPointerEvent)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

没有插槽。

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的 TypographyTitle，文档在 [typography](https://m.antdv-next.com/components/typography) 一页。

与 antdv-next-mobile 的差异：没有“紧跟在其他排版后面的标题上方留 1.2em”（没有相邻选择器），要间距自己写 margin：


登记在 [tools/parity/known/typography-title.json](../../tools/parity/known/typography-title.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 多出的属性 | `text` | `<text>` 里不能放插槽，样式也不继承，文字用属性传 |
| 多出的属性 | `rows` | = ellipsis.rows：UTS 的属性不能是 boolean \| 对象 的联合类型，ellipsis 只有布尔值，配置拆成平铺的属性 |
| 多出的属性 | `expandable` | = ellipsis.expandable（展开一次），原因同 rows |
| 多出的属性 | `collapsible` | = ellipsis.expandable 为 collapsible（展开后还能收起），原因同 rows |
| 多出的属性 | `expanded` | = ellipsis.expanded（v-model:expanded），原因同 rows |
| 多出的属性 | `copyText` | = copyable.text，copyable 只有布尔值，原因同 rows |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
