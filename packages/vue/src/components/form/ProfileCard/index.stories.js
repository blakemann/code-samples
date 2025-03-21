import ProfileCard from './index';

export default {
  title: 'Components/Form/ProfileCard',
  component: ProfileCard,
};

const render = (args) => ({
  components: {
    ProfileCard,
  },
  setup() {
    return { args };
  },
  template: `
    <ProfileCard v-bind="args" style="width: 350px; max-width: 100%;" />
  `,
});

export const Primary = {
  render,
  args: {
    name: 'Storybook',
    age: 12,
  },
};
