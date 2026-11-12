<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# 组件

共 94 个组件，分组与示例应用首页（[pages/index/index.uvue](../../pages/index/index.uvue)）相同。每个组件的文档由 `node tools/docs/gen.mjs` 从源码生成。

## 通用

| 组件 | 名称 | 说明 |
| --- | --- | --- |
| [am-back-top](./back-top.md) | BackTop 回到顶部 | 页面滚过 visibilityHeight 之后出现的悬浮按钮，点击滚回顶部 |
| [am-button](./button.md) | Button 按钮 | - |
| [am-config-provider](./config-provider.md) | ConfigProvider 全局化配置 | - |
| [am-float-button](./float-button.md) | FloatButton 悬浮按钮 | 固定在右下角（距右 24、距底 48 + 底部安全区域） |
| [am-float-button-group](./float-button-group.md) | FloatButtonGroup 悬浮按钮组 | 固定在右下角的一组 `<am-float-button>`（放在默认插槽里） |
| [typography.uvue](../../pages/components/typography.uvue) | Typography 排版 | 示例页演示的组件：[am-typography-paragraph](./typography-paragraph.md)、[am-typography-text](./typography-text.md)、[am-typography-title](./typography-title.md) |

## 布局

| 组件 | 名称 | 说明 |
| --- | --- | --- |
| [am-divider](./divider.md) | Divider 分割线 | - |
| [am-flex](./flex.md) | Flex 弹性布局 | - |
| [grid.uvue](../../pages/components/grid.uvue) | Grid 栅格 | 示例页演示的组件：[am-col](./col.md)、[am-row](./row.md) |
| [am-safe-area](./safe-area.md) | SafeArea 安全区 | - |
| [am-space](./space.md) | Space 间距 | 给一排（或一列）子元素之间留出相同的间距 |

## 导航

| 组件 | 名称 | 说明 |
| --- | --- | --- |
| [am-dropdown](./dropdown.md) | Dropdown 下拉菜单 | 一条筛选栏，每个 `<am-dropdown-item>` 是栏上的一个标题，点开后在栏的下方展开面板 |
| [am-index-bar](./index-bar.md) | IndexBar 索引栏 | 通讯录、城市、品牌这类按首字母分组的长列表 |
| [am-nav-bar](./nav-bar.md) | NavBar 导航栏 | - |
| [am-pagination](./pagination.md) | Pagination 分页 | - |
| [am-segmented](./segmented.md) | Segmented 分段控制器 | - |
| [am-side-bar](./side-bar.md) | SideBar 侧边导航 | 分类页左侧的竖向导航，右侧放对应的内容 |
| [am-steps](./steps.md) | Steps 步骤条 | - |
| [am-tab-bar](./tab-bar.md) | TabBar 标签栏 | 页面底部的一级导航 |
| [am-tabs](./tabs.md) | Tabs 标签页 | - |

## 数据录入

| 组件 | 名称 | 说明 |
| --- | --- | --- |
| [am-calendar](./calendar.md) | Calendar 日历 | 上下滚动的月历，选一天、一段日期或多个日期 |
| [am-cascader](./cascader.md) | Cascader 级联选择 | 触发区 + 底部弹层，上方是已选各级的标签，下方是当前一级的列表，逐级点选 |
| [am-checkbox](./checkbox.md) | Checkbox 多选框 | - |
| [am-date-picker](./date-picker.md) | DatePicker 日期选择器 | 触发区 + 底部弹层 + 滚轮，点“确定”才提交 |
| [am-form](./form.md) | Form 表单 | - |
| [input-more.uvue](../../pages/components/input-more.uvue) | Input 文本域 / 搜索 / 密码 | 示例页演示的组件：[am-input-password](./input-password.md)、[am-input-search](./input-search.md)、[am-textarea](./textarea.md) |
| [am-input](./input.md) | Input 输入框 | - |
| [am-input-number](./input-number.md) | InputNumber 数字输入框 | - |
| [am-input-otp](./input-otp.md) | InputOTP 一次性密码框 | 验证码、支付密码那种一格一个字符的输入 |
| [am-number-keyboard](./number-keyboard.md) | NumberKeyboard 数字键盘 | 从屏幕底部滑出来的数字键盘，没有遮罩，页面照常可以点 |
| [am-picker](./picker.md) | Picker 选择器 | 触发区 + 底部弹层 + 滚轮，点“确定”才提交 |
| [am-picker-view](./picker-view.md) | PickerView 选择器视图 | - |
| [am-radio](./radio.md) | Radio 单选框 | - |
| [am-rate](./rate.md) | Rate 评分 | - |
| [am-select](./select.md) | Select 选择器 | 触发区 + 底部弹层的选项列表 |
| [am-selector](./selector.md) | Selector 选择组 | 把选项平铺成一组方块，点击选中，适合选项不多的单选 / 多选 |
| [am-slider](./slider.md) | Slider 滑动输入条 | - |
| [am-switch](./switch.md) | Switch 开关 | - |
| [am-time-picker](./time-picker.md) | TimePicker 时间选择器 | 触发区 + 底部弹层 + 滚轮，点“确定”才提交 |
| [am-upload](./upload.md) | Upload 上传 | 方形缩略图排成网格，最后一格是“+” |

## 数据展示

| 组件 | 名称 | 说明 |
| --- | --- | --- |
| [am-avatar](./avatar.md) | Avatar 头像 | - |
| [am-avatar-group](./avatar-group.md) | AvatarGroup 头像组 | 一排互相压着一点的头像 |
| [am-badge](./badge.md) | Badge 徽标数 | - |
| [am-card](./card.md) | Card 卡片 | - |
| [am-carousel](./carousel.md) | Carousel 走马灯 | - |
| [am-collapse](./collapse.md) | Collapse 折叠面板 | - |
| [am-descriptions](./descriptions.md) | Descriptions 描述列表 | - |
| [am-empty](./empty.md) | Empty 空状态 | - |
| [am-image](./image.md) | Image 图片 | - |
| [am-image-preview](./image-preview.md) | ImagePreview 图片预览 | 全屏的黑色图层，左右滑动翻页 |
| [am-list](./list.md) | List 列表 | 移动端最常用的单元格列表 |
| [am-result](./result.md) | Result 结果 | - |
| [am-statistic](./statistic.md) | Statistic 统计数值 | - |
| [am-tag](./tag.md) | Tag 标签 | - |
| [am-timeline](./timeline.md) | Timeline 时间轴 | - |
| [am-virtual-list](./virtual-list.md) | VirtualList 虚拟列表 | 上万条数据的长列表，只渲染屏幕附近的项 |
| [am-watermark](./watermark.md) | Watermark 水印 | 在默认插槽的内容上盖一层不挡操作的水印 |

## 反馈

| 组件 | 名称 | 说明 |
| --- | --- | --- |
| [am-action-sheet](./action-sheet.md) | ActionSheet 动作面板 | 底部弹出的一组操作 + 取消 |
| [am-alert](./alert.md) | Alert 警告提示 | - |
| [am-drawer](./drawer.md) | Drawer 抽屉 | - |
| [am-mask](./mask.md) | Mask 背景蒙层 | 铺满屏幕的半透明层，内容放在默认插槽里 |
| [am-modal](./modal.md) | Modal 对话框 | - |
| [am-notice-bar](./notice-bar.md) | NoticeBar 通告栏 | 页面顶部的一行提示，文字放不下时横向滚动 |
| [am-popover](./popover.md) | Popover 气泡卡片 | 点触发元素，在它旁边弹出一个带箭头的气泡 |
| [am-popup](./popup.md) | Popup 弹出层 | - |
| [am-progress](./progress.md) | Progress 进度条 | - |
| [am-skeleton](./skeleton.md) | Skeleton 骨架屏 | - |
| [am-spin](./spin.md) | Spin 加载中 | - |
| [message.uvue](../../pages/components/message.uvue) | message / Toast 全局提示 | 没有对应的组件（函数式 API 见 [指南](../guide/differences.md)） |

## 手势与其他

| 组件 | 名称 | 说明 |
| --- | --- | --- |
| [am-affix](./affix.md) | Affix 固钉 | 内容滚出屏幕时把它钉在顶部（或底部） |
| [am-floating-panel](./floating-panel.md) | FloatingPanel 浮动面板 | 贴在底部、可以在几个高度之间拖动的面板（地图、播放列表那种） |
| [am-infinite-scroll](./infinite-scroll.md) | InfiniteScroll 无限滚动 | 列表内容放在默认插槽，组件在下面画加载状态，滚到离底部不到 threshold 时发出 load |
| [am-pull-to-refresh](./pull-to-refresh.md) | PullToRefresh 下拉刷新 | - |
| [am-swipe-action](./swipe-action.md) | SwipeAction 滑动操作 | 左滑露出右侧的按钮、右滑露出左侧的按钮 |

## 其他 / 子组件

没有同名示例页的组件：子组件、内部组件与 uni 端特有的组件。

| 组件 | 名称 | 示例页 |
| --- | --- | --- |
| [am-checkable-tag](./checkable-tag.md) | 可选中的标签 | [tag.uvue](../../pages/components/tag.uvue) |
| [am-checkbox-group](./checkbox-group.md) | 多选组 | [checkbox.uvue](../../pages/components/checkbox.uvue) |
| [am-col](./col.md) | 栅格列 | [grid.uvue](../../pages/components/grid.uvue) |
| [am-dropdown-item](./dropdown-item.md) | 下拉菜单的一项 | [dropdown.uvue](../../pages/components/dropdown.uvue) |
| [am-form-item](./form-item.md) | 表单项 | [form.uvue](../../pages/components/form.uvue) |
| [am-icon](./icon.md) | 图标（uni 端特有） | [card.uvue](../../pages/components/card.uvue) |
| [am-index-bar-anchor](./index-bar-anchor.md) | 索引栏的锚点 | [index-bar.uvue](../../pages/components/index-bar.uvue) |
| [am-input-password](./input-password.md) | 密码框 | [input-more.uvue](../../pages/components/input-more.uvue) |
| [am-input-search](./input-search.md) | 搜索框 | [input-more.uvue](../../pages/components/input-more.uvue) |
| [am-list-item](./list-item.md) | 列表项 | [list.uvue](../../pages/components/list.uvue) |
| [am-loading](./loading.md) | 加载指示器（uni 端特有） | [pull-to-refresh.uvue](../../pages/components/pull-to-refresh.uvue) |
| [am-picker-popup](./picker-popup.md) | 选择类字段的弹层（uni 端特有） | - |
| [am-picker-trigger](./picker-trigger.md) | 选择类字段的触发区（uni 端特有） | - |
| [am-radio-group](./radio-group.md) | 单选组 | [radio.uvue](../../pages/components/radio.uvue) |
| [am-row](./row.md) | 栅格行 | [grid.uvue](../../pages/components/grid.uvue) |
| [am-space-addon](./space-addon.md) | 紧凑组合里的附加块 | [space.uvue](../../pages/components/space.uvue) |
| [am-space-compact](./space-compact.md) | 紧凑组合 | [space.uvue](../../pages/components/space.uvue) |
| [am-space-item](./space-item.md) | 间距项（uni 端特有） | [space.uvue](../../pages/components/space.uvue) |
| [am-statistic-timer](./statistic-timer.md) | 计时器 | [statistic.uvue](../../pages/components/statistic.uvue) |
| [am-textarea](./textarea.md) | 多行输入 | [input-more.uvue](../../pages/components/input-more.uvue) |
| [am-typography-base](./typography-base.md) | 排版的公共实现（uni 端特有） | - |
| [am-typography-paragraph](./typography-paragraph.md) | 段落 | [typography.uvue](../../pages/components/typography.uvue) |
| [am-typography-text](./typography-text.md) | 文本 | [typography.uvue](../../pages/components/typography.uvue) |
| [am-typography-title](./typography-title.md) | 标题 | [typography.uvue](../../pages/components/typography.uvue) |
