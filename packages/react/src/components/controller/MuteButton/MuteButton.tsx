import classNames from 'classnames';
import { useState, useCallback } from 'react';
import styles from './index.module.scss';
import { useGlobalRelease } from '@/react/hooks';

interface Props {
  muted:boolean,
  onUpdateMuted?: (muted:boolean) => void | undefined,
  onPressed?: () => void | undefined,
  onReleased?: () => void | undefined,
}

export default function MuteButton({ muted, onUpdateMuted, onPressed, onReleased }:Props) {
  // state

  const [isDown, setIsDown] = useState<boolean>(false);

  const buttonClasses:string = classNames({
    [styles.button]: true,
    [styles[`button--pressed`]]: isDown,
    [styles['button--lit']]: muted,
  });

  // effects

  const onRelease = useCallback(():void => {
    // update internal state
    setIsDown(false);
    // call update callback
    onUpdateMuted?.(!muted);
    // emit event
    onReleased?.();
  }, [muted, onUpdateMuted, onReleased]);

  useGlobalRelease(isDown, onRelease);

  // event handlers

  function onMouseDown():void {
    // update internal state
    setIsDown(true);
    // emit event
    onPressed?.();
  }

  // template

  return (
    <div className={styles['c-mute-button']}>
      <div className={styles.recess}>
        <button
          type="button"
          className={buttonClasses}
          aria-label={muted ? 'Unmute' : 'Mute'}
          onMouseDown={onMouseDown}
        />
      </div>
    </div>
  );
}
