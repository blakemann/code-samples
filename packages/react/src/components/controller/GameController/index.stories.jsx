import GameController from './index';

export default {
  title: 'Components/GameController/GameController',
  component: GameController,
  render: (args) => (
    <div style={{ width: '1000px', maxWidth: '100%', minWidth: '320px' }}>
      <GameController {...args} />
    </div>
  ),
};

export const Primary = {};
