import { join, dirname } from 'path';

/*
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
  stories: [
    '../**/*.mdx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/preset-scss'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {},
  },
  refs: (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      return {
        vue: {
          title: 'Vue',
          url: 'http://localhost:6016',
        },
        react: {
          title: 'React',
          url: 'http://localhost:6026',
        },
      };
    }
    return {
      vue: {
        title: 'Vue',
        url: 'https://code.blakemann.com/vue-storybook',
      },
      react: {
        title: 'React',
        url: 'https://code.blakemann.com/react-storybook',
      },
    };
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: '../../packages/vue/vite.config.js',
      },
    },
  },
  staticDirs: ['../public'],
};

export default config;
