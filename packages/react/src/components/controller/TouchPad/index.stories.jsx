import TouchPad from './index';

export default {
  title: 'Components/GameController/TouchPad',
  component: TouchPad,
  render: (args) => (
    <div style={{ width: '400px', maxWidth: '100%' }}>
      <TouchPad {...args} />
    </div>
  ),
};

export const Primary = {};
