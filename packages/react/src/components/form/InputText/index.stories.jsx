import { useArgs } from '@storybook/preview-api';
import { withReactContext } from 'storybook-react-context';
import InputText from './index';
import { FormLoadingContext } from '@/react/contexts';

export default {
  title: 'Components/Form/InputText',
  component: InputText,
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    function onUpdateValue(value) {
      updateArgs({ value });
    }

    return (
      <div style={{ width: '350px' }}>
        <InputText {...args} value={value} onUpdateValue={onUpdateValue} />
      </div>
    );
  },
};

export const Primary = {
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 'Dolor Sit Amet',
    maxlength: 250,
  },
};

export const Error = {
  args: {
    label: 'Lorem Ipsum',
    value: 'Dolor Sit Amet Adipiscing Consectetur',
    maxlength: 25,
    error: 'must not exceed maximum length',
  },
};

export const Disabled = {
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 'Dolor Sit Amet',
    maxlength: 250,
    disabled: true,
  },
};

export const Loading = {
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 'Dolor Sit Amet',
    maxlength: 250,
    loading: true,
  },
  decorators: [
    withReactContext({
      context: FormLoadingContext,
      contextValue: true,
    }),
  ],
};
