import MuteButton from './index';
import { useState } from 'react';

export default {
  title: 'Components/MuteButton',
  component: MuteButton,
  decorators: [
    (Story, { args }) => {
      const [muted, setIsMuted] = useState(args.muted);
      return (
        <div style={{ width: '50px', maxWidth: '100%' }}>
          <MuteButton muted={muted} onUpdateMuted={setIsMuted} />
        </div>
      )
    },
  ],
};

export const Unmuted = {
  args: {
    muted: false,
  },
};

export const Muted = {
  args: {
    muted: true,
  },
};
