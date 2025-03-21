import { useState } from 'react';
import AnalogStick from './index';

export default {
  title: 'Components/GameController/AnalogStick',
  component: AnalogStick,
  decorators: [
    (Story, { args }) => {
      const [force, setForce] = useState(0);
      const [angle, setAngle] = useState(0);
      return (
        <div style={{ width: '150px', maxWidth: '100%', border: '1px dashed #000', borderRadius: '50%' }}>
          <AnalogStick {...args} force={force} angle={angle} onUpdateForce={setForce} onUpdateAngle={setAngle} />
        </div>
      );
    },
  ],
};

export const Primary = {};
