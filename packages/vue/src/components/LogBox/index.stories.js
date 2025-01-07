import LogBox from './index';
import { INPUTS } from '@/utilities/constants';

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
      { timestamp: 1, input: INPUTS.TRIANGLE },
      { timestamp: 2, input: INPUTS.CIRCLE },
      { timestamp: 3, input: INPUTS.SQUARE },
    ],
  },
};

export const MoreThanMax = {
  render,
  args: {
    logs: [
      { timestamp: 1, input: INPUTS.TRIANGLE },
      { timestamp: 2, input: INPUTS.CIRCLE },
      { timestamp: 3, input: INPUTS.SQUARE },
      { timestamp: 4, input: INPUTS.CROSS },
    ],
  },
};
