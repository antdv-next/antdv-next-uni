<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-space-item 间距项

间距项：`<am-space>` / `<am-flex gap>` 的直接子元素的包装。

antdv-next-mobile 没有这个组件（那边容器会自动给每个子元素包一层）。这里需要它是因为 App 端的运行时不支持 CSS `gap`，容器也包不了插槽里的子元素：

```vue
<am-space>
  <am-space-item><am-button text="确定" /></am-space-item>
  <am-space-item><am-button text="取消" /></am-space-item>
</am-space>
```

它按所在容器的间距给自己加外边距（横向加在右边，纵向加在下边；最后一项不加；换行时右边和下边都加）。Web 端容器的 `gap` 有效，这里就不加外边距，两端的排版一致。只编译到 Web 时可以不用它。

## 用法

```vue
<am-space-item>
  <am-button type="primary" text="主按钮" />
</am-space-item>
```

摘自示例页 [pages/components/space.uvue](../../pages/components/space.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `grow` | `boolean` | `false` | 在主轴上占满剩余空间（flex: 1） |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

## 事件

没有事件。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | - |

## 与 antdv-next-mobile 的差异

uni 端特有的组件，antdv-next-mobile 里没有对应的公开组件：App 端的运行时不支持 CSS gap，容器也包不了插槽里的子元素：间距由这个包装组件自己加外边距（移动端库里容器会自动包一层）
