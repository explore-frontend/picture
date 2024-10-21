# @kwai-explore/picture.vue

用于配合图片压缩插件，展示多种图片格式的 Picture 组件。

## 安装

`pnpm add @kwai-explore/picture.vue`


## 配置 imagetools

### 安装配置插件（推荐）

> Tip: 以前用的是 image-prest 插件，Picture组件也兼容这个插件生成图片对象类型，但是新项目推荐使用 vite-imagetools

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

```ts
declare module "*?preset=modern" {
  const src: import("@kwai-explore/picture.vue").PictureOption;
  export default src;
}
```

## 使用 Picture

```vue
<script setup lang="ts">
import PictureComp from '@kwai-explore/picture.vue';
import examplePic from './components/example.jpg?preset=modern';
</script>

<template>
  <PictureComp :src="examplePic" />
</template>
```
Picture 组件接受的属性跟 `img` 相同，唯一的例外是 `src` 接收一个对象，比如：
```json
{ // vite-imagetools 生成的图片对象
  img: {src: '/@imagetools/19b8f0e7a78', w: 5304, h: 7952}
  sources: {avif: '/@imagetools/6165531 5304w', webp: '/@imagetools/58dbfda 5304w'}
}
```
根据上面配置好 `vite-imagetools` 后，import 图片时后面加一个query：`?preset=modern`，产出的数据就是上面需要的格式。

> 这里取名叫 PictureComp ，是为了避免编辑器搞混 picture 标签（html自带的）

## Picture Props

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
