<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-config-provider 全局化配置

全局化配置（= antdv-next-mobile 的 ConfigProvider）：theme、locale、componentSize、componentDisabled 同名同义。

它同时是主题变量的容器：App 端没有 :root，CSS 变量只对写着它们的节点的子孙生效，所以**每个页面的根节点都应当是它**（页面背景色、原生导航栏的颜色、Android 返回键先关弹出层也由根上的它负责）。嵌套使用时内层只换主题变量（局部主题），不再管页面的高度与背景。

高度：App 端（蒸汽模式，页面本身可以滚动）不能用 flex: 1——根节点被定成一屏高，内容再多页面也滚不动；改为 min-height 为窗口高度（像素，App 端的 min-height 不认百分比）。窗口高度在挂载后、页面显示时重新取：Android 冷启动的第一个页面第一次渲染时拿到的是整个屏幕的高度

## 用法

完整的用法见示例页 [pages/components/config-provider.uvue](../../pages/components/config-provider.uvue)。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `theme` | `AmThemeConfig` | `AM_INHERIT_THEME` | 主题：{ algorithm, token }。不传时用全局主题（setAmTheme） |
| `locale` | `AmLocale` | `AM_INHERIT_LOCALE` | 语言包。不传时用全局语言（setAmLocale） |
| `componentSize` | `string` | `''` | 内部组件的默认尺寸：small / middle / large；空为不指定 |
| `componentDisabled` | `boolean` | `false` | 禁用内部的全部组件 |
| `navigationBar` | `boolean` | `true` | 原生导航栏的颜色是否跟随主题（只对页面根上的 provider 有效） |

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/config-provider](https://m.antdv-next.com/components/config-provider)。

登记在 [tools/parity/known/config-provider.json](../../tools/parity/known/config-provider.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `direction` | App 端不支持 RTL 布局 |
| 没有的属性 | `getPopupContainer` | 没有 Teleport，弹出层就地渲染 |
| 多出的属性 | `navigationBar` | 原生导航栏不受 CSS 变量影响，由页面根上的 provider 调用 uni.setNavigationBarColor |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
