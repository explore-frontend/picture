import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.get('preset') === 'modern') {
          return new URLSearchParams({
            format: 'avif;webp;' + url.pathname.substring(url.pathname.lastIndexOf('.') + 1),
            as: 'picture'
          });
        }
        return new URLSearchParams();
      },
    })
  ],
});
