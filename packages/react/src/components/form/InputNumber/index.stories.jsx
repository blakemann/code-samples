import { useArgs } from '@storybook/preview-api';
import { withReactContext } from 'storybook-react-context';
import InputNumber from './index';
import { FormLoadingContext } from '@/react/contexts';

export default {
  title: 'Components/Form/InputNumber',
  component: InputNumber,
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    function onUpdateValue(value) {
      updateArgs({ value });
    }

    return (
      <div style={{ width: '350px' }}>
        <InputNumber {...args} value={value} onUpdateValue={onUpdateValue} />
      </div>
    );
  },
};

export const Primary = {
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 10,
  },
};

export const NoStepButtons = {
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 10,
    showStepButtons: false,
  },
};

export const Error = {
  args: {
    label: 'Lorem Ipsum',
    value: 1000,
    error: 'must not exceed 999',
  },
};

export const Disabled = {
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 10,
    disabled: true,
  },
};

export const Loading = {
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 10,
  },
  decorators: [
    withReactContext({
      context: FormLoadingContext,
      contextValue: true,
    }),
  ],
};
