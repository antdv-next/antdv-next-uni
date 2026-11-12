# 快速上手

## 环境

- **HBuilderX 5.0 以上**（插件的 `package.json` 声明 `HBuilderX ^5.0.0`、`uni-app-x ^5.0.0`；本仓库在 5.34 上实测）。
  uni-app x 只能由 HBuilderX 编译。
- 只支持 **uni-app x**（uvue + UTS）项目，不支持 uni-app（Vue 2 / Vue 3）项目。

平台的验证情况见仓库 [README](../../README.md) 的“状态”一节：Web、iOS、Android 三端编译通过，鸿蒙与微信小程序尚未验证。

## 安装

组件库是一个标准的 uni_modules 插件，目录是 `uni_modules/antdv-next-uni`。两种装法任选其一：

1. **复制目录**：把本仓库的 `uni_modules/antdv-next-uni` 整个复制到你的项目的 `uni_modules/` 下。
2. **下载压缩包**：从 [GitHub Releases](https://github.com/antdv-next/antdv-next-uni/releases) 下载 `antdv-next-uni-<版本>.zip`，解压到项目的 `uni_modules/` 下。

DCloud 插件市场的版本尚未发布（插件 id 预留为 `antdv-next-uni`）。

> 不要把项目放进带 `node_modules` 的上层目录或 monorepo：HBuilderX 的编译器会解析到上层的 vite 而失败。

## 组件自动注册（easycom）

组件都以 `am-` 开头，目录名 = 文件名 = 标签名（`components/am-button/am-button.uvue`），符合 uni_modules 的 easycom 约定，
**不需要 import、不需要注册**，在模板里直接写标签：

```vue
<am-button type="primary" text="按钮" />
```

示例应用的 [pages.json](../../pages.json) 里另外显式写了一条规则，自动扫描没有生效时可以照抄：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^am-(.*)": "@/uni_modules/antdv-next-uni/components/am-$1/am-$1.uvue"
    }
  }
}
```

## 加载图标字体

图标是字体图标（`static/am-icons.ttf`）。在 `App.uvue` 的 `onLaunch` 里调用一次 `loadAmIcons()`，全部页面可用
（内部是 `uni.loadFontFace({ global: true })`，重复调用只加载一次）。示例应用的 [App.uvue](../../App.uvue) 就是这样写的：

```vue
<!-- App.uvue -->
<script setup lang="uts">
import { loadAmIcons } from '@/uni_modules/antdv-next-uni/utils/icons.uts'

onLaunch(() => {
	// 图标字体全局加载一次：组件里的 <am-icon> 都用它
	loadAmIcons()
})
</script>
```

不加载的话，`<am-icon>` 以及用到图标的组件（按钮的 `icon`、输入框的清除按钮、列表项的箭头……）显示不出图标。
收录的图标名在 `utils/icons.uts` 的 `AM_ICON_NAMES` 里。

## 每个页面用 `<am-config-provider>` 包起来

**每个页面的根节点都应当是 `<am-config-provider>`。** App 端没有 `:root`，主题的 CSS 变量（`--am-color-primary` …）
只能写在某个节点上、对它的子孙生效，这个节点就是它。页面根上的 provider 还负责：

- 页面的背景色（`colorBgLayout`）和最小高度（一屏高）；
- 原生导航栏的颜色跟随主题（`navigationBar` 属性，默认开）；
- Android 的返回键、导航栏的返回按钮先关掉最上面的弹出层。

```vue
<script setup lang="uts">
const open = ref(false)
</script>

<template>
	<am-config-provider>
		<am-button type="primary" block text="打开" @click="open = true" />
		<am-popup v-model:open="open" round closable>
			<text>内容</text>
		</am-popup>
	</am-config-provider>
</template>
```

组件样式里的变量都带着与默认主题一致的回退值，不包 provider 也能显示，但主题切换、暗色背景、返回键关弹层都不会生效。

它的属性（`theme`、`locale`、`componentSize`、`componentDisabled`、`navigationBar`）见
[am-config-provider](../components/config-provider.md)，嵌套使用可以做局部主题，见 [主题](./theme.md)。

## 写法上要注意的几点

和 antdv-next / antdv-next-mobile 的用法基本相同，下面几点是 uni-app x 带来的差别，详见 [与 antdv-next-mobile 的差异](./differences.md)：

- 文字用属性传：`<am-button text="提交" />`，不是写在默认插槽里。
- `icon`、`prefix`、`title` 这类属性是字符串（图标名或文字），自定义内容用同名插槽。
- 双向绑定带参数名：`v-model:value`、`v-model:open`、`v-model:checked`。
- 弹出层（`am-popup`、`am-modal`、`am-drawer`、各种选择器）放在页面根节点下，不要放进会裁剪内容的容器里。
- `am-space` / 带 `gap` 的 `am-flex` 的子元素要包一层 `<am-space-item>`（App 端 CSS `gap` 不生效）。
- 调用组件的方法：`ref<AmInputComponentPublicInstance | null>(null)`，实例类型是 easycom 自动生成的全局类型，不需要 import。

## 下一步

- [主题](./theme.md)、[国际化](./locale.md)
- [组件索引](../components/README.md)
- 示例应用：仓库根目录用 HBuilderX 打开即可运行，每个组件一页（[pages/components/](../../pages/components/)）
