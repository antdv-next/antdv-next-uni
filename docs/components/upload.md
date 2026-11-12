<!-- 本文件由 tools/docs/gen.mjs 生成，请勿手改；改组件源码后重新运行 `node tools/docs/gen.mjs` -->

# am-upload 上传

上传（= antdv-next-mobile 的 Upload，picture-card 形态）：方形缩略图排成网格，最后一格是“+”。v-model:fileList、accept、multiple、maxCount（1 为替换当前的文件）、maxSize（字节）、disabled、action、headers、data、name、customRequest、beforeUpload、beforeRemove、showUploadList、capture、isImageUrl、columns、preview 同名同义；事件 update:fileList、change（{ file, fileList }）、preview（file）、remove（file）、exceed（files, reason）；默认插槽是“+”那一格的内容；方法 chooseFile()、upload(file)、abort(file)。没有 action 也没有 customRequest 时选出来的文件只是收进列表（status 为 done）。它是表单字段：列表变化后通知表单项。

## 用法

```vue
<am-upload v-model:file-list="basic" @change="onChange" @preview="onPreview" @remove="onRemove" />
```

摘自示例页 [pages/components/upload.uvue](../../pages/components/upload.uvue)（片段里用到的变量见该页的 `<script>`）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `fileList` | `AmUploadFile[]` | `[]` | **`v-model:fileList`** |
| `accept` | `string` | `''` | 含 video 时选视频，其余（含空）选图片 |
| `multiple` | `boolean` | `false` | - |
| `maxCount` | `number` | `0` | 最多几个文件，0 为不限；到了以后“+”隐藏；1 时新选的替换当前的 |
| `maxSize` | `number` | `0` | 单个文件的最大字节数，0 为不限；超过的不进列表，由 exceed 报告 |
| `disabled` | `boolean` | `false` | - |
| `action` | `string` | `''` | 上传的地址 |
| `headers` | `UTSJSONObject \| null` | `null` | - |
| `data` | `UTSJSONObject \| null` | `null` | 一起提交的表单数据 |
| `name` | `string` | `'file'` | 文件字段名 |
| `customRequest` | `AmUploadCustomRequest \| null` | `null` | - |
| `beforeUpload` | `AmUploadBeforeUpload \| null` | `null` | - |
| `beforeRemove` | `AmUploadBeforeRemove \| null` | `null` | - |
| `showUploadList` | `boolean` | `true` | - |
| `capture` | `boolean \| string` | `false` | true / 'user' / 'environment'：直接开相机 |
| `isImageUrl` | `AmUploadIsImageUrl \| null` | `null` | 文件是不是按图片显示（默认按 type 与扩展名判断） |
| `columns` | `number` | `4` | 每行几格 |
| `preview` | `boolean` | `true` | 点已完成的图片时打开内置的图片预览 |
| `rootClass` | `string` | `''` | 加在组件根节点上的类名 |

没有写说明的属性与 antdv-next-mobile 的同名属性同义（见下方的差异）。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:fileList` | `(fileList: AmUploadFile[])` | `v-model:fileList` 的更新 |
| `change` | `(info: AmUploadChangeParam)` | { file, fileList } |
| `preview` | `(file: AmUploadFile)` | file |
| `remove` | `(removed)` | file |
| `exceed` | `(oversize, arg2: 'maxSize' \| 'maxCount')` | files, reason |

参数由源码里的 `emit()` 调用推导：名字是实参的写法，没有写类型的是推不出来的。模板里用短横线写法监听（如 `@open-change`）。

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `default` | - | 有默认内容 |

## 方法

通过模板引用调用：`ref<AmUploadComponentPublicInstance | null>(null)`。

| 方法 | 说明 |
| --- | --- |
| `chooseFile()` | - |
| `upload(file: AmUploadFile)` | - |
| `abort(file: AmUploadFile \| null)` | 中止一个文件的上传；传 null 中止全部 |
| `refresh()` | 容器的宽度变化后重新算格子的边长 |

## 与 antdv-next-mobile 的差异

对应 antdv-next-mobile 的同名组件：[https://m.antdv-next.com/components/upload](https://m.antdv-next.com/components/upload)。

与 antdv-next-mobile 的差异（uni-app x 的限制）：

- 选文件用 uni.chooseImage / uni.chooseVideo，不是 `<input type="file">`：`accept` 只分图片与视频（含 video 时选视频，其余选图片；Web 以外没有通用的文件选择），所以也没有 listType="text"；`capture` 非空 / true 时只开相机（选视频时 'user' 为前置摄像头）；`multiple` 只对图片有效（视频一次一个）；
- 文件是本地路径不是 File 对象：AmUploadFile 没有 originFileObj，本地路径在 `path`；exceed 的第一个参数是 AmUploadFile[]；
- 上传用 uni.uploadFile：只能 POST、multipart（没有 method / withCredentials）；`action`、`data` 只能是字符串 / 对象，不能是函数；HTTP 状态码不是 2xx 算失败；
- beforeUpload 必须返回 Promise，不能返回替换用的文件；customRequest 没有返回值（不能 abort）、没有 defaultRequest；
- showUploadList 只有布尔值；没有 previewFile / iconRender（不是图片的文件显示文件图标与文件名；是不是图片默认按 type 与扩展名判断，可用 isImageUrl 改）、itemRender 插槽；没有 defaultFileList（用 v-model:fileList）；
- 格子的边长由量出来的宽度算（没有 CSS grid 与 aspect-ratio）：容器的宽度变化后调用 refresh()

登记在 [tools/parity/known/upload.json](../../tools/parity/known/upload.json) 的接口差异（由 `node tools/parity/check.mjs` 核对）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `defaultFileList` | UTS 里分不出“没传”和空数组，非受控用法请用 v-model:fileList |
| 没有的属性 | `method` | 上传用 uni.uploadFile，只能 POST（multipart/form-data） |
| 没有的属性 | `withCredentials` | uni.uploadFile 没有这个选项（App 端没有跨域与 cookie 的概念） |
| 没有的属性 | `listType` | 只有 picture-card：选文件用 uni.chooseImage / chooseVideo，Web 以外没有通用的文件选择，文字列表用不上 |
| 没有的属性 | `previewFile` | 选出来的是本地路径，图片直接用它当缩略图；uvue 里也没有 File / Blob 可以交给它 |
| 没有的属性 | `iconRender` | 渲染函数无法表达（UTS 里不能把节点放进数据）；非图片文件显示文件图标与文件名 |

所有组件共有的差异（[_common.json](../../tools/parity/known/_common.json)，移动端的这个组件有对应的属性 / 事件时适用）：

| 差异 | 名称 | 原因 |
| --- | --- | --- |
| 没有的属性 | `classes` | 传给子组件内部节点的类在 App 端不生效（子组件自己的样式后加载）；根节点用 rootClass |
| 没有的属性 | `styles` | 内部节点的样式覆盖暂不提供，待确认 App 端对象形式的 style 透传后再加 |
| 没有的属性 | `getContainer` | uni-app x 没有挂到 body 的 Teleport，弹出层就地渲染为 fixed 节点 |
