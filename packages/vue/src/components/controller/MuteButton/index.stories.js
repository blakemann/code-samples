import MuteButton from './index';

export default {
  title: 'Components/GameController/MuteButton',
  component: MuteButton,
};

const render = (args) => ({
  components: {
    MuteButton,
  },
  setup() {
    return { args };
  },
  data() {
    return {
      muted: args.muted,
    };
  },
  template: `
    <MuteButton v-bind="args" v-model:muted="muted" style="width: 50px; max-width: 100%;" />
  `,
});

export const Unmuted = {
  render,
  args: {
    muted: false,
  },
};

export const Muted = {
  render,
  args: {
    muted: true,
  },
};
