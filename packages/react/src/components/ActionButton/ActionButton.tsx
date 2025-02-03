import classNames from 'classnames';
import { gsap } from 'gsap';
import { Color } from './types';
import type { ReactNode } from 'react';
import { useState, useRef, useCallback } from 'react';
import styles from './index.module.scss';
import { useGlobalRelease } from '@/react/hooks';

interface Props {
  label: string,
  color: Color,
  icon: ReactNode,
  onPressed?: () => void | undefined,
  onReleased?: () => void | undefined,
}

let shimmerTimeline:GSAPTimeline|null = null;

export default function ActionButton(props:Props) {
  // state

  const [isDown, setIsDown] = useState<boolean>(false);

  const buttonClasses:string = classNames({
    [styles.button]: true,
    [styles[`button--color-${props.color}`]]: true,
    [styles['button--pressed']]: isDown,
  });

  const shimmer = useRef<HTMLSpanElement|null>(null);

  // effects

  const onRelease = useCallback(():void => {
    // update internal state
    setIsDown(false);
    // emit event
    props?.onReleased?.();
  }, [props]);

  useGlobalRelease(isDown, onRelease);

  // event handlers

  function onMouseDown():void {
    // update internal state
    setIsDown(true);
    // emit event
    props?.onPressed?.();
    // animate
    if (shimmer.current) {
      if (shimmerTimeline) {
        shimmerTimeline.kill();
      }
      shimmerTimeline = gsap.timeline();
      shimmerTimeline.to(shimmer.current, { opacity: 1, duration: 0.1, ease: 'power1.easeIn' });
      shimmerTimeline.to(shimmer.current, { opacity: 0, duration: 0.5, ease: 'power1.easeOut' });
      shimmerTimeline.fromTo(shimmer.current, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'power1.easeIn' }, 0);
    }
  }

  // template

  return (
    <span className={styles['c-action-button']}>
      <span className={styles.recess}>
        <button
          type="button"
          className={buttonClasses}
          aria-label={props.label}
          onMouseDown={onMouseDown}
        >
          {props.icon}
          <span
            ref={shimmer}
            className={styles.shimmer}
          />
        </button>
      </span>
    </span>
  );
}
