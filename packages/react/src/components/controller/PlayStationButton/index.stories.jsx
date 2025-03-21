import PlayStationButton from './index';

export default {
  title: 'Components/GameController/PlayStationButton',
  component: PlayStationButton,
  render: (args) => (
    <div style={{ width: '75px', maxWidth: '100%' }}>
      <PlayStationButton {...args} />
    </div>
  ),
};

export const Primary = {};
