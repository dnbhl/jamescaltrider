import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/jamescaltrider/',
  plugins: [
    react(),
    {
      name: 'base-asset-prefix',
      transform(code, id) {
        if (id.includes('/src/') && (id.endsWith('.tsx') || id.endsWith('.ts'))) {
          return {
            code: code
              .replace(/(['"])\/images\//g, '$1/jamescaltrider/images/')
              .replace(/(['"])\/video\//g, '$1/jamescaltrider/video/'),
            map: null,
          };
        }
      },
    },
  ],
  build: {
    target: 'es2019',
    cssMinify: true,
    sourcemap: false,
  },
});
