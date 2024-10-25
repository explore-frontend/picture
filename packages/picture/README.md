# @kwai-explore/picture.vue

用于配合图片压缩插件，展示多种图片格式的 Picture 组件。

## 安装

`pnpm add @kwai-explore/picture.vue`


## 配置 imagetools

### 安装配置插件

> Tip: 以前用的是 image-prest 现在使用 vite-imagetools 插件

1. 建议配合 [vite-imagetools](https://github.com/JonasKruckenberg/imagetools) 使用
`pnpm add -D vite-imagetools`

2. 配置插件：修改 `vite.config.ts`

```ts
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    // ...
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.get('preset') === 'modern') {
          return new URLSearchParams({
            format: 'avif;webp;' + url.pathname.substring(url.pathname.lastIndexOf('.') + 1),
            as: 'picture'
          });
        }
        return new URLSearchParams();
      },
    })
  ],
});
```

3. 根据上面的配置添加全局类型： `vite-env.d.ts`

这里的类型就是图片转换插件的输出类型，Picture组件已经定义好了  
这一步是避免ts报错

```ts
declare module '*?preset=modern' {
  const src: import('vite-imagetools').Picture;
  export default src;
}
```

## 使用 Picture

```html
<script setup lang="ts">
import Picture from '@kwai-explore/picture.vue';
import examplePic from './components/example.jpg?preset=modern';
</script>

<template>
  <Picture :src="examplePic" placeholder="color" />
</template>
```

Picture 组件接受的属性跟 `img` 相同，唯一的例外是 `src` 接收一个对象，如：
```js
{ // vite-imagetools 生成的图片对象
  img: {src: '/@imagetools/19b8f0e7a78', w: 5304, h: 7952}
  sources: {avif: '/@imagetools/6165531 5304w', webp: '/@imagetools/58dbfda 5304w'}
}
```
根据上面配置好 `vite-imagetools` 后，import 图片时后面加一个query：`?preset=modern`，产出的数据就是这样的。

## Picture Props

```ts
type PictureProp = {
  src: Picture | FallbackPictureOption;
  /** color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变 */
  placeholder: 'empty' | 'color';
} & Omit<ImgHTMLAttributes, 'src'>
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

开发环境（`vite dev`) 初次请求图片资源时需要进行格式转换，图片的加载时间比较长。  
生产环境（`vite build`) 会把需要的图片格式都构建出来。

## 兼容性

vue >= 3.3
