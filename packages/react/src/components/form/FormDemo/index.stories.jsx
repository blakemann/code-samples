import { withReactContext } from 'storybook-react-context';
import FormDemo from './index';
import { FormLoadingContext } from '@/react/contexts';

export default {
  title: 'Demos/FormDemo',
  component: FormDemo,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => <FormDemo {...args} />,
};

export const Primary = {};

export const Loading = {
  decorators: [
    withReactContext({
      context: FormLoadingContext,
      contextValue: true,
    }),
  ],
};
