<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-result 结果

结果（= antdv-next-mobile 的 Result）：status（success / error / info / warning / 403 / 404 / 500）、icon、title、subTitle 同名同义；插槽 default（补充说明，带浅色底）、icon、title、subTitle、extra（操作区）。

## 用法

```vue
<am-result :status="status" :title="title" :sub-title="subTitle">
  <template #extra>
    <am-button type="primary" text="返回首页" />
    <am-button text="查看详情" />
  </template>
</am-result>
```

摘自示例页 [pages/components/result.uvue](../../pages/components/result.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `status` | `string` | `'info'` | success / error / info / warning / 403 / 404 / 500 |
| `icon` | `string` | `''` | - |
| `title` | `string` | `''` | - |
| `subTitle` | `string` | `''` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 补充说明，带浅色底 |
| `icon` | - | 有默认内容 |
| `title` | - | - |
| `subTitle` | - | - |
| `extra` | - | 操作区 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/result](https://m.antdv-next.com/components/result)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- title / subTitle 是字符串，`icon` 是图标名（`<am-icon>` 的 name）；自定义内容用同名插槽；
- 没有 `extra` 属性（操作区是按钮等节点，放不进数据），只有 extra 插槽；
- `status` 是字符串（403 写成 status="403"）；403 / 404 / 500 是主题色的图标，不是插画（App 端没有内联 SVG）

登记在 [tools/parity/known/result.json](../../tools/parity/known/result.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `extra` | 操作区是按钮等节点，放不进数据（UTS 里不能存 VNode）：只有 extra 插槽 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
