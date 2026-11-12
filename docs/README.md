# Antdv Next Uni 文档

`antdv-next-uni` 是 Antdv Next 家族的 [uni-app x](https://doc.dcloud.net.cn/uni-app-x/)（uvue + UTS）组件库，
组件名、属性、`v-model`、事件、主题 token 与 [antdv-next-mobile](https://m.antdv-next.com) 对齐。

## 指南

| 文档 | 内容 |
| --- | --- |
| [快速上手](./guide/getting-started.md) | 安装、easycom、`<am-config-provider>`、加载图标字体 |
| [主题](./guide/theme.md) | `setAmTheme`、`AmThemeConfig`、暗色 / 紧凑算法、token、局部主题、在 UTS 里取主题 |
| [国际化](./guide/locale.md) | `setAmLocale`、`zhCN` / `enUS`、自定义语言包 |
| [与 antdv-next-mobile 的差异](./guide/differences.md) | uni-app x 的限制带来的写法差别、函数式 API |

## 组件

- [组件索引](./components/README.md)：按示例应用首页的分组列出全部组件。
- 每个组件一份文档（`docs/components/<组件>.md`）：说明、用法片段、属性、事件、插槽、方法、与 antdv-next-mobile 的差异。

`docs/components/` 下的文件由脚本从组件源码生成，**不要手改**：

```bash
node tools/docs/gen.mjs            # 重新生成
node tools/docs/gen.mjs --check    # 只检查：与磁盘上的不一致时退出码为 1（CI 用）
```

改了组件的属性、事件、插槽、顶部注释，或者改了 `tools/parity/known/`、示例页、首页的分组之后，都要重新生成并一起提交。
生成器只读本仓库（不需要同级的 antdv-next-mobile），说明文字来自组件 `<script>` 顶部的注释和属性前面的 `/** */`，
所以**文档写得好不好取决于源码里的注释**。

## 示例

仓库根目录就是一个可以用 HBuilderX 直接运行的示例应用，每个组件一页：[pages/components/](../pages/components/)。
文档里的用法片段摘自这些页面。

## 参与开发

约定与 uni-app x 的限制见仓库根目录的 [AGENTS.md](../AGENTS.md)。提交前在本地跑：

```bash
node tools/lint.mjs                # 不依赖 HBuilderX 的静态检查
node tools/docs/gen.mjs --check    # 组件文档是否最新
node tools/parity/check.mjs        # 与 antdv-next-mobile 的接口对齐（需要同级目录有它，或用 MOBILE_DIR 指定）
```

Web、iOS、Android 三端的编译只能用 HBuilderX 在本地做（命令见 AGENTS.md）。
发版用 `node tools/release.mjs <版本号>`：改版本号、跑检查并打包（先在 `uni_modules/antdv-next-uni/changelog.md` 里写好这一版的条目）。
