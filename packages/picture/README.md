# @kwai-explore/picture.vue

用于展示多种图片格式的 picture 组件。

## 安装

`pnpm install @kwai-explore/picture.vue`

## 使用

~~建议配合 (vite-plugin-image-presets) 使用~~  
> 0.1.0 版本后，建议配合 `vite-imagetools`

### 安装 [vite-imagetools](https://github.com/JonasKruckenberg/imagetools)

`pnpm add -D vite-imagetools`

### 建议配置

`vite.config.ts`

```ts
import { imagetools } from 'vite-imagetools';
import { extname } from 'node:path';

// ...
export default defineConfig({
  plugins: [
    // ...
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.get('preset') === 'modern') {
          return new URLSearchParams({
            format: 'avif;webp;' + extname(url.pathname).slice(1),
            as: 'picture'
          });
        }
        return new URLSearchParams();
      },
    })
  ],
});
```

根据上面的配置添加类型：

`vite-env.d.ts`

这里的文档需要换一下：理论上应该标记的是自己生成的类型

```ts
declare module '*?preset=modern' {
    type PictureOption =
        | {
              fallback: {
                  src: string;
                  w?: number;
              } & SimpleImgHTMLAttributes;
              sources: {
                  [key: string]: {
                      src: string;
                      w?: number;
                  }[];
              };
          }
        | {
              img: {
                  src: string;
                  w?: number;
                  h?: number;
              };
              sources: {
                  [key: string]: string;
              };
          };

    const src: PictureOption;
    export default src;
}
```

### 在代码中使用

> Picture 组件接受的属性跟 `img` 相同，唯一的例外是 `src` 接收一个对象，一个例子是

```json
// 现在图片数据格式是这样的
{
  img: {src: '/@imagetools/19b8f0e7a78', w: 5304, h: 7952}
  sources: {avif: '/@imagetools/6165531 5304w', webp: '/@imagetools/58dbfda 5304w'}
}
// 还兼容一种callback类型的对象
```

在我们配置好 `vite-imagetools` 之后，可以直接在 import 图片的语句后面加一个 query，产出的数据就是上面需要的格式。

```vue
<script setup lang="ts">
import Picture from '@kwai-explore/picture';
import examplePic from './components/example.jpg?preset=modern';
</script>

<template>
  <Picture :src="examplePic"></Picture>
</template>
```

完整支持的属性

```ts
interface PictureProp {
  src: ImgHTMLAttributes[];
  // 默认是empty。 color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变效果。
  placeholder: 'empty' | 'color';
}
```

### 建议添加 eslint 规则

```
        'vue/no-restricted-html-elements': [
            'warn',
            {
                element: 'img',
                message: 'Prefer use of our @kwai-explore/picture.vue component',
            },
        ],
```

### 对应的行为

开发环境（`vite dev`) 初次请求图片资源时需要进行格式转换，图片的加载时间比较长。

生产环境（`vite build`) 会把需要的图片格式都构建出来。

## 兼容性

vue >= 3.3
