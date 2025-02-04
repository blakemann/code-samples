import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { useState, useCallback, useRef } from 'react';
import { useGlobalRelease } from '@/react/hooks';
import styles from './index.module.scss';
import { ButtonSide } from './types';

interface Props {
  label: string,
  side: ButtonSide,
  onPressed?: () => void | undefined,
  onReleased?: () => void | undefined,
}

export default function MenuButton({ label, side, children, onPressed, onReleased }:PropsWithChildren<Props>) {
  // state

  const [isDown, setIsDown] = useState<boolean>(false);
  const [recessLit, setRecessLit] = useState<boolean>(false);

  const recessClasses:string = classNames({
    [styles.recess]: true,
    [styles[`recess--side-${side}`]]: true,
    [styles['recess--lit']]: isDown || recessLit,
  });

  const buttonClasses:string = classNames({
    [styles.button]: true,
    [styles['button--pressed']]: isDown,
  });

  // data

  const lightingTimeout = useRef<ReturnType<typeof setTimeout>|null>(null);

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
    // set timeout to turn off recess lighting
    lightingTimeout.current = setTimeout((): void => {
      setRecessLit(false);
    }, 250);
  }

  // template

  return (
    <div className={styles['c-menu-button']}>
      <div className={styles.icon}>
        {children}
      </div>
      <div className={recessClasses}>
        <button
          type="button"
          className={buttonClasses}
          aria-label={label}
          onMouseDown={onMouseDown}
        />
      </div>
    </div>
  );
}
