import ShoulderButton from './index';

export default {
  title: 'Components/ShoulderButton',
  component: ShoulderButton,
  render: (args) => (
    <div style={{ position: 'relative' }}>
      <div style={{ width: '150px', maxWidth: '100%' }}>
        <ShoulderButton {...args} />
      </div>
      {/* render a guide line to represent controller body */}
      <span style={{ position: 'absolute', top: '65%', left: '-20%', right: '-20%', borderTop: '1px dashed #000', transform: `rotate(${args.side === 'left' ? '-11deg' : '11deg'})` }} />
    </div>
  )
};

export const Left = {
  args: {
    side: 'left',
  },
};

export const Right = {
  args: {
    side: 'right',
  },
};
