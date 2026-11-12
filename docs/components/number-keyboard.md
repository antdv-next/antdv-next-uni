<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-number-keyboard 数字键盘

数字键盘（= antdv-next-mobile 的 NumberKeyboard）：从屏幕底部滑出来的数字键盘，没有遮罩，页面照常可以点。v-model:open、v-model:value（已输入的字符串）、maxlength、title、theme（default / custom：右侧多一列“删除 + 大的确定”）、extraKey、randomKeyOrder、showDeleteKey、closeButtonText、confirmText、safeArea、poppable、zIndex 同名同义；事件 update:open、openChange、update:value、input（按了数字 / 额外的键）、delete、confirm、close、blur；插槽 title、delete（删除键的内容）、extraKey（default 主题左下角的键）。按住删除键会连续删除。

## 用法

```vue
<am-number-keyboard v-model:value="value" :poppable="false" extra-key="." @input="onInput" @delete="onDelete" />
```

摘自示例页 [pages/components/number-keyboard.uvue](../../pages/components/number-keyboard.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | **`v-model:open`** |
| `value` | `string` | `''` | **`v-model:value`** 已输入的字符串 |
| `maxlength` | `number` | `-1` | 最多输入几个字符，-1 为不限 |
| `title` | `string` | `''` | - |
| `theme` | `string` | `'default'` | default / custom：右侧多一列“删除 + 大的确定” |
| `extraKey` | `string` | `''` | 额外的键（如 '.'、'X'）：default 主题在左下角，custom 主题在 0 的右边 |
| `randomKeyOrder` | `boolean` | `false` | - |
| `showDeleteKey` | `boolean` | `true` | - |
| `closeButtonText` | `string` | `''` | 头部右侧关闭按钮的文字（default 主题），空为不显示 |
| `confirmText` | `string` | `''` | 确定键的文字（custom 主题），空为语言包的 NumberKeyboard.done |
| `safeArea` | `boolean` | `true` | - |
| `poppable` | `boolean` | `true` | true：贴在屏幕底部；false：就地显示在页面里 |
| `zIndex` | `number` | `1000` | - |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:open` | `(open: boolean)` | `v-model:open` 的更新 |
| `openChange` | `(open: boolean)` | - |
| `update:value` | `(value: string)` | `v-model:value` 的更新 |
| `input` | `(text)` | 按了数字 / 额外的键 |
| `delete` | `()` | - |
| `confirm` | `()` | - |
| `close` | `()` | - |
| `blur` | `()` | - |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `title` | - | 有默认内容 |
| `delete` | - | 删除键的内容；有默认内容 |
| `extraKey` | - | default 主题左下角的键 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/number-keyboard](https://m.antdv-next.com/components/number-keyboard)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 不基于 am-popup：它的根节点铺满屏幕，去掉遮罩后仍然挡住页面的点击；这里是一块贴在底部的 fixed 面板，过渡（transform，300ms）与弹出层相同，同样登记到弹出层栈（Android 的返回键先收起键盘）；
- 没有 hideOnClickOutside：App 端没有“触摸组件以外的区域”的全局事件。blur 事件在键盘被返回键收起时发出；点页面其他地方要收起键盘时，页面自己把 open 改成 false；
- extraKey 只能是一个字符串（custom 主题也只有一个额外的键，0 占两列）；maxlength 为 -1 表示不限；
- title 是字符串，自定义内容用 title 插槽；默认的删除图标是画出来的（图标字体里没有退格键）；
- 没有 defaultOpen / defaultValue（UTS 里分不出“没传”）；`poppable` 为 false 时一直显示（open 不起作用）；
- 没有 getContainer（没有 Teleport：键盘放在页面根节点下）

登记在 [tools/parity/known/number-keyboard.json](../../tools/parity/known/number-keyboard.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultOpen` | UTS 的布尔属性分不出“没传”：不绑定 open 时组件自己管开关 |
| 没有的属性 | `defaultValue` | UTS 里分不出“没传”和空字符串，非受控用法请用 v-model:value |
| 没有的属性 | `hideOnClickOutside` | App 端没有“触摸组件以外的区域”的全局事件，键盘又没有遮罩（页面要照常可点）；由页面把 open 改成 false，blur 事件在 Android 返回键收起键盘时发出 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
