import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { imagetools } from 'vite-imagetools';
import { extname } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.get('preset') === 'modern') {
          console.log(extname(url.pathname).slice(1));
          return new URLSearchParams({
            format: 'avif;webp;' + extname(url.pathname).slice(1),
            as: 'picture'
          });
        }
        return new URLSearchParams();
      },
    })
  ],
});
