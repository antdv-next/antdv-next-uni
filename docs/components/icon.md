<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-icon 图标

图标：字体图标（static/am-icons.ttf，App.uvue 中 loadAmIcons() 加载），名称见 utils/icons.uts 的 AM_ICON_NAMES。App 端没有内联 SVG，也没有伪元素，所以不能像 antdv-next-mobile 那样用 @antdv-next/icons 的组件。color 为空时用 CSS 变量中的文字色；颜色写在 text 上（uvue 的样式不继承）

## 用法

```vue
<am-icon name="setting" :size="18" color="rgba(0, 0, 0, 0.45)" />
```

摘自示例页 [pages/components/card.uvue](../../pages/components/card.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `string` | - | 必填 |
| `size` | `number` | `16` | - |
| `color` | `string` | `''` | - |

## 事件

没有事件。

## 插槽

没有插槽。

## 与 antdv-next-mobile 的差异

uni 端特有的组件，antdv-next-mobile 里没有对应的公开组件：App 端没有内联 SVG：antdv-next-mobile 用 @antdv-next/icons 的组件，这里用字体图标
