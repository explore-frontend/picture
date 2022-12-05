# @kwai-explore/picture.vue

用于展示多种图片格式的 picture 组件。

## 安装

`pnpm install @kwai-explore/picture.vue`

## 使用

> 建议配合 (vite-plugin-image-presets) 使用

### 安装 [vite-plugin-image-presets](github.com/ElMassimo/vite-plugin-image-presets)

`pnpm add -D vite-plugin-image-presets`

### 建议配置

`vite.config.ts`

```ts
import imagePresets, { formatPreset } from 'vite-plugin-image-presets';

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
```

根据上面的配置添加类型：

`vite-env.d.ts`

这里的文档需要换一下：理论上应该标记的是自己生成的类型

```ts
declare module '*?preset=modern' {
    type SourceOption = {
        type: string;
        srcset: string;
    };
    type ImgOption = {
        src: string;
        // 这下面的属性需要与 vite config 里的 formatPreset 配置同步修改
        loading: 'lazy';
    };
    type PictureOption = [...SourceOption[], ImgOption];

    const src: PictureOption;
    export default src;
}
```

### 在代码中使用

> Picture 组件接受的属性跟 `img` 相同，唯一的例外是 `src` 接收一个数组，一个例子是

```json
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
  ]
```

在我们配置好 `vite-plugin-image-presets` 之后，可以直接在 import 图片的语句后面加一个 query，产出的数据就是上面需要的格式。

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

vue >= 2.7
