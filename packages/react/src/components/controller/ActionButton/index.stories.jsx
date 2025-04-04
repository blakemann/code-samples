import Icon from '@fortawesome/fontawesome-free/svgs/regular/face-smile.svg?react';
import ActionButton, { ActionButtonColor } from './index';

export default {
  title: 'Components/GameController/ActionButton',
  component: ActionButton,
  render: (args) => (
    <div style={{ width: '50px', maxWidth: '100%' }}>
      <ActionButton {...args}>
        <Icon />
      </ActionButton>
    </div>
  ),
};

export const Green = {
  args: {
    label: 'Example',
    color: ActionButtonColor.Green,
  },
};

export const Red = {
  args: {
    label: 'Example',
    color: ActionButtonColor.Red,
  },
};

export const Blue = {
  args: {
    label: 'Example',
    color: ActionButtonColor.Blue,
  },
};

export const Pink = {
  args: {
    label: 'Example',
    color: ActionButtonColor.Pink,
  },
};
