import LogItem from './index';
import { INPUTS } from '@/utilities/constants';

export default {
  title: 'Components/LogItem',
  component: LogItem,
};

const render = (args) => ({
  components: {
    LogItem,
  },
  setup() {
    return { args };
  },
  template: `
    <LogItem v-bind="args" style="width: 300px; max-width: 100%;" />
  `,
});

export const Triangle = {
  render,
  args: {
    input: INPUTS.TRIANGLE,
  },
};

export const Circle = {
  render,
  args: {
    input: INPUTS.CIRCLE,
  },
};

export const Cross = {
  render,
  args: {
    input: INPUTS.CROSS,
  },
};

export const Square = {
  render,
  args: {
    input: INPUTS.SQUARE,
  },
};

export const L1 = {
  name: 'L1',
  render,
  args: {
    input: INPUTS.L1,
  },
};

export const R1 = {
  name: 'R1',
  render,
  args: {
    input: INPUTS.R1,
  },
};

export const Up = {
  render,
  args: {
    input: INPUTS.UP,
  },
};

export const Down = {
  render,
  args: {
    input: INPUTS.DOWN,
  },
};

export const Left = {
  render,
  args: {
    input: INPUTS.LEFT,
  },
};

export const Right = {
  render,
  args: {
    input: INPUTS.RIGHT,
  },
};

export const Share = {
  render,
  args: {
    input: INPUTS.SHARE,
  },
};

export const Options = {
  render,
  args: {
    input: INPUTS.OPTIONS,
  },
};

export const Mute = {
  render,
  args: {
    input: INPUTS.MUTE,
  },
};

export const Unmute = {
  render,
  args: {
    input: INPUTS.UNMUTE,
  },
};

export const PS = {
  render,
  args: {
    input: INPUTS.PS,
  },
};

export const LeftStick = {
  render,
  args: {
    input: INPUTS.LEFTSTICK,
    data: {
      angle: 45,
      force: 0.75,
    },
  },
};

export const RightStick = {
  render,
  args: {
    input: INPUTS.RIGHTSTICK,
    data: {
      angle: 45,
      force: 0.75,
    },
  },
};
