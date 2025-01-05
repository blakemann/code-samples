import ShoulderButton from './index';

export default {
  title: 'Components/ShoulderButton',
  component: ShoulderButton,
};

const render = (args) => ({
  components: {
    ShoulderButton,
  },
  setup() {
    return { args };
  },
  template: `
    <div style="position: absolute;">
      <ShoulderButton v-bind="args" style="width: 150px; max-width: 100%;" />
      <!-- render a guide line to represent controller body -->
      <span style="position: absolute; top: 65%; left: -20%; right: -20%; border-top: 1px dashed #000; transform: rotate(${args.side === 'left' ? '-11deg' : '11deg'});" />
    </div>
  `,
});

export const Left = {
  render,
  args: {
    side: 'left',
  },
};

export const Right = {
  render,
  args: {
    side: 'right',
  },
};
