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
        catalog: resolve(root, 'catalog.html'),
        product: resolve(root, 'product-detail.html'),
        faq: resolve(root, 'faq.html'),
        where_buy: resolve(root, 'where-buy.html'),
        blog: resolve(root, 'blog.html'),
        article: resolve(root, 'article.html'),
        contacts: resolve(root, 'contacts.html'),
        about: resolve(root, 'about.html'),
        about_prod: resolve(root, 'about-prod.html'),
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