import './preview.scss';

window.Storybook = true;

const parameters = {
  layout: 'centered',
  options: {
    storySort: {
      order: ['Introduction', 'Demos', 'Components'],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

const decorators = [
  // Layout parameter
  (Story, config) => {
    document.body.classList.add('c-app');
    document.body.classList.remove('c-app--theme-dark', 'sb-custom-fullscreen', 'sb-custom-padded', 'sb-custom-centered', 'sb-custom-centered--full');
    switch (config.parameters?.layout) {
      case 'fullscreen':
        document.body.classList.add('sb-custom-fullscreen');
        break;
      case 'padded':
        document.body.classList.add('sb-custom-padded');
        break;
      case 'centered-full':
        document.body.classList.add('sb-custom-centered', 'sb-custom-centered--full');
        break;
      case 'centered':
      default:
        document.body.classList.add('sb-custom-centered');
        break;
    }
    return Story();
  },
];

export default {
  parameters,
  decorators,
};
