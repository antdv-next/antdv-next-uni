<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-dropdown 下拉菜单

下拉菜单（= antdv-next-mobile 的 Dropdown）：一条筛选栏，每个 `<am-dropdown-item>` 是栏上的一个标题，点开后在栏的下方展开面板。v-model:activeKey（展开的是哪一项）、defaultActiveKey、closeOnMaskClick、closeOnClickAway、arrowIcon、zIndex 同名同义；事件 update:activeKey、change；方法 close()。

## 用法

```vue
<am-dropdown ref="barRef" v-model:activeKey="activeKey">
  <am-dropdown-item item-key="sort" v-model:value="sort" :options="sorts" @change="onSort" />
  <am-dropdown-item item-key="category" v-model:value="category" :options="categories" />
  <am-dropdown-item item-key="filter" title="筛选" :highlight="applied" show-footer @reset="onReset" @confirm="onConfirm">
    <view>
      <text>自定义面板（默认插槽）+ 页脚</text>
      <view>
        <am-button size="small" :type="onlyStock ? 'primary' : 'default'" text="仅看有货" @click="onlyStock = !onlyStock" />
        <am-button size="small" :type="freeShipping ? 'primary' : 'default'" text="包邮" @click="freeShipping = !freeShipping" />
      </view>
    </view>
  </am-dropdown-item>
</am-dropdown>
```

摘自示例页 [pages/components/dropdown.uvue](../../pages/components/dropdown.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `activeKey` | `string` | `''` | **`v-model:activeKey`** 展开项的 key，空字符串为全部收起 |
| `defaultActiveKey` | `string` | `''` | - |
| `closeOnMaskClick` | `boolean` | `true` | - |
| `closeOnClickAway` | `boolean` | `true` | - |
| `arrowIcon` | `string` | `'down'` | 箭头的图标名 |
| `zIndex` | `number` | `1000` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:activeKey` | `(activeKey: string)` | `v-model:activeKey` 的更新 |
| `change` | `(key: string)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 方法

通过模板引用调用：`ref<AmDropdownComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `close()` | 收起展开着的面板 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/dropdown](https://m.antdv-next.com/components/dropdown)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- key 是字符串，空字符串表示全部收起（移动端库是 null）；子项用 `item-key` 指定 key（组件里拿不到 vnode 的 key），不写时按顺序为 '0'、'1'……；
- 没有 Teleport：面板是 fixed 的一层，位置按量到的菜单栏下边缘定（展开时重新量），所以没有 getContainer；菜单栏放在会移动的容器（滚动区域）里时，展开后再滚动面板不会跟着走；
- closeOnClickAway：App 端没有“触摸组件以外的区域”的全局事件，做成菜单栏上方也盖一层透明的遮罩，点它收起；
- arrowIcon 是图标名（默认 down），自定义图标用子项的 arrowIcon 插槽（父组件的插槽传不到子项里）

[tools/parity/known/](../../tools/parity/known/) 里没有登记这个组件自己的接口差异：属性与事件的名字和移动端一致（类型、取值上的差别见上面的说明）。

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
