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

早期阶段（0.1.0）：工程骨架、主题引擎和 6 个组件已完成，其余组件按 antdv-next-mobile 的清单陆续补齐。

| 已完成 | 说明 |
| --- | --- |
| `am-config-provider` | 主题（亮色 / 暗色 / 紧凑、可嵌套）、语言、尺寸、禁用 |
| `am-button` | 颜色 × 变体、尺寸、形状、图标、加载中、幽灵 |
| `am-input` | 四种变体、清除、计数、前后缀、状态、`focus()` |
| `am-list` / `am-list-item` | 单元格列表、卡片模式 |
| `am-popup` | 五个方向、圆角、关闭图标、Android 返回键 |
| `am-icon`、`am-loading` | 字体图标、加载指示器 |

已在 Web、iOS 模拟器上运行，iOS、Android 编译通过；鸿蒙与微信小程序尚未验证。

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

完整的差异清单在 [tools/parity/known-differences.json](./tools/parity/known-differences.json)，
由 `node tools/parity/check.mjs` 自动核对。

## 开发

需要 HBuilderX 5.x（uni-app x 只能由它编译）。命令与约定见 [AGENTS.md](./AGENTS.md)。

## License

[MIT](./LICENSE)
