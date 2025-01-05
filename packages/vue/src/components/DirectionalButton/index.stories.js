import DirectionalButton from './index';

export default {
  title: 'Components/DirectionalButton',
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
    direction: 'up',
  },
};

export const Down = {
  render,
  args: {
    direction: 'down',
  },
};

export const Left = {
  render,
  args: {
    direction: 'left',
  },
};

export const Right = {
  render,
  args: {
    direction: 'right',
  },
};
