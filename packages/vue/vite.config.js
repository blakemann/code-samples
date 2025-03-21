import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import tsconfig from '../../tsconfig.json';

const aliases = Object.entries(tsconfig.compilerOptions.paths).map(([alias, [aliasPath]]) => {
  const packages = [
    { name: 'vue', replace: './packages/vue', path: './' },
    { name: 'shared', replace: './packages/shared', path: '../shared/' },
    { name: 'build', replace: './build', path: '../../build/' },
  ];
  const pkg = packages.find(({ name }) => new RegExp(`@/${name}`).test(alias)) || { name: 'unknown', path: './' };
  return {
    find: new RegExp(alias.replace('/*', '/(.*)')),
    replacement: path.resolve(import.meta.dirname, aliasPath.replace(pkg.replace, pkg.path).replace('/*', '/$1')),
  };
});

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
