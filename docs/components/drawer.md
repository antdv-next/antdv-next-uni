<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-drawer 抽屉

抽屉（= antdv-next-mobile 的 Drawer）：v-model:open、title、extra、placement（bottom 默认 / top / left / right）、closable（默认 true）、closeIcon、mask、maskClosable、size（default / large）、width、height、destroyOnHidden、zIndex、loading、round（默认 true）、safeArea 同名同义；事件 update:open、close（关闭图标、遮罩、Android 返回键）、afterOpenChange；插槽 default、title、extra、footer、closeIcon。

## 用法

```vue
<am-drawer v-model:open="bottom" title="筛选" extra="重置" @close="onClose" @after-open-change="onAfterOpenChange">
  <view><text>抽屉的内容放在默认插槽。</text></view>
</am-drawer>
```

摘自示例页 [pages/components/drawer.uvue](../../pages/components/drawer.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `title` | `string` | `''` | - |
| `extra` | `string` | `''` | - |
| `placement` | `string` | `'bottom'` | bottom 默认 / top / left / right |
| `closable` | `boolean` | `true` | 默认 true |
| `closeIcon` | `string` | `'close'` | - |
| `mask` | `boolean` | `true` | - |
| `maskClosable` | `boolean` | `true` | - |
| `size` | `string` | `'default'` | default / large |
| `width` | `number` | `0` | - |
| `height` | `number` | `0` | - |
| `destroyOnHidden` | `boolean` | `false` | - |
| `zIndex` | `number` | `1000` | - |
| `loading` | `boolean` | `false` | - |
| `round` | `boolean` | `true` | 默认 true |
| `safeArea` | `boolean` | `true` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `close` | `()` | 关闭图标、遮罩、Android 返回键 |
| `afterOpenChange` | `(open: boolean)` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |
| `title` | - | 有默认内容 |
| `extra` | - | 有默认内容 |
| `closeIcon` | - | 有默认内容 |
| `footer` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/drawer](https://m.antdv-next.com/components/drawer)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- title / extra 是字符串，自定义内容用同名插槽；footer 只有插槽（底部通常是按钮，没有字符串的写法）；
- closable 只有布尔值，closeIcon 是图标名；
- size 只有 default（上下：按内容；左右：窗口宽度的 80%）与 large（上下：窗口高度的 90%；左右：整个宽度），自定义大小用 width / height（像素数）；
- 内容区：定了高度（height、size="large"、左右抽屉）时可以滚动；按内容定高时不滚动（最高为窗口的 90%）；
- 没有 keyboard、forceRender、lockScroll、swipeToClose、rootStyle

登记在 [tools/parity/known/drawer.json](../../tools/parity/known/drawer.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `footer` | 底部通常是按钮，没有字符串的写法：只提供 footer 插槽 |
| 没有的属性 | `keyboard` | 手机上没有 ESC；Android 的返回键会先关掉最上面的弹出层 |
| 没有的属性 | `forceRender` | am-popup 还没有 forceRender |
| 没有的属性 | `lockScroll` | fixed 的遮罩已经拦住了页面的滚动 |
| 没有的属性 | `swipeToClose` | 下滑关闭需要手势与面板位移联动，am-popup 还不支持，待实现 |
| 没有的属性 | `rootStyle` | 根节点是 am-popup，样式不能透传到子组件内部；用 rootClass |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
