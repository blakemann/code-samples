import '../../../build/storybook/.storybook/preview.scss';
import preview from '../../../build/storybook/.storybook/preview';

window.Storybook = true;

const parameters = {
  layout: 'centered',
  options: {
    storySort: {
      order: ['Demos', 'Components'],
    },
  },
};

export default {
  parameters: parameters,
  decorators: preview.decorators,
};
