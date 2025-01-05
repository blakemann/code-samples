import ControllerBody from './index';

export default {
  title: 'Components/ControllerBody',
  component: ControllerBody,
};

const render = (args) => ({
  components: {
    ControllerBody,
  },
  setup() {
    return { args };
  },
  template: `
    <ControllerBody v-bind="args" style="width: 1000px; max-width: 100%;" />
  `,
});

export const Primary = {
  render,
};
