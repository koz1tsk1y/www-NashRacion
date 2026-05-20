import {
  defineConfig
} from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import {
  resolve
} from 'path';
import autoprefixer from 'autoprefixer';

const root = resolve(__dirname, '');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  base: './',
  root,
  plugins: [
    injectHTML({}),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  },
  server: {
    open: true,
  },
  build: {
    minify: false,
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      },
      output: {
        entryFileNames: `js/main.js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: ({
          name
        }) => {
          if (name.endsWith('.css')) return 'css/style.css';
          if (name.endsWith('.woff') || name.endsWith('.woff2') || name.endsWith('.ttf')) return 'fonts/[name].[ext]';
          if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.svg')) return 'images/[name].[ext]';
          if (name.endsWith('.mp4') || name.endsWith('.webm')) return 'videos/[name].[ext]';
          return 'assets/[name].[ext]';
        }
      }
    }
  }
});