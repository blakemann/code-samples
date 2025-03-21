import TouchPad from './index';

export default {
  title: 'Components/GameController/TouchPad',
  component: TouchPad,
};

const render = (args) => ({
  components: {
    TouchPad,
  },
  setup() {
    return { args };
  },
  template: `
    <TouchPad v-bind="args" style="width: 400px; max-width: 100%;" />
  `,
});

export const Primary = {
  render,
};
