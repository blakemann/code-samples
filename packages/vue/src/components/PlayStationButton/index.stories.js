import PlayStationButton from './index';

export default {
  title: 'Components/PlayStationButton',
  component: PlayStationButton,
};

const render = (args) => ({
  components: {
    PlayStationButton,
  },
  setup() {
    return { args };
  },
  template: `
    <PlayStationButton v-bind="args" style="width: 75px; max-width: 100%;" />
  `,
});

export const Primary = {
  render,
};
