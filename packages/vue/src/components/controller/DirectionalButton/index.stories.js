import DirectionalButton, { DirectionalButtonDirection } from './index';

export default {
  title: 'Components/GameController/DirectionalButton',
  component: DirectionalButton,
};

const render = (args) => ({
  components: {
    DirectionalButton,
  },
  setup() {
    return { args };
  },
  template: `
    <DirectionalButton v-bind="args" style="width: 50px; max-width: 100%;" />
  `,
});

export const Up = {
  render,
  args: {
    direction: DirectionalButtonDirection.Up,
  },
};

export const Down = {
  render,
  args: {
    direction: DirectionalButtonDirection.Down,
  },
};

export const Left = {
  render,
  args: {
    direction: DirectionalButtonDirection.Left,
  },
};

export const Right = {
  render,
  args: {
    direction: DirectionalButtonDirection.Right,
  },
};
