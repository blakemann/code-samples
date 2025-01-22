import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import vitest from '@vitest/eslint-plugin';
import { defineConfigWithVueTs, configureVueProject, vueTsConfigs } from '@vue/eslint-config-typescript';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import storybook from 'eslint-plugin-storybook';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

configureVueProject({
  scriptLangs: [
    'ts',
    'js',
  ],
});

export default defineConfigWithVueTs(
  vue.configs['flat/essential'],
  vueTsConfigs.base,
  {
    ignores: [
      '_templates/*',
      '.coverage/*',
      '.github/*',
      '.vitest/*',
      '**/storybook-static/*',
      '**/dist/*',
    ],
  },
  // JS core
  js.configs.recommended,
  // Stylistic
  stylisticJs.configs['all-flat'],
  // Vue
  ...vue.configs['flat/recommended'],
  // Storybook
  ...storybook.configs['flat/recommended'],
  // JSDoc
  jsdoc.configs['flat/recommended'],
  // Import
  importPlugin.flatConfigs.recommended,
  // Vitest
  {
    files: ['**/*.test.js'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  // Custom
  {
    files: ['**/*.{js,ts,mjs,cjs,vue}'],
    plugins: {
      '@typescript': tseslint.plugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        require: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 2022,
      },
    },
    settings: {
      'import/ignore': [
        '@vitejs/plugin-vue',
        'vite',
      ],
    },
    rules: {
      // Core Rules
      'function-paren-newline': 'off',
      'max-classes-per-file': 'off',
      'max-len': 'off',
      'no-bitwise': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-mixed-operators': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-undef': 'off',
      'no-underscore-dangle': 'off',
      'no-unreachable': 'error',
      'no-unused-vars': 'off',
      'no-use-before-define': ['error', {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
      }],
      'object-curly-newline': 'off',
      'one-var': 'off',
      'one-var-declaration-per-line': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'prefer-promise-reject-errors': 'off',
      'prefer-regex-literals': 'off',
      // Stylistic
      '@stylistic/js/quotes': ['error', 'single', { allowTemplateLiterals: true }],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/object-property-newline': 'off',
      '@stylistic/js/space-before-function-paren': 'off',
      '@stylistic/js/multiline-ternary': 'off',
      '@stylistic/js/padded-blocks': 'off',
      '@stylistic/js/indent': ['error', 2, {
        SwitchCase: 1,
      }],
      '@stylistic/js/no-extra-parens': 'off',
      '@stylistic/js/array-element-newline': 'off',
      '@stylistic/js/function-call-argument-newline': 'off',
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/quote-props': ['error', 'as-needed'],
      '@stylistic/js/multiline-comment-style': 'off',
      '@stylistic/js/array-bracket-newline': 'off',
      '@stylistic/js/newline-per-chained-call': 'off',
      // Typescript
      '@typescript/no-unused-vars': ['error'],
      // Vue plugin rules
      'vue/attributes-order': ['error'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase', {
        ignores: ['after-enter', '/([A-Za-z]+:[A-Za-z]+:[A-Za-z]+)$/'],
      }],
      'vue/html-indent': ['error', 2],
      'vue/no-lone-template': 'off',
      'vue/no-unused-components': 'error',
      'vue/no-unused-vars': 'error',
      'vue/no-use-v-if-with-v-for': 'off',
      'vue/no-v-html': 'off',
      'vue/order-in-components': [2, {
        order: [
          ['name', 'delimiters', 'functional', 'model'],
          ['components', 'directives', 'filters'],
          ['parent', 'mixins', 'extends', 'provide', 'inject', 'services'],
          'el',
          'template',
          'props',
          'propsData',
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          'render',
          'renderError',
        ],
      }],
      'vue/require-component-is': 'off',
      'vue/require-v-for-key': 'off',
      'vue/script-indent': ['error', 2, {
        baseIndent: 1,
        switchCase: 1,
      }],
      'vue/v-on-event-hyphenation': ['error', 'always', {
        ignore: ['update:modelValue'],
      }],
      // Import plugin rules
      'import/extensions': ['error', {
        js: 'never',
        ts: 'never',
        vue: 'always',
        json: 'always',
        svg: 'always',
      }],
      'import/no-extraneous-dependencies': [
        'error', { devDependencies: true },
      ],
      'import/no-named-default': 0,
      'import/no-unresolved': 'off',
      'import/order': 2,
      'import/prefer-default-export': 'off',
      'import/named': 'off',
      // Jsdoc plugin rules
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/tag-lines': 'off',
      'jsdoc/check-types': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      '@stylistic/js/indent': 'off',
    },
  },
);
