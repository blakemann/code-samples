import { ref, provide } from 'vue';
import InputNumber from './index';

export default {
  title: 'Components/Form/InputNumber',
  component: InputNumber,
};

const render = (args) => ({
  components: {
    InputNumber,
  },
  setup() {
    if (args.loading) {
      provide('ui:form:loading', ref(true));
    }
    return { args };
  },
  data() {
    return {
      value: args.value,
    };
  },
  template: `
    <InputNumber v-bind="args" v-model.nullable="args.value" style="width: 350px;" />
  `,
});

export const Primary = {
  render,
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 10,
  },
};

export const NoStepButtons = {
  render,
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 10,
    showStepButtons: false,
  },
};

export const Error = {
  render,
  args: {
    label: 'Lorem Ipsum',
    value: 1000,
    error: 'must not exceed 999',
  },
};

export const Disabled = {
  render,
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 10,
    disabled: true,
  },
};

export const Loading = {
  render,
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 10,
    loading: true,
  },
};
