import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reportsDirectory: './.coverage',
      enabled: true,
      include: [
        'packages/**/*',
      ],
      exclude: [
        '**/dist/**',
        '**/vite.config.js',
        '**/vitest.config.js',
        '**/*.stories.js',
        'packages/components/index.js',
        'packages/composables/index.js',
      ],
    },
    reporters: ['html', 'default'],
    outputFile: './.vitest/index.html',
  },
});
