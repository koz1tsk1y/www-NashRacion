import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import autoprefixer from 'autoprefixer';

const root = __dirname;
const outDir = resolve(__dirname, 'dist');

function getHtmlInputs() {
  const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
  const inputs = {};
  files.forEach(f => {
    const name = f.replace(/\.html$/, '');
    inputs[name] = resolve(root, f);
  });
  return inputs;
}

export default defineConfig({
  base: './',
  root,
  css: {
    postcss: {
      plugins: [autoprefixer()]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/scss/abstracts/_variables.scss";
          @import "src/scss/abstracts/_placeholders.scss";
        `
      }
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
      input: getHtmlInputs(),
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) return 'css/[name].[ext]';
          // всё остальное пусть идёт в корень dist
          return '[name].[ext]';
        }
      }
    }
  }
});
