import ProfileCard from './index';

export default {
  title: 'Components/Form/ProfileCard',
  component: ProfileCard,
  render: (args) => (
    <div style={{ width: '350px', maxWith: '100%' }}>
      <ProfileCard {...args} />
    </div>
  ),
};

export const Primary = {
  args: {
    name: 'Storybook',
    age: 12,
  },
};
