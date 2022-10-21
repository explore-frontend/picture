import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue2';
import imagePresets, { formatPreset } from 'vite-plugin-image-presets';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: 'es2015',
        minify: 'terser',
    },
    plugins: [
        vue(),
        legacy({
            modernPolyfills: true,
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
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
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
