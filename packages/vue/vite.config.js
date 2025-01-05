import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import jsconfig from './jsconfig.json';

const aliases = Object.entries(jsconfig.compilerOptions.paths).map(([alias, [aliasPath]]) => ({
  find: new RegExp(alias.replace('/*', '/(.*)')),
  replacement: path.resolve(import.meta.dirname, aliasPath.replace('/*', '/$1')),
}));

export default defineConfig({
  base: '/',
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, './index.js'),
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'prefixIds',
            params: {
              delim: '-',
              prefix: () => 'svg',
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: aliases,
  },
  define: {
    global: {},
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: [
      '../../build/vitest/vi.assertions.js',
    ],
  },
});
