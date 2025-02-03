import ControllerBody from './index';

export default {
  title: 'Components/ControllerBody',
  component: ControllerBody,
  render: (args) => (
    <div style={{ width: '1000px', maxWidth: '100%' }}>
      <ControllerBody {...args} />
    </div>
  ),
};

export const Primary = {};
