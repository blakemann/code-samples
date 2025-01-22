import Icon from '@fortawesome/fontawesome-free/svgs/regular/face-smile.svg';
import ActionButton, { ActionButtonColor } from './index';

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
    color: ActionButtonColor.Green,
  },
};

export const Red = {
  render,
  args: {
    label: 'Example',
    color: ActionButtonColor.Red,
  },
};

export const Blue = {
  render,
  args: {
    label: 'Example',
    color: ActionButtonColor.Blue,
  },
};

export const Pink = {
  render,
  args: {
    label: 'Example',
    color: ActionButtonColor.Pink,
  },
};
