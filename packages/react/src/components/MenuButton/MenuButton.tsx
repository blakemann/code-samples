import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { useState, useCallback } from 'react';
import { useGlobalRelease } from '@/react/hooks';
import styles from './index.module.scss';
import { ButtonSide } from './types';

interface Props {
  label: string,
  side: ButtonSide,
  onPressed?: () => void | undefined,
  onReleased?: () => void | undefined,
}

let lightingTimeout:ReturnType<typeof setTimeout>|null = null;

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
    if (lightingTimeout) {
      clearTimeout(lightingTimeout);
    }
    // set timeout to turn off recess lighting
    lightingTimeout = setTimeout((): void => {
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
