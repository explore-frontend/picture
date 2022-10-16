import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import imagePresets, { formatPreset } from 'vite-plugin-image-presets';
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // 类型怎么 copy 出去呢？
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue-demi', 'vue'],
    },
  },
  plugins: [
    vue(),
    libCss(),
    imagePresets({
      modern: formatPreset({
        formats: {
          avif: {},
          webp: {},
          original: {},
        },
        loading: 'lazy',
      }),
    }),
    dts(),
  ],
});
