import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import injectHTML from 'vite-plugin-html-inject';
import autoprefixer from 'autoprefixer';

const root = __dirname;
const outDir = resolve(__dirname, 'dist');

function getHtmlInputs() {
  return fs.readdirSync(root)
    .filter(f => f.endsWith('.html'))
    .reduce((acc, f) => {
      const name = f.replace(/\.html$/, '');
      acc[name] = resolve(root, f);
      return acc;
    }, {});
}

export default defineConfig({
  base: './',
  root,
  plugins: [
    injectHTML(),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  server: {
    open: true,
  },
  build: {
    minify: false,
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlInputs(),
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: assetInfo => {
          const ext = assetInfo.name?.split('.').pop();

          if (ext === 'css') return 'css/[name].[ext]';

          return '[name].[ext]';
        }
      }
    }
  }
});
