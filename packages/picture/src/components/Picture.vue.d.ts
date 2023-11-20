import type {ImgHTMLAttributes} from 'vue-demi';

export type SourceOption = {
  type: string;
  srcset: string;
};
export type ImgOption = {
  src: string;
} & SimpleImgHTMLAttributes;

export type ImageToolsPictureOptionImg = {
  src: string;
  w?: number;
} & SimpleImgHTMLAttributes;

// TODO: 封装 provider 来应对不同的接口
/** vite-imagetools 风格的 picture 数据格式 */
export type ImageToolsPictureOption = {
  img: ImageToolsPictureOptionImg;
  // 帮助区分 ImageToolsPictureOptionOld
  fallback: never;
  // avif: 'xxx.avif', webp: 'xx.webp'
  sources: {
    [key: string]: string;
  };
};

// v6.0.0以下
export type ImageToolsPictureOptionOld = {
  // avif: [{src: 'xxx.avif'}], webp: [{src: xx.webp}]({
  sources: {
    [key: string]: {
      src: string;
      w?: number;
    }[];
  };
  img: never;
  fallback: ImageToolsPictureOptionImg;
} | {
  sources: {
    [key: string]: {
      src: string;
      w?: number;
    }[];
  };
  img: ImageToolsPictureOptionImg;
  fallback: never;
};


/** image-prest 风格的 picture 数据格式 */
export type ImagePresetPictureOption = [...SourceOption[], ImgOption];

export type Numberish = number | string;
// todo 以后只支持 vue3 的时候就可以换成vue提供的类型了
export interface SimpleImgHTMLAttributes {
  alt?: string;
  crossorigin?: 'anonymous' | 'use-credentials' | '';
  decoding?: 'async' | 'auto' | 'sync';
  height?: Numberish;
  sizes?: string;
  src?: string;
  srcset?: string;
  usemap?: string;
  width?: Numberish;
  type?: string;
}

export type PictureOption = ImagePresetPictureOption | ImageToolsPictureOption | ImageToolsPictureOptionOld;

// 这里的属性其实也有点奇怪...理论上大部分只需要放在最后一个就可以了
// 其实跟生产端不太一样
export interface PictureProp {
  src: PictureOption;
  // color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变
  placeholder?: 'empty' | 'color';
}

declare const PictureComponent: new () => {
  $props: PictureProp & Omit<ImgHTMLAttributes, 'src'>,
}

export default PictureComponent;
