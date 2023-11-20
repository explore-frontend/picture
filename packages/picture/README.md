# @kwai-explore/picture.vue

用于展示多种图片格式的 picture 组件。

## 安装

```shell
pnpm install @kwai-explore/picture.vue
```

## 使用

> 建议配合 [vite-imagetools](https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite) 使用

### 安装

```shell
pnpm add -D vite-imagetools
```

### 建议配置

需要修改图片资源导出的数据结构。

```ts
// vite.config.ts

import { extname } from 'node:path';
import imagePresets, { formatPreset } from 'vite-plugin-image-presets';

export default {
  // ...
  plugins: [
    vue(),
    imagePresets({
      defaultDirectives: (url) => {
        if (url.searchParams.get('preset') === 'modern') {
          return new URLSearchParams({
            format: 'avif;webp;' + extname(url.pathname).slice(1),
            as: 'picture',
          });
        }
        return new URLSearchParams();
      },
    }),
  ],
}
```

```ts
// xxx.d.ts

declare module '*?preset=modern' {
  import type { ImageToolsPictureOption } from '@kwai-explore/picture.vue';
  const src: ImageToolsPictureOption;
  export default src;
}
```

在我们配置好 `vite-imagetools` 之后，可以直接在 import 图片的语句后面加一个 query ，产出的数据就是组件需要的格式。

```vue
<script setup lang="ts">
import Picture from '@kwai-explore/picture';
import examplePic from './components/example.jpg?preset=modern';
</script>

<template>
  <Picture :src="examplePic"></Picture>
</template>
```

### 完整支持的属性

```ts
type PictureProp = {
  src: ImageToolsPictureOption | ImageToolsPictureOptionOld;
  // 默认是empty
  // color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变效果。
  placeholder: 'empty' | 'color';
  // Picture 接收的属性会透传给img元素
} & ImgHTMLAttributes;
```

### 在代码中传入数据

Picture 组件接收的 `src` 数据结构示例：

```js
{
  sources: {
    avif: 'xxx.avif 5304w',
    webp: 'xxx.webp 5304w',
  },
  img: {
    src: 'xxx.jpg',
  }
}
```

### 建议添加 eslint 规则

```js
  'vue/no-restricted-html-elements': [
    'warn',
    {
      element: 'img',
      message: 'Prefer use of our @kwai-explore/picture.vue component',
    },
  ],
```

### 对应的行为

开发环境（`vite dev`）初次请求图片资源时需要进行格式转换，图片的加载时间比较长。

生产环境（`vite build`）会把需要的图片格式都构建出来。

## 兼容性

vue >= 2.7
