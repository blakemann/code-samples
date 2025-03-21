import { ref, provide } from 'vue';
import InputText from './index';

export default {
  title: 'Components/Form/InputText',
  component: InputText,
};

const render = (args) => ({
  components: {
    InputText,
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
    <InputText v-bind="args" v-model.nullable="value" style="width: 350px;" />
  `,
});

export const Primary = {
  render,
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 'Dolor Sit Amet',
    maxlength: 250,
  },
};

export const Error = {
  render,
  args: {
    label: 'Lorem Ipsum',
    value: 'Dolor Sit Amet Adipiscing Consectetur',
    maxlength: 25,
    error: 'must not exceed maximum length',
  },
};

export const Disabled = {
  render,
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 'Dolor Sit Amet',
    maxlength: 250,
    disabled: true,
  },
};

export const Loading = {
  render,
  args: {
    label: 'Lorem Ipsum',
    labelParens: 'optional',
    value: 'Dolor Sit Amet',
    maxlength: 250,
    loading: true,
  },
};
