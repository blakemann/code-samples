import GameController from './index';

export default {
  title: 'Demo/GameController',
  component: GameController,
};

const render = (args) => ({
  components: {
    GameController,
  },
  setup() {
    return { args };
  },
  template: `
    <GameController v-bind="args" style="width: 1000px; max-width: 100%;" />
  `,
});

export const Primary = {
  render,
};
