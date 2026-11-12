# 与 antdv-next-mobile 的差异

`antdv-next-uni` 与 [antdv-next-mobile](https://m.antdv-next.com) 对齐的是**接口和设计**：组件名、属性、`v-model`、事件、
实例方法、主题 token、语言包结构。实现是独立的——移动端库是 TS + DOM + 完整的 CSS，App 端编译不了；这里是 uvue + UTS。

所有差异都来自 uni-app x 的限制，并且都有登记：

- 每个组件自己的差异写在组件源码顶部的注释里，并登记到 [tools/parity/known/](../../tools/parity/known/)`<组件>.json`（带原因），
  由 `node tools/parity/check.mjs` 自动核对；
- 每个组件文档末尾的“与 antdv-next-mobile 的差异”一节就是从这两处生成的，见 [组件索引](../components/README.md)。

本页是总览：先说通用的写法差别，再说为什么。

## 写法上的差别

### 文字用属性传，不写在插槽里

uvue 的样式不继承：写在默认插槽里的文字拿不到按钮的颜色与字号。所以文字是属性：

```vue
<!-- antdv-next-mobile -->
<am-button type="primary">提交</am-button>

<!-- antdv-next-uni -->
<am-button type="primary" text="提交" />
```

同样的还有 `<am-tag text>`、`<am-typography-text text>` 等。默认插槽仍然可以放自定义内容，但里面的文字要自己写在
`<text>` 里、自己给颜色和字号。

### 渲染类属性是字符串 + 同名插槽

移动端库里是节点 / 渲染函数的属性（`icon`、`prefix`、`suffix`、`title`、`extra` …），这里是**字符串**（图标名或文字），
自定义内容用**同名插槽**。UTS 里不能把 VNode 放进数据。

```vue
<am-button icon="search" text="搜索" />
<am-list-item title="账单" prefix="wallet" extra="¥ 12,580.00" arrow />

<am-list-item title="自定义右侧">
	<template #extra>
		<am-tag text="新" />
	</template>
</am-list-item>
```

图标名是 `<am-icon>` 的 `name`，收录的名字见 `utils/icons.uts` 的 `AM_ICON_NAMES`。

### 没有 `undefined`，也就没有 `defaultXxx`

UTS 的属性分不出“没传”和空值：字符串属性用 `''` 表示没传，数字用 `0` 或 `-1`（各组件的文档里写明）。
所以多数组件没有 `defaultValue` / `defaultOpen` 这类非受控属性，请用 `v-model:value`、`v-model:open`。

### 事件

没有 `on*` 属性，全部是事件。双向绑定同时发 `update:<属性>` 和与 PC 同名的事件（`change`、`openChange` …）。
部分事件的参数是值而不是事件对象（例如 `am-input` 的 `change` / `input` 的参数是当前的字符串），以各组件的文档为准。

### 没有 `classes` / `styles`，根节点用 `rootClass`

传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载，同优先级时盖过传进来的类）。根节点是组件自己的元素，
`rootClass` 能生效。要改内部的颜色、尺寸，用组件的属性或主题 token。

### 没有 Teleport：弹出层放在页面根节点下

uni-app x 没有挂到 body 的 Teleport，所以没有 `getContainer`。`am-popup` 的根节点是 fixed、铺满屏幕的，
`am-modal`、`am-drawer`、`am-action-sheet`、各种选择器都基于它。使用时：

- 把弹出层放在页面根节点（`<am-config-provider>`）下面，不要放进会裁剪内容的容器里；
- Android 的返回键、导航栏的返回按钮会先关掉最上面的弹出层（由页面根上的 `<am-config-provider>` 处理）。
  页面自己写了 `onBackPress` 时，可以先调用 `utils/overlay.uts` 的 `closeAmOverlay()`（有弹出层被关掉时返回 `true`）。

### `gap` 在 App 端不生效：`am-space` / `am-flex` 的子元素包一层 `am-space-item`

CSS `gap` 在 App 端能编译，但运行时没有效果（HBuilderX 5.34 在 iOS 模拟器上实测，class / style / `:style` 都一样）。
容器又包不了插槽里的子元素，所以间距由包在子元素外面的 `<am-space-item>` 自己加外边距：

```vue
<am-space>
	<am-space-item><am-button text="确定" /></am-space-item>
	<am-space-item><am-button text="取消" /></am-space-item>
</am-space>

<am-flex gap="middle">
	<am-space-item><am-tag text="A" /></am-space-item>
	<am-space-item grow><am-input placeholder="占满剩余的宽度" /></am-space-item>
</am-flex>
```

- Web 端容器上的 `gap` 有效，`<am-space-item>` 在 Web 上不加外边距，两端的排版一致；只编译到 Web 时可以不包。
- `<am-space-item>` 的 `grow` 让这一项在主轴上占满剩余空间（`flex: 1`）。
- 因为包不了子元素，`am-space` 没有 `separator`（分隔线自己写在子元素之间）。
- 自己写样式时也一样：间距写在子元素的 margin 上，不要用 `gap`。

详见 [am-space](../components/space.md)、[am-flex](../components/flex.md)、[am-space-item](../components/space-item.md)。

### 每个页面的根节点是 `<am-config-provider>`

App 端没有 `:root`，主题的 CSS 变量写在 provider 的根节点上。见 [快速上手](./getting-started.md) 与 [主题](./theme.md)。
主题的算法是字符串（`'dark'`、`'compact'`），不是函数。

### 调用实例方法

`defineExpose` 暴露的方法通过模板引用调用。easycom 组件的实例类型是自动生成的全局类型（组件名的驼峰 + `ComponentPublicInstance`），
不需要 import：

```ts
const inputRef = ref<AmInputComponentPublicInstance | null>(null)

function focus() {
	inputRef.value?.focus()
}
```

## 函数式 API

uni-app x 不能动态挂载组件，移动端库里的静态方法（`message.success()`、`Toast.show()`、`Modal.confirm()`、`ImagePreview.show()`）
做不成同样的形式。这里是 `utils/` 里的函数，底层用原生的 `uni.showToast` / `uni.showLoading` / `uni.showModal` / `uni.previewImage`，
不需要在页面里放宿主组件。

### `amMessage` / `amToast`

```ts
import { amMessage, amToast } from '@/uni_modules/antdv-next-uni/utils/message.uts'

amMessage.success('已保存')
amMessage.warning('库存不足', 5)      // 第二个参数是时长，单位：秒
amMessage.loading('提交中...')         // 一直显示，直到 destroy()
amMessage.destroy()

amToast.show('已复制到剪贴板')
amToast.fail('网络异常', 3000)         // 单位：毫秒
amToast.loading('加载中')              // 一直显示，直到 clear()
amToast.clear()
```

| 对象 | 方法 | 时长 |
| --- | --- | --- |
| `amMessage`（= 移动端库的 `message`） | `success`、`error`、`info`、`warning`、`loading`、`destroy` | **秒**，默认 3；`loading` 默认 0（一直显示） |
| `amToast`（= 移动端库的 `Toast`） | `show`、`success`、`fail`、`loading`、`clear` | **毫秒**，默认 2000；`loading` 默认 0（一直显示） |

与移动端库的差异（原生提示做不到的）：

- 内容只能是字符串；同一时刻只有一个提示（新的顶掉旧的），没有 `key`、`maxCount`、`top`、`position`、自定义图标；
- `info` / `warning` 没有对应的图标，只显示文字；`amToast.fail` 用原生的 error 图标；
- 没有返回值（不是关闭句柄，没有 `then`）：要提前关闭调用 `amMessage.destroy()` / `amToast.clear()`；
- 时长为 0 表示一直显示。

示例：[pages/components/message.uvue](../../pages/components/message.uvue)。

### `confirmAmModal` / `alertAmModal`

```ts
import { alertAmModal, confirmAmModal } from '@/uni_modules/antdv-next-uni/utils/modal.uts'

confirmAmModal({ title: '删除订单', content: '删除后不能恢复，确定删除吗？', okType: 'danger', okText: '删除' }).then((ok : boolean) => {
	if (ok) remove()
})

alertAmModal({ title: '提示', content: '库存不足，请减少数量。' }).then(() => {
	// 已关闭
})
```

| 函数 | 返回 | 对应移动端库 |
| --- | --- | --- |
| `confirmAmModal(options : AmModalFuncProps) : Promise<boolean>` | 点了确定为 `true`，取消或关闭为 `false` | `Modal.confirm()` / `confirmAsync()` |
| `alertAmModal(options : AmModalFuncProps) : Promise<void>` | 关闭后完成 | `Modal.alert()` |

`AmModalFuncProps`（`types/modal.uts`）的字段：`title`、`content`、`okText`、`cancelText`、`okType`（`'primary'` 默认 / `'danger'`，决定确定按钮的颜色）。
按钮的默认文字取**全局**语言包（`setAmLocale`），确定按钮的颜色取**全局**主题（`setAmTheme`）——函数不在组件树里，
拿不到局部的 `<am-config-provider>`。界面是系统的原生对话框；要自定义内容、图标、多个操作时，在页面里放 `<am-modal v-model:open>`。

示例：[pages/components/modal.uvue](../../pages/components/modal.uvue)。

### `previewAmImage`

```ts
import { closeAmImagePreview, previewAmImage } from '@/uni_modules/antdv-next-uni/utils/image-preview.uts'

previewAmImage({ images: images, current: 1 })
```

对应移动端库的 `ImagePreview.show()`，用系统的图片预览（可以双指缩放；`<am-image-preview>` 组件没有缩放）。
选项：`images`、`current`（从 0 开始）、`loop`、`showIndex`（后两个只在 Android、iOS 上起作用）。没有返回值，
关闭用 `closeAmImagePreview()`（微信小程序没有这个接口）。

## 组件的对应关系

- antdv-next-mobile 的 Message / Toast 是上面的函数，没有组件；
- Grid 对应 `am-row` / `am-col`；Typography 拆成 `am-typography-text` / `am-typography-title` / `am-typography-paragraph`；
- uni 端特有的组件：`am-icon`（字体图标，App 端没有内联 SVG）、`am-loading`（App 端没有 `@keyframes`，用内置的 loading）、
  `am-space-item`、以及内部共用的 `am-picker-popup`、`am-picker-trigger`、`am-typography-base`；
- 移动端库里尚未实现的组件见仓库 [README](../../README.zh-CN.md) 的“组件”一节。

## 为什么：uni-app x 的限制

下表摘自 [AGENTS.md](../../AGENTS.md)（HBuilderX 5.34 实测），是上面这些差别的来源，自己写页面样式时也会遇到：

| 限制 | 做法 |
| --- | --- |
| 只有 class 选择器，没有后代 / 标签 / 属性选择器、伪类、伪元素 | BEM 单 class；状态用额外的类或 `:style` |
| 样式不继承 | 文字在 `<text>` 里，颜色字号写在 text 上 |
| 只有 flex（默认纵向）和绝对定位；`gap` 在 App 端能编译但运行时不生效 | 间距写在子元素的 margin 上；`am-space` / `am-flex` 的子元素包一层 `am-space-item` |
| 用到 `var()` 的属性不能写简写 | `border-top-left-radius` ×4、`padding-left` / `padding-right` 分开写；固定值可以简写 |
| `transition` 里不能用 `var()`；没有 `@keyframes` | 时长写字面量，只过渡 transform / opacity / 宽高 / 背景色 / 边框色；转圈用内置 `<loading>` |
| Android 上只切换类名时没有过渡 | 要动的值写在 `:style` 上 |
| view 默认 `overflow: hidden`（App） | 伸出父元素的部分（徽标、阴影）在自己和父元素上写 `overflow: visible` |
| `min-height` 不含内边距（App），且不支持百分比 | 不靠 `min-height` 定行高；弹层的最大高度按窗口高度算成像素 |
| 没有 `calc()`（App 蒸汽模式 5.31 之前）、`align-items: baseline`、`min-height: 100%` | 不用；Web 专用的写在 `/* #ifdef WEB */` 里 |
| `view` 不支持 `aria-label` 等无障碍属性 | 不写 |
| 没有 Teleport | 弹出层是 fixed 根节点，登记到 `utils/overlay.uts` 的栈 |
| 对象字面量不能 `as` 成类型 | 写类型注解：`const item : AmOption = { ... }` |

**Web 正常不代表 App 正常**：改了页面或组件之后，三端都要编译、都要看。
