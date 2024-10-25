import type { ImgHTMLAttributes } from 'vue';
import type { Picture } from 'vite-imagetools';

/** Picture Props 类型 */
export type PictureProp = {
  src: Picture | FallbackPictureOption;
  /** color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变 */
  placeholder?: 'empty' | 'color';
};

declare const PictureComponent: new () => {
  $props: PictureProp & Omit<ImgHTMLAttributes, 'src'>;
};
export default PictureComponent;

/** 一种需要兼容的fallback图像类型（历史需要） */
export declare type FallbackPictureOption = {
  fallback: { src: string; w?: number } & ImgHTMLAttributes;
  sources: {
    // avif: [{src: 'xxx.avif'}], webp: [{src: xx.webp}]
    [key: string]: { src: string; w?: number }[];
  };
};
