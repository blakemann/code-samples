import GameControllerDemo from './index';

export default {
  title: 'Demos/GameControllerDemo',
  component: GameControllerDemo,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => <GameControllerDemo {...args} />,
};

export const Primary = {};
