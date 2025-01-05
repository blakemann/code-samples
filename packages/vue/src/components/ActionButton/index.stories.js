import Icon from '@fortawesome/fontawesome-free/svgs/regular/face-smile.svg';
import ActionButton from './index';

export default {
  title: 'Components/ActionButton',
  component: ActionButton,
};

const render = (args) => ({
  components: {
    ActionButton,
    Icon,
  },
  setup() {
    return { args };
  },
  template: `
    <ActionButton v-bind="args" style="width: 50px; max-width: 100%;">
      <Icon />
    </ActionButton>
  `,
});

export const Green = {
  render,
  args: {
    label: 'Example',
    color: 'green',
  },
};

export const Red = {
  render,
  args: {
    label: 'Example',
    color: 'red',
  },
};

export const Blue = {
  render,
  args: {
    label: 'Example',
    color: 'blue',
  },
};

export const Pink = {
  render,
  args: {
    label: 'Example',
    color: 'pink',
  },
};
