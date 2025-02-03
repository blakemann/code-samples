import Icon from '@fortawesome/fontawesome-free/svgs/solid/bars.svg?react';
import MenuButton, { MenuButtonSide } from './index';

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
  render: (args) => (
    <div style={{ width: '40px', maxWidth: '100%' }}>
      <MenuButton {...args}>
        <Icon />
      </MenuButton>
    </div>
  )
};

export const Left = {
  args: {
    label: 'Example',
    side: MenuButtonSide.Left,
  },
};

export const Right = {
  args: {
    label: 'Example',
    side: MenuButtonSide.Right,
  },
};
