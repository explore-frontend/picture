import type { ImgHTMLAttributes } from 'vue';
import type { Picture } from 'vite-imagetools';

/**
 * Picture Props 类型
 */
export interface PictureProp {
  src: PictureOption;
  // color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变
  placeholder?: 'empty' | 'color';
}

/**
 * 除了 vite-imagetools 图像格式，还兼容一种 fallback 的格式
 */
export declare type PictureOption =
  | ImageToolsPictureOption
  | ImageTools2PictureOption;

declare const PictureComponent: new () => {
  $props: PictureProp & Omit<ImgHTMLAttributes, 'src'>;
};
export default PictureComponent;

/**
 * vite-imagetools 提供的图片类型
 */
export declare type ImageToolsPictureOption = Picture;

/** 需要兼容的格式 */
export declare type ImageTools2PictureOption = {
  fallback: {
    src: string;
    w?: number;
  } & ImgHTMLAttributes;
  // avif: [{src: 'xxx.avif'}], webp: [{src: xx.webp}]
  sources: {
    [key: string]: {
      src: string;
      w?: number;
    }[];
  };
};
