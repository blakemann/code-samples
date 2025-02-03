import LogItem from './index';
import { Input } from '@/shared/utilities/constants';

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
    input: Input.TRIANGLE,
  },
};

export const Circle = {
  render,
  args: {
    input: Input.CIRCLE,
  },
};

export const Cross = {
  render,
  args: {
    input: Input.CROSS,
  },
};

export const Square = {
  render,
  args: {
    input: Input.SQUARE,
  },
};

export const L1 = {
  name: 'L1',
  render,
  args: {
    input: Input.L1,
  },
};

export const R1 = {
  name: 'R1',
  render,
  args: {
    input: Input.R1,
  },
};

export const Up = {
  render,
  args: {
    input: Input.UP,
  },
};

export const Down = {
  render,
  args: {
    input: Input.DOWN,
  },
};

export const Left = {
  render,
  args: {
    input: Input.LEFT,
  },
};

export const Right = {
  render,
  args: {
    input: Input.RIGHT,
  },
};

export const Share = {
  render,
  args: {
    input: Input.SHARE,
  },
};

export const Options = {
  render,
  args: {
    input: Input.OPTIONS,
  },
};

export const Mute = {
  render,
  args: {
    input: Input.MUTE,
  },
};

export const Unmute = {
  render,
  args: {
    input: Input.UNMUTE,
  },
};

export const PS = {
  render,
  args: {
    input: Input.PS,
  },
};

export const LeftStick = {
  render,
  args: {
    input: Input.LEFTSTICK,
    data: {
      angle: 45,
      force: 0.75,
    },
  },
};

export const RightStick = {
  render,
  args: {
    input: Input.RIGHTSTICK,
    data: {
      angle: 45,
      force: 0.75,
    },
  },
};
