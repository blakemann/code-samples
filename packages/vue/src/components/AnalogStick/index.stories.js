import AnalogStick from './index';

export default {
  title: 'Components/AnalogStick',
  component: AnalogStick,
};

const render = (args) => ({
  components: {
    AnalogStick,
  },
  setup() {
    return { args };
  },
  template: `
    <AnalogStick v-bind="args" style="width: 150px; max-width: 100%; border: 1px dashed #000; border-radius: 50%;" />
  `,
});

export const Primary = {
  render,
};
