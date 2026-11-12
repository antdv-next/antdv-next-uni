<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-steps 步骤条

步骤条（= antdv-next-mobile 的 Steps）：items（title、subTitle、content、icon、status、disabled）、v-model:current、initial、status（当前步的状态：wait / process / finish / error）、orientation（horizontal / vertical）、size（default / small）、type（default / dot）、titlePlacement（horizontal / vertical，只对横向步骤条有效）同名同义；事件 update:current、change；插槽 iconRender（item、index、status、active）。

## 用法

```vue
<am-steps :current="current" :items="items" />
```

摘自示例页 [pages/components/steps.uvue](../../pages/components/steps.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `AmStepsItem[]` | `[]` | title、subTitle、content、icon、status、disabled |
| `current` | `number` | `0` | **`v-model:current`** 当前步骤，从 initial 开始计数 |
| `initial` | `number` | `0` | 第一步的序号 |
| `status` | `string` | `'process'` | 当前步的状态：wait / process / finish / error |
| `orientation` | `string` | `'horizontal'` | horizontal / vertical |
| `size` | `string` | `'default'` | default / small |
| `type` | `string` | `'default'` | default / dot |
| `titlePlacement` | `string` | `'vertical'` | 标题相对图标的位置：横向步骤条默认 vertical（标题在图标下方） |
| `clickable` | `boolean` | `false` | 点击步骤可以切换（发出 update:current / change） |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:current` | `(current: number)` | `v-model:current` 的更新 |
| `change` | `(step)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `iconRender` | `{ item, index, status, active }` | item、index、status、active；有默认内容 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/steps](https://m.antdv-next.com/components/steps)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 步骤的 title / subTitle / content 是文字、icon 是图标名（UTS 里不能把 VNode 放进数据）；自定义图标用 iconRender 插槽；
- 多一个 `clickable`：移动端库是“监听了 change 或用了 v-model:current 才可点击”，这里拿不到有没有监听；
- 没有已废弃的 direction / labelPlacement / progressDot，步骤没有 description（用 content）、class / style

登记在 [tools/parity/known/steps.json](../../tools/parity/known/steps.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `direction` | 已废弃的属性不移植，用 orientation |
| 没有的属性 | `progressDot` | 已废弃的属性不移植，用 type="dot" |
| 没有的属性 | `labelPlacement` | 已废弃的属性不移植，用 titlePlacement |
| 多出的属性 | `clickable` | 移动端库是“监听了 change 或用了 v-model:current 才可点击”，uni-app x 的组件里拿不到有没有监听，要显式写 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
