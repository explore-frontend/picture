import { extname } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { imagetools } from 'vite-imagetools';
import imagePresets, { formatPreset } from 'vite-plugin-image-presets';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // imagePresets({
    //   modern: formatPreset({
    //     formats: {
    //       avif: {},
    //       webp: {},
    //       original: {},
    //     },
    //     loading: 'lazy',
    //   }),
    // }),
    // 验证否兼容vite-imagetools
    imagetools({
        defaultDirectives: (url) => {
          return new URLSearchParams({
              format: 'avif;webp;' + extname(url.pathname).slice(1),
              as: 'picture',
          });
        },
    }),
  ],
});
