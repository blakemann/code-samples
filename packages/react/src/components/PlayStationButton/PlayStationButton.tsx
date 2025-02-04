import { gsap } from 'gsap';
import { uniqueId } from 'lodash-es';
import classNames from 'classnames';
import RecessGraphic from './assets/recess.svg?react';
import PlayStationLogoGraphic from './assets/playstation-logo.svg?react';
import { useState, useCallback, useRef } from 'react';
import { useGlobalRelease } from '@/react/hooks';
import styles from './index.module.scss';

type GradientStop = {
  offset: number,
  color: string,
  opacity: number,
}

type GradientSize = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

type GradientValues = {
  id: string,
  size: GradientSize,
  stops: GradientStop[],
}

interface Props {
  onPressed?: () => void | undefined,
  onReleased?: () => void | undefined,
}

export default function PlayStationButton({ onPressed, onReleased }:Props) {
  // state

  const [isDown, setIsDown] = useState<boolean>(false);
  const [recessLit, setRecessLit] = useState<boolean>(false);

  const recessClasses:string = classNames({
    [styles.recess]: true,
    [styles['recess--lit']]: isDown || recessLit,
  });

  const buttonClasses:string = classNames({
    [styles.button]: true,
    [styles['button--pressed']]: isDown,
  });

  // data

  const shimmerGradient = useRef<SVGLinearGradientElement|null>(null);
  const shimmerGradientTween = useRef<GSAPTween|null>(null);
  const lightingTimeout = useRef<ReturnType<typeof setTimeout>|null>(null);

  const shimmerGradientValues = useRef<GradientValues>({
    id: uniqueId('ps-button-shimmer'),
    size: { x1: 21.34, y1: -50, x2: 33.99, y2: 0 },
    stops: [
      { offset: 0.20, color: '#fff', opacity: 0 },
      { offset: 0.45, color: '#fff', opacity: 1 },
      { offset: 0.55, color: '#fff', opacity: 1 },
      { offset: 0.80, color: '#fff', opacity: 0 },
    ],
  });

  // effects

  const onRelease = useCallback(():void => {
    // update internal state
    setIsDown(false);
    // emit event
    onReleased?.();
  }, [onReleased]);

  useGlobalRelease(isDown, onRelease);

  // event handlers

  function onMouseDown():void {
    // update internal state
    setIsDown(true);
    setRecessLit(true);
    // emit event
    onPressed?.();
    // clear existing timeout if applicable
    if (lightingTimeout.current) {
      clearTimeout(lightingTimeout.current);
    }
    // create timeout to turn off recess lighting
    lightingTimeout.current = setTimeout(():void => {
      setRecessLit(false);
    }, 250);
    // kill existing shimmer animation if applicable
    if (shimmerGradientTween.current) {
      shimmerGradientTween.current.kill();
    }
    // animate shimmer effect
    const shimmer:{ y1:number, y2:number } = { y1: -25, y2: 0 };
    const onUpdate:GSAPCallback = ():void => {
      if (shimmerGradient.current) {
        shimmerGradient.current.setAttribute('y1', String(shimmer.y1));
        shimmerGradient.current.setAttribute('y2', String(shimmer.y2));
      }
    };
    shimmerGradientTween.current = gsap.to(shimmer, { y1: 40, y2: 90, duration: 0.75, ease: 'circ.out', onUpdate });
  }

  // template

  const shimmerGradientStops = shimmerGradientValues.current.stops.map((stop, index) => (
    <stop
      key={index}
      offset={stop.offset}
      stopColor={stop.color}
      stopOpacity={stop.opacity}
    />
  ));

  return (
    <div className={styles['c-playstation-button']}>
      <div className={recessClasses}>
        <RecessGraphic className={styles['recess-graphic']} />
        <button
          type="button"
          className={buttonClasses}
          aria-label="PS Button"
          onMouseDown={onMouseDown}
        >
          <PlayStationLogoGraphic />
          <svg
            className={styles.shimmer}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 62 46.72"
          >
            <defs>
              <linearGradient
                id={shimmerGradientValues.current.id}
                ref={shimmerGradient}
                {...shimmerGradientValues.current.size}
                gradientUnits="userSpaceOnUse"
              >
                {shimmerGradientStops}
              </linearGradient>
            </defs>
            <path
              fill={`url(#${shimmerGradientValues.current.id})`}
              d="M33.45,9.41l-.04,37.31-10-3.25V1.29c0-.84.8-1.46,1.61-1.24l11.15,2.95c8.17,2.2,13.17,6.46,13.08,13.94-.08,8.7-4.1,12.19-11.95,9.92V9.7c0-2.07-3.86-2.19-3.86-.28h0ZM61.94,33.56c-.65-2.93-5.32-4.52-12.51-5.04-4.84-.35-9.62.64-14.29,2.18v5.8l7.18-2.46,5.2-1.74c5.44-1.02,7.64.77,2.4,2.43l-2.6.9h-.01l-12.17,4.16v6.36l7.1-2.47,14.5-5.13.17-.04c3.81-1.34,5.44-3.21,5.03-4.95ZM19.48,26.97l-14.3,4.84s-.13.04-.21.04C2.33,32.74-.15,34.65,0,37.34c.17,2.72,6.38,3.37,11.18,4.14,3.79.62,7.28.43,10.51-.44v-5.77l-2.87.97-4.71,1.58c-3.05,1.06-5.65-1.42-2.85-2.44l2.28-.81,8.15-2.91v-5.45l-2.22.76Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
