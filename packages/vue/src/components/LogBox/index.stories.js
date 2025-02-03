import LogBox from './index';
import { Input } from '@/shared/utilities/constants';

export default {
  title: 'Components/LogBox',
  component: LogBox,
};

const render = (args) => ({
  components: {
    LogBox,
  },
  setup() {
    return { args };
  },
  template: `
    <LogBox v-bind="args" style="width: 350px; max-width: 100%;" />
  `,
});

export const Empty = {
  render,
  args: {
    logs: [],
  },
};

export const LessThanMax = {
  render,
  args: {
    logs: [
      { timestamp: 1, input: Input.TRIANGLE },
      { timestamp: 2, input: Input.CIRCLE },
      { timestamp: 3, input: Input.SQUARE },
    ],
  },
};

export const MoreThanMax = {
  render,
  args: {
    logs: [
      { timestamp: 1, input: Input.TRIANGLE },
      { timestamp: 2, input: Input.CIRCLE },
      { timestamp: 3, input: Input.SQUARE },
      { timestamp: 4, input: Input.CROSS },
    ],
  },
};
