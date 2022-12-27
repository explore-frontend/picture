/** vite-imagetools 风格的 picture 数据格式 */
export type ImageToolsPictureOption = {
  fallback: {
    src: string;
    w?: number;
  } & SimpleImgHTMLAttributes;
  // avif: [{src: 'xxx.avif'}], webp: [{src: xx.webp}]
  sources: {
    [key: string]: {
      src: string;
      w?: number;
    }[];
  };
};



export type SourceOption = {
  type: string;
  srcset: string;
};
export type ImgOption = {
  src: string;
} & SimpleImgHTMLAttributes;

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

export type PictureOption = ImagePresetPictureOption | ImageToolsPictureOption;
