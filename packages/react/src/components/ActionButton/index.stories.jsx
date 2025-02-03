import Icon from '@fortawesome/fontawesome-free/svgs/regular/face-smile.svg?react';
import ActionButton, { ActionButtonColor } from './index';

export default {
  title: 'Components/ActionButton',
  component: ActionButton,
};

const icon = (
  <Icon />
);

const render = (args) => (
  <div style={{ width: '50px', maxWidth: '100%' }}>
    <ActionButton
      {...args}
      icon={icon}
    />
  </div>
);

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
