import type { ImgHTMLAttributes, HTMLAttributes } from 'vue';

/**
 * 主要推荐使用的类型，由 vite-imagetools 生成
 * @see https://github.com/JonasKruckenberg/imagetools/blob/main/docs/interfaces/core_src.Picture.md
 * ```js
 * { // vite-imagetools 生成的图片对象例子
 *   img: {src: '/@imagetools/19b8f0e7a78', w: 5304, h: 7952}
 *   sources: {avif: '/@imagetools/6165531 5304w', webp: '/@imagetools/58dbfda 5304w'}
 * }
 *```
 */
export type ImagetoolsPictureOption = {
  img: { src: string; w: number; h: number };
  sources: Record<string, string>;
};

/** 一种需要兼容的fallback图像类型（历史需要） */
export type FallbackPictureOption = {
  fallback: { src: string; w?: number } & ImgHTMLAttributes;
  sources: {
    // avif: [{src: 'xxx.avif'}], webp: [{src: xx.webp}]
    [key: string]: { src: string; w?: number }[];
  };
};

export type PictureOption = ImagetoolsPictureOption | FallbackPictureOption;

/** Picture Props 类型 */
export type PictureProp = {
  /** @see https://npm.corp.kuaishou.com/-/web/detail/@kwai-explore/picture.vue */
  src: PictureOption;
  /** color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变 */
  placeholder?: 'empty' | 'color';
  /** PictureRootAttrs，由于使用时加的属性会被注入到img元素上，所以这里提供一个给根元素加属性的api */
  rootAttrs?: HTMLAttributes;
};

declare const PictureComponent: new () => {
  $props: PictureProp & Omit<ImgHTMLAttributes, 'src'>;
};
export default PictureComponent;
