import GameControllerDemo from './index';

export default {
  title: 'Demos/GameControllerDemo',
  component: GameControllerDemo,
  parameters: {
    layout: 'fullscreen',
  },
};

const render = (args) => ({
  components: {
    GameControllerDemo,
  },
  setup() {
    return { args };
  },
  template: `
    <GameControllerDemo v-bind="args" />
  `,
});

export const Primary = {
  render,
};
