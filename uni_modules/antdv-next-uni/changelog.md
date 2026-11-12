## 0.1.0（2026-11-12）

首个版本。

- 94 个组件，与 antdv-next-mobile 同名、同属性、同 `v-model`、同主题 token（`--am-*`）
- 全局与局部主题：`setAmTheme()`、`<am-config-provider :theme>`，支持暗色与紧凑算法
- 国际化：`setAmLocale()`，内置 `zhCN`、`enUS`
- 函数式调用：`amMessage` / `amToast`（`utils/message.uts`）、`confirmAmModal`（`utils/modal.uts`）
- 已验证：Web、iOS、Android 编译通过；鸿蒙与微信小程序尚未验证
