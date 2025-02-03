import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgLoader from 'vite-plugin-svgr';

import tsconfig from '../../tsconfig.json';

const aliases = Object.entries(tsconfig.compilerOptions.paths).map(([alias, [aliasPath]]) => ({
  find: new RegExp(alias.replace('/*', '/(.*)')),
  replacement: path.resolve(import.meta.dirname, aliasPath.replace('./packages/react/', './').replace('/*', '/$1')),
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
    react(),
    svgLoader({
      svgrOptions: {
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
