// 这里只导出可能给用户用的
export type {
  /**
   * Picture组件 src属性接受的图片类型
   * 其实就是 ImageToolsPictureOption | ImageTools2PictureOption
   */
  PictureOption,
  /** vite-imagetools 生成的类型 */
  ImageToolsPictureOption,
  /** 一种需要兼容的fallback图像类型（历史需要） */
  ImageTools2PictureOption,
} from './dist/Picture.vue.d.ts';
