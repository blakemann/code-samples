import FormDemo from './index';

export default {
  title: 'Demos/FormDemo',
  component: FormDemo,
  parameters: {
    layout: 'fullscreen',
  },
};

const render = (args) => ({
  components: {
    FormDemo,
  },
  setup() {
    return { args };
  },
  template: `
    <FormDemo v-bind="args" />
  `,
});

export const Primary = {
  render,
};
