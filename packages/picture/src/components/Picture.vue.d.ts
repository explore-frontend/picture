import type {ImgHTMLAttributes} from 'vue-demi'

export declare type Numberish = number | string;
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

export declare type SourceOption = {
    type: string;
    srcset: string;
};
export declare type ImgOption = {
    src: string;
} & SimpleImgHTMLAttributes;

// TODO: 封装 provider 来应对不同的接口
/** vite-imagetools 风格的 picture 数据格式 */
export declare type ImageToolsPictureOption = {
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
} |
/**
 * 现在的数据格式是这样的
 * img: {src: '/@imagetools/19b8f0e7a78', w: 5304, h: 7952}
 * sources: {avif: '/@imagetools/6165531 5304w', webp: '/@imagetools/58dbfda 5304w'}
 */
{
  img: {
    src: string;
    w?: number;
    h?: number;
  };
  sources: {
    [key: string]: string;
  };
}


export declare type PictureOption = ImageToolsPictureOption;

export interface PictureProp {
    src: PictureOption;
    // color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变
    placeholder?: 'empty' | 'color';
  }

declare const PictureComponent: new () => {
    $props: PictureProp & Omit<ImgHTMLAttributes, 'src'>,
}

export default PictureComponent;
