import LogItem from './index';
import { Input } from '@/shared/utilities/constants';

export default {
  title: 'Components/LogItem',
  component: LogItem,
  render: (args) => (
    <div style={{ width: '300px', maxWidth: '100%' }}>
      <LogItem {...args} />
    </div>
  ),
};

export const Triangle = {
  args: {
    input: Input.TRIANGLE,
  },
};

export const Circle = {
  args: {
    input: Input.CIRCLE,
  },
};

export const Cross = {
  args: {
    input: Input.CROSS,
  },
};

export const Square = {
  args: {
    input: Input.SQUARE,
  },
};

export const L1 = {
  name: 'L1',
  args: {
    input: Input.L1,
  },
};

export const R1 = {
  name: 'R1',
  args: {
    input: Input.R1,
  },
};

export const Up = {
  args: {
    input: Input.UP,
  },
};

export const Down = {
  args: {
    input: Input.DOWN,
  },
};

export const Left = {
  args: {
    input: Input.LEFT,
  },
};

export const Right = {
  args: {
    input: Input.RIGHT,
  },
};

export const Share = {
  args: {
    input: Input.SHARE,
  },
};

export const Options = {
  args: {
    input: Input.OPTIONS,
  },
};

export const Mute = {
  args: {
    input: Input.MUTE,
  },
};

export const Unmute = {
  args: {
    input: Input.UNMUTE,
  },
};

export const PS = {
  args: {
    input: Input.PS,
  },
};

export const LeftStick = {
  args: {
    input: Input.LEFTSTICK,
    data: {
      angle: 45,
      force: 0.75,
    },
  },
};

export const RightStick = {
  args: {
    input: Input.RIGHTSTICK,
    data: {
      angle: 45,
      force: 0.75,
    },
  },
};
