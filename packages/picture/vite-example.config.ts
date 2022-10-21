import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import imagePresets, { formatPreset } from 'vite-plugin-image-presets';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
  ],
  build: {
    outDir: 'dist-example',
  },
});
