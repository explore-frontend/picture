# @kwai-explore/picture.vue

用于展示多种图片格式的 picture 组件。

## 安装

```shell
pnpm install @kwai-explore/picture.vue
```

## 使用

> 建议配合 [vite-plugin-image-presets](github.com/ElMassimo/vite-plugin-image-presets) 或 [vite-imagetools](https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite) 使用

### 安装

使用 `vite-plugin-image-presets` ：

```shell
pnpm add -D vite-plugin-image-presets
```

使用 `vite-imagetools` ：

```shell
pnpm add -D vite-imagetools
```

### 建议配置

需要修改图片资源导出的数据结构。

使用 `vite-plugin-image-presets` ：

```ts
// vite.config.ts

import imagePresets, { formatPreset } from 'vite-plugin-image-presets';

export default {
  // ...
  plugins: [
    vue(),
    imagePresets({
      modern: formatPreset({
        formats: {
          avif: {},
          webp: {},
          original: {},
        },
        loading: 'lazy',
      }),
    }),
  ],
}
```

```ts
// xxx.d.ts

declare module '*?preset=modern' {
  import type { ImagePresetPictureOption } from '@kwai-explore/picture.vue';
  const src: ImagePresetPictureOption;
  export default src;
}
```

使用 `vite-imagetools` ：

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

在我们配置好 `vite-plugin-image-presets` 或 `vite-imagetools` 之后，可以直接在 import 图片的语句后面加一个 query ，产出的数据就是组件需要的格式。

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
interface PictureProp {
  src: Array<ImagePresetPictureOption | ImageToolsPictureOption | ImageToolsPictureOptionOld>;
  // 默认是empty。 color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变效果。
  placeholder: 'empty' | 'color';
}
```

### 在代码中使用

Picture 组件接受的属性跟 `img` 相同，唯一的例外是 `src` 接收一个数组，一个例子是

```js
  [{
    type: 'image/webp',
    srcset: '/assets/logo.ffc730c4.webp 48w, /assets/logo.1f874174.webp 96w',
  },
  {
    type: 'image/jpeg',
    srcset: '/assets/logo.063759b1.jpeg 48w, /assets/logo.81d93491.jpeg 96w',
    src: '/assets/logo.81d93491.jpeg',
    class: 'img thumb',
    loading: 'lazy',
  }]
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
