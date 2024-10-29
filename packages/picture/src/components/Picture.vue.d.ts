import type { ImgHTMLAttributes } from 'vue';

/** Picture Props 类型 */
export type PictureProp = {
  src: PictureOption;
  /** color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变 */
  placeholder?: 'empty' | 'color';
};

/** 
 * 主要推荐使用的类型，由 vite-imagetools 生成
 * @see https://github.com/JonasKruckenberg/imagetools/blob/main/docs/interfaces/core_src.Picture.md
 */
export type ImagetoolsPictureOption = {
  sources: Record<string, string>;
  img: {
      src: string;
      w: number;
      h: number;
  };
}

/** 一种需要兼容的fallback图像类型（历史需要） */
export type FallbackPictureOption = {
  fallback: { src: string; w?: number } & ImgHTMLAttributes;
  sources: {
    // avif: [{src: 'xxx.avif'}], webp: [{src: xx.webp}]
    [key: string]: { src: string; w?: number }[];
  };
};

export type PictureOption = ImagetoolsPictureOption | FallbackPictureOption;

declare const PictureComponent: new () => {
  $props: PictureProp & Omit<ImgHTMLAttributes, 'src'>;
};
export default PictureComponent;
