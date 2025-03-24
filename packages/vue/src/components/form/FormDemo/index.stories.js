import { provide, ref } from 'vue';
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
    if (args.loading) {
      provide('ui:form:loading', ref(true));
    }
    return { args };
  },
  template: `
    <FormDemo v-bind="args" />
  `,
});

export const Primary = {
  render,
};

export const Loading = {
  render,
  args: {
    loading: true,
  },
};
