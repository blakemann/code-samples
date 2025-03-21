import LogBox from './index';
import { Input } from '@/shared/utilities/constants';

export default {
  title: 'Components/GameController/LogBox',
  component: LogBox,
  render: (args) => (
    <div style={{ width: '350px', maxWidth: '100%' }}>
      <LogBox {...args} />
    </div>
  ),
};

export const Empty = {
  args: {
    logs: [],
  },
};

export const LessThanMax = {
  args: {
    logs: [
      { timestamp: 1, input: Input.TRIANGLE },
      { timestamp: 2, input: Input.CIRCLE },
      { timestamp: 3, input: Input.SQUARE },
    ],
  },
};

export const MoreThanMax = {
  args: {
    logs: [
      { timestamp: 1, input: Input.TRIANGLE },
      { timestamp: 2, input: Input.CIRCLE },
      { timestamp: 3, input: Input.SQUARE },
      { timestamp: 4, input: Input.CROSS },
    ],
  },
};
