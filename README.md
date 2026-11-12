<div align="center">
  <img src="./static/logo.png" width="72" alt="logo" />
  <h1>Antdv Next Uni</h1>
  <p>Component library for <a href="https://doc.dcloud.net.cn/uni-app-x/">uni-app x</a>, with the same component names, props and theme as <a href="https://github.com/antdv-next/antdv-next-mobile">antdv-next-mobile</a>.</p>
  <p>English · <a href="./README.zh-CN.md">中文</a></p>
</div>

One uvue + UTS code base. If you know antdv-next or antdv-next-mobile, you already know this library:

```vue
<am-config-provider :theme="{ algorithm: 'dark', token: { colorPrimary: '#00b96b' } }">
  <am-button type="primary" block text="Open" @click="open = true" />
  <am-popup v-model:open="open" round closable>
    <!-- ... -->
  </am-popup>
</am-config-provider>
```

## Features

- **Aligned with antdv-next-mobile**: the same `am-` tags, props, events and `v-model:open` / `v-model:value`. Every difference is recorded and checked by a script.
- **The same theme tokens**: token names match antdv-next and the CSS variables are `--am-*`. Light, dark and compact algorithms combine, with global and local themes.
- **Native rendering**: written entirely in uvue + UTS with vapor mode on; no WebView on App.
- **94 components**: forms, pickers, overlays, gestures, virtual list, calendar, upload and more.
- **Internationalization**: `zhCN` and `enUS` are built in.
- **Function-style APIs**: `amMessage` / `amToast`, `confirmAmModal`.

## Platforms

| Web | Android | iOS | HarmonyOS | WeChat Mini Program |
| --- | --- | --- | --- | --- |
| Compiles | Compiles, not run on a device | Compiles, run on the simulator | Not verified | Not verified |

This is an early release (0.1.0): most interactions (overlays, gestures, pickers) have not been exercised one by one on a device or simulator yet.

## Install

Requires HBuilderX 5.0 or later. Only uni-app x projects are supported (not uni-app).

1. Copy `uni_modules/antdv-next-uni` into your project's `uni_modules`, or download the archive from [Releases](https://github.com/antdv-next/antdv-next-uni/releases) and unzip it there.
2. Add the easycom rule to `pages.json`:

   ```json
   { "easycom": { "custom": { "^am-(.*)": "@/uni_modules/antdv-next-uni/components/am-$1/am-$1.uvue" } } }
   ```

3. Load the icon font in `onLaunch` of `App.uvue`: `loadAmIcons()` (from `@/uni_modules/antdv-next-uni/utils/icons.uts`).
4. **Wrap every page in `<am-config-provider>`**. App has no `:root`, so the theme variables live on it.

## Theme and locale

```ts
import { setAmTheme } from '@/uni_modules/antdv-next-uni/theme/theme.uts'
import { enUS, setAmLocale } from '@/uni_modules/antdv-next-uni/locale/locale.uts'

// Global theme: every page follows
setAmTheme({ algorithm: ['dark', 'compact'], token: { colorPrimary: '#00b96b', borderRadius: 12 } })
// Global locale
setAmLocale(enUS)
```

For a local theme, pass a config of the same shape to `<am-config-provider :theme>`.

## Components

94 component directories under `uni_modules/antdv-next-uni/components`, and 74 pages in the example app.

| Group | Demo pages (each covers the `am-*` component of the same name and its sub-components) |
| --- | --- |
| General | BackTop, Button, ConfigProvider, FloatButton, FloatButtonGroup, Typography |
| Layout | Divider, Flex, Grid, SafeArea, Space |
| Navigation | Dropdown, IndexBar, NavBar, Pagination, Segmented, SideBar, Steps, TabBar, Tabs |
| Data entry | Calendar, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, InputOTP, NumberKeyboard, Picker, PickerView, Radio, Rate, Select, Selector, Slider, Switch, TimePicker, Upload |
| Data display | Avatar, AvatarGroup, Badge, Card, Carousel, Collapse, Descriptions, Empty, Image, ImagePreview, List, Result, Statistic, Tag, Timeline, VirtualList, Watermark |
| Feedback | ActionSheet, Alert, Drawer, Mask, Modal, NoticeBar, Popover, Popup, Progress, Skeleton, Spin, message / Toast |
| Gestures and others | Affix, FloatingPanel, InfiniteScroll, PullToRefresh, SwipeAction |

All 70 component directories of the first antdv-next-mobile release have a counterpart (Message / Toast are functions in
`utils/message.uts`, Grid is `am-row` / `am-col`, Typography is split into `am-typography-text` / `-title` / `-paragraph`).
Components added to the mobile library later are not implemented yet: ActionBar, Barrage, CollapseTransition, Draggable,
Highlight, LoadingBar, RollingText, ShareSheet, ShimmerText, Signature.

Only in this library: `am-icon`, `am-loading`, `am-picker-popup`, `am-picker-trigger`, `am-typography-base`, `am-space-item`.

## Differences from antdv-next-mobile

The API is kept as close as possible. Every difference comes from a uni-app x limitation, for example:

- Text is a prop: `<am-button text="Submit" />`. Styles do not inherit in uvue, so text in the slot cannot pick up the button's color.
- Render props are strings (an icon name or text) plus a slot of the same name, not nodes.
- No Teleport: overlays render under the page root, and there is no `getContainer`.
- No `classes` / `styles`; use `rootClass` on the root node.
- CSS `gap` has no effect on App: wrap the children of `am-space` / `am-flex` in `am-space-item`, which provides the spacing.

The full list is in [tools/parity/known/](./tools/parity/known/) and is checked by `node tools/parity/check.mjs`.

## Documentation

The docs are written in Chinese for now.

- [Guide](./docs/README.md): getting started, theme, locale, differences from antdv-next-mobile
- [Components](./docs/components/README.md): props, events, slots and methods of every component, generated from source by `tools/docs/gen.mjs`
- Example: the repository root is the example app. Open it in HBuilderX to run it; the home page can search components and switch dark mode and locale.

## Development

HBuilderX 5.x is required, as it is the only compiler for uni-app x. Commands and conventions are in [AGENTS.md](./AGENTS.md).

```bash
node tools/lint.mjs            # static checks: directories, page registration, gap that App ignores, versions
node tools/parity/check.mjs    # props / events parity with antdv-next-mobile
node tools/docs/gen.mjs        # regenerate docs/components (--check only verifies it is up to date)
node tools/release.mjs 0.2.0   # bump the version, run the checks, build dist/antdv-next-uni-0.2.0.zip
```

To release: add the new version's section to `uni_modules/antdv-next-uni/changelog.md`, run `tools/release.mjs <version>`,
compile the three targets, then commit and push the `v<version>` tag. CI creates the GitHub Release with the archive.
Publishing to the DCloud plugin market is done by hand in HBuilderX.

## License

[MIT](./LICENSE)
