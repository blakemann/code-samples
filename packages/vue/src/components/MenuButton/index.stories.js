import Icon from '@fortawesome/fontawesome-free/svgs/solid/bars.svg';
import MenuButton from './index';

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
};

const render = (args) => ({
  components: {
    MenuButton,
    Icon,
  },
  setup() {
    return { args };
  },
  template: `
    <MenuButton v-bind="args" style="width: 40px; max-width: 100%;">
      <Icon />
    </MenuButton>
  `,
});

export const Left = {
  render,
  args: {
    label: 'Example',
    side: 'left',
  },
};

export const Right = {
  render,
  args: {
    label: 'Example',
    side: 'right',
  },
};
