import type {ImgHTMLAttributes} from 'vue-demi'
export declare type SourceOption = {
    type: string;
    srcset: string;
};
export declare type ImgOption = {
    src: string;
} & SimpleImgHTMLAttributes;
/** vite-imagetools 风格的 picture 数据格式 */
export declare type ImageToolsPictureOption = {
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
};
/** image-prest 风格的 picture 数据格式 */
export declare type ImagePresetPictureOption = [...SourceOption[], ImgOption];
export declare type Numberish = number | string;
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

export declare type PictureOption = ImagePresetPictureOption | ImageToolsPictureOption;

export interface PictureProp {
    src: PictureOption;
    // color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变
    placeholder?: 'empty' | 'color';
  }

declare const PictureComponent: new () => {
    $props: PictureProp & Omit<ImgHTMLAttributes, 'src'>,
}

export default PictureComponent;
