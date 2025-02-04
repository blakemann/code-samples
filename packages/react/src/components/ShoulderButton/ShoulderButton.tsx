import { gsap } from 'gsap';
import ShoulderButtonGraphic from './assets/shoulder-button.svg?react';
import { useState, useCallback, useRef } from 'react';
import { useGlobalRelease } from '@/react/hooks';
import styles from './index.module.scss';
import { ButtonSide } from './types';

type GraphicType = InstanceType<typeof ShoulderButtonGraphic>;

interface Props {
  side: ButtonSide,
  onPressed?: () => void | undefined,
  onReleased?: () => void | undefined,
}

export default function ShoulderButton({ side, onPressed, onReleased }:Props) {
  // state

  const [isDown, setIsDown] = useState<boolean>(false);

  // data

  const graphic = useRef<GraphicType|null>(null);

  // effects

  const onRelease = useCallback(():void => {
    // update internal state
    setIsDown(false);
    // emit event
    onReleased?.();
    // animate out
    gsap.to(graphic.current, { y: 0, duration: 0.1, ease: 'power2.inOut' });
  }, [onReleased]);

  useGlobalRelease(isDown, onRelease);

  // event handlers

  function onMouseDown():void {
    // update internal state
    setIsDown(true);
    // emit event
    onPressed?.();
    // animate in
    gsap.to(graphic.current, { y: '20%', duration: 0.1, ease: 'power2.inOut' });
  }

  // template

  return (
    <button
      type="button"
      className={`${styles['c-shoulder-button']} ${styles[`c-shoulder-button--side-${side}`]}`}
      aria-label={side === 'left' ? 'L1' : 'R1'}
      onMouseDown={onMouseDown}
    >
      <div ref={graphic}>
        <ShoulderButtonGraphic className={styles.graphic} />
      </div>
    </button>
  );
}
