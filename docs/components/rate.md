<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-rate 评分

评分（= antdv-next-mobile 的 Rate）：v-model:value、count、allowHalf（点星星的左半边为半星）、allowClear（再点一次当前值清零）、disabled（只读）、character、size（small / middle / large）同名同义；事件 update:value、change。

## 用法

```vue
<am-rate v-model:value="basic" @change="onChange" />
```

摘自示例页 [pages/components/rate.uvue](../../pages/components/rate.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `number` | `0` | **`v-model:value`** |
| `count` | `number` | `5` | - |
| `allowHalf` | `boolean` | `false` | 点星星的左半边为半星 |
| `allowClear` | `boolean` | `true` | 再点一次当前值清零 |
| `disabled` | `boolean` | `false` | 只读 |
| `character` | `string` | `'star-fill'` | 图标名，或直接显示的文字 |
| `size` | `string` | `''` | small / middle / large |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:value` | `(value: number)` | `v-model:value` 的更新 |
| `change` | `(next)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

没有插槽。

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/rate](https://m.antdv-next.com/components/rate)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- `character` 是字符串：图标名（默认 star-fill），或直接显示的文字（如 '好'、'A'）；没有 character 插槽（每颗星要画两层：底下一层灰的，上面一层按值裁剪的，插槽的内容换不了颜色）；
- 只能点选，不能按住拖动选择；
- 没有 defaultValue（用 v-model:value）、keyboard、id，没有 focus / blur / keydown 事件

登记在 [tools/parity/known/rate.json](../../tools/parity/known/rate.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和初始值，非受控用法请用 v-model:value |
| 没有的属性 | `keyboard` | 没有硬件键盘的方向键事件 |
| 没有的属性 | `id` | 没有原生的表单元素（用 view 画的），这个属性没有意义 |
| 没有的事件 | `focus` | 不是原生的可聚焦元素，没有焦点事件 |
| 没有的事件 | `blur` | 不是原生的可聚焦元素，没有焦点事件 |
| 没有的事件 | `keydown` | 没有按键事件 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
