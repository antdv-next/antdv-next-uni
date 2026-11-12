# antdv-next-uni

Antdv Next 的 uni-app x 组件库（uvue + UTS）。与 [antdv-next-mobile](https://m.antdv-next.com) 同名、同属性、
同 `v-model`、同主题 token，一套代码编译到 Android、iOS 与 Web。

## 使用

1. 把本插件导入项目（或把 `antdv-next-uni` 目录放到项目的 `uni_modules/` 下）。需要 HBuilderX 5.0 以上。
2. 组件以 `am-` 开头，easycom 自动注册，不需要 import。
3. 在 `App.uvue` 里加载一次图标字体，页面最外层包一层 `<am-config-provider>`：

```vue
<!-- App.uvue -->
<script setup lang="uts">
import { loadAmIcons } from '@/uni_modules/antdv-next-uni/utils/icons.uts'

onLaunch(() => {
	loadAmIcons()
})
</script>
```

```vue
<!-- 页面 -->
<template>
	<am-config-provider>
		<am-button type="primary" text="按钮" @click="open = true" />
		<am-popup v-model:open="open" placement="bottom">
			<text>内容</text>
		</am-popup>
	</am-config-provider>
</template>
```

## 主题与语言

```ts
import { setAmTheme } from '@/uni_modules/antdv-next-uni/theme/theme.uts'
import { enUS, setAmLocale } from '@/uni_modules/antdv-next-uni/locale/locale.uts'

setAmTheme({ algorithm: 'dark', token: { colorPrimary: '#00b96b' } })
setAmLocale(enUS)
```

## 文档

- 指南、每个组件的属性 / 事件 / 插槽、与 antdv-next-mobile 的差异：<https://github.com/antdv-next/antdv-next-uni/tree/main/docs>
- 示例：仓库根目录就是一个可以直接运行的 HBuilderX 项目，每个组件一个页面（`pages/components/`）

## 平台

| Web | Android | iOS | 鸿蒙 | 微信小程序 |
| --- | --- | --- | --- | --- |
| 编译通过 | 编译通过 | 编译通过，模拟器运行过 | 未验证 | 未验证 |

## License

MIT
