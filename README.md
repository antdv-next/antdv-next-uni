<div align="center">
  <img src="./static/logo.png" width="72" alt="logo" />
  <h1>Antdv Next Uni</h1>
  <p><a href="https://doc.dcloud.net.cn/uni-app-x/">uni-app x</a> 组件库，与 <a href="https://github.com/antdv-next/antdv-next-mobile">antdv-next-mobile</a> 同名、同属性、同主题。</p>
</div>

一套 uvue + UTS 代码编译到 Android、iOS、鸿蒙、Web 与微信小程序。会用 antdv-next 或 antdv-next-mobile 就会用它：

```vue
<am-config-provider :theme="{ algorithm: 'dark', token: { colorPrimary: '#00b96b' } }">
  <am-button type="primary" block text="打开" @click="open = true" />
  <am-popup v-model:open="open" round closable>
    <!-- ... -->
  </am-popup>
</am-config-provider>
```

## 状态

早期阶段（0.1.0）：72 个组件，覆盖 antdv-next-mobile 70 个组件目录中的 51 个，其余 19 个（Space、Calendar、Upload、
ImagePreview、Popover、NoticeBar、TabBar、SideBar、Selector、NumberKeyboard、FloatingPanel、VirtualList、Mask、
Affix、Watermark 等）尚未实现。

| 分组 | 组件 |
| --- | --- |
| 通用 | `am-button`、`am-float-button`、`am-typography-text` / `-title` / `-paragraph`、`am-icon`、`am-config-provider` |
| 布局 | `am-divider`、`am-flex`、`am-row` / `am-col`、`am-safe-area` |
| 导航 | `am-nav-bar`、`am-tabs`、`am-steps`、`am-segmented`、`am-pagination`、`am-dropdown` / `am-dropdown-item`、`am-index-bar` / `am-index-bar-anchor` |
| 数据录入 | `am-form` / `am-form-item`、`am-input`、`am-textarea`、`am-input-search`、`am-input-password`、`am-input-number`、`am-checkbox` / `-group`、`am-radio` / `-group`、`am-switch`、`am-rate`、`am-slider`、`am-picker`、`am-picker-view`、`am-date-picker`、`am-time-picker`、`am-select`、`am-cascader` |
| 数据展示 | `am-avatar`、`am-badge`、`am-tag` / `am-checkable-tag`、`am-card`、`am-collapse`、`am-descriptions`、`am-empty`、`am-image`、`am-carousel`、`am-list` / `am-list-item`、`am-statistic` / `am-statistic-timer`、`am-timeline` |
| 反馈 | `am-alert`、`am-modal`、`am-drawer`、`am-popup`、`am-action-sheet`、`am-progress`、`am-result`、`am-skeleton`、`am-spin`、`am-loading`，以及 `amMessage` / `amToast`（`utils/message.uts`）、`confirmAmModal`（`utils/modal.uts`） |
| 手势 | `am-pull-to-refresh`、`am-infinite-scroll`、`am-swipe-action` |

验证情况：Web、iOS、Android 三端编译通过；Web 端全部文件无类型警告；在 iOS 模拟器上打开过首页、Button、Form、Tabs、
PickerView、Badge 等页面。多数组件的交互（弹层、手势、选择器）还没有在真机或模拟器上逐个点过；Android 未实机运行，
鸿蒙与微信小程序未验证。

## 使用

1. 把 `uni_modules/antdv-next-uni` 复制到项目的 `uni_modules` 下。
2. `pages.json` 加 easycom 规则：

   ```json
   { "easycom": { "custom": { "^am-(.*)": "@/uni_modules/antdv-next-uni/components/am-$1/am-$1.uvue" } } }
   ```

3. `App.uvue` 的 `onLaunch` 里加载图标字体：`loadAmIcons()`（`@/uni_modules/antdv-next-uni/utils/icons.uts`）。
4. **每个页面的根节点用 `<am-config-provider>`**（App 端没有 `:root`，主题变量写在它上面）。

## 主题

token 与 antdv-next、antdv-next-mobile 同名，CSS 变量同为 `--am-*`：

```ts
import { setAmTheme } from '@/uni_modules/antdv-next-uni/theme/theme.uts'

// 全局主题：所有页面一起变
setAmTheme({ algorithm: ['dark', 'compact'], token: { colorPrimary: '#00b96b', borderRadius: 12 } })
```

局部主题给 `<am-config-provider :theme>` 传同样结构的配置。

## 与 antdv-next-mobile 的差异

接口尽量一致，差异都来自 uni-app x 的限制，例如：

- 文字属性化：`<am-button text="提交" />`（uvue 的样式不继承，插槽里的文字拿不到按钮的颜色）。
- 渲染类属性是字符串（图标名或文字）加同名插槽，不是节点。
- 没有 Teleport：弹出层放在页面根节点下；没有 `getContainer`。
- 没有 `classes` / `styles`，根节点用 `rootClass`。

完整的差异清单在 [tools/parity/known/](./tools/parity/known/)，
由 `node tools/parity/check.mjs` 自动核对。

## 开发

需要 HBuilderX 5.x（uni-app x 只能由它编译）。命令与约定见 [AGENTS.md](./AGENTS.md)。

## License

[MIT](./LICENSE)
