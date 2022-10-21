/// <reference types="vite/client" />

declare module '*?preset=modern' {
    const src: import('vue/types/jsx').ImgHTMLAttributes[];
    export default src;
}
