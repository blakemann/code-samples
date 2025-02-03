import DirectionalButton, { DirectionalButtonDirection } from './index';

export default {
  title: 'Components/DirectionalButton',
  component: DirectionalButton,
  render: (args) => (
    <div style={{ width: '50px', maxWidth: '100%' }}>
      <DirectionalButton {...args} />
    </div>
  ),
};

export const Up = {
  args: {
    direction: DirectionalButtonDirection.Up,
  },
};

export const Down = {
  args: {
    direction: DirectionalButtonDirection.Down,
  },
};

export const Left = {
  args: {
    direction: DirectionalButtonDirection.Left,
  },
};

export const Right = {
  args: {
    direction: DirectionalButtonDirection.Right,
  },
};
