import IconMute from '@fortawesome/fontawesome-free/svgs/solid/microphone-slash.svg?react';
import IconUnmute from '@fortawesome/fontawesome-free/svgs/solid/microphone.svg?react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import IconPS from './assets/ps-button.svg?react';
import IconDirection from './assets/direction-button.svg?react';
import IconAnalogStick from './assets/analog-stick.svg?react';
import IconCircle from '@/shared/assets/action-circle.svg?react';
import IconCross from '@/shared/assets/action-cross.svg?react';
import IconSquare from '@/shared/assets/action-square.svg?react';
import IconTriangle from '@/shared/assets/action-triangle.svg?react';
import IconOptions from '@/shared/assets/menu-options.svg?react';
import IconShare from '@/shared/assets/menu-share.svg?react';
import { Input } from '@/shared/utilities/constants';
import styles from './index.module.scss';
import { LogItemData } from './types';

type SymbolData = {
  background: string|null,
  icon: {
    type: string|null,
    text?: string,
    graphic?: ReactNode,
  }
  message: string,
  class?: string,
}

interface Props {
  input: Input,
  data?: LogItemData|null,
}

function getSymbolData(input:Input):SymbolData {
  switch (input) {
    case Input.L1:
      return { background: 'shoulder', icon: { type: 'text', text: 'L1' }, message: '\'L1\' Pressed' };
    case Input.R1:
      return { background: 'shoulder', icon: { type: 'text', text: 'R1' }, message: '\'R1\' Pressed' };
    case Input.TRIANGLE:
      return { background: 'action', icon: { type: 'graphic', graphic: <IconTriangle /> }, class: 'green', message: '\'Triangle\' Pressed' };
    case Input.CIRCLE:
      return { background: 'action', icon: { type: 'graphic', graphic: <IconCircle /> }, class: 'red', message: '\'Circle\' Pressed' };
    case Input.CROSS:
      return { background: 'action', icon: { type: 'graphic', graphic: <IconCross /> }, class: 'blue', message: '\'X\' Pressed' };
    case Input.SQUARE:
      return { background: 'action', icon: { type: 'graphic', graphic: <IconSquare /> }, class: 'pink', message: '\'Square\' Pressed' };
    case Input.UP:
      return { background: 'direction', icon: { type: null }, class: 'up', message: '\'Up\' Pressed' };
    case Input.DOWN:
      return { background: 'direction', icon: { type: null }, class: 'down', message: '\'Down\' Pressed' };
    case Input.LEFT:
      return { background: 'direction', icon: { type: null }, class: 'left', message: '\'Left\' Pressed' };
    case Input.RIGHT:
      return { background: 'direction', icon: { type: null }, class: 'right', message: '\'Right\' Pressed' };
    case Input.LEFTSTICK:
      return { background: 'stick', icon: { type: 'text', text: 'L' }, message: 'Left Stick' };
    case Input.RIGHTSTICK:
      return { background: 'stick', icon: { type: 'text', text: 'R' }, message: 'Right Stick' };
    case Input.SHARE:
      return { background: null, icon: { type: 'graphic', graphic: <IconShare /> }, message: '\'Share\' Pressed' };
    case Input.OPTIONS:
      return { background: null, icon: { type: 'graphic', graphic: <IconOptions /> }, message: '\'Options\' Pressed' };
    case Input.MUTE:
      return { background: null, icon: { type: 'graphic', graphic: <IconMute /> }, class: 'mute', message: 'Microphone Muted' };
    case Input.UNMUTE:
      return { background: null, icon: { type: 'graphic', graphic: <IconUnmute /> }, message: 'Microphone Unmuted' };
    case Input.PS:
      return { background: null, icon: { type: 'graphic', graphic: <IconPS /> }, message: '\'PS Button\' Pressed' };
    default:
      return { background: null, icon: { type: 'text', text: 'unknown' }, message: 'Unknown Input' };
  }
}

function getDataString(data:LogItemData|null):string|null {
  if (!data) {
    return null;
  }
  // format data values into string representations
  const values:Array<string> = [];
  if (data.angle !== undefined) {
    values.push(`${data.angle}°`);
  }
  if (data.force !== undefined) {
    values.push(`${data.force}%`);
  }
  return `(${values.join(', ')})`;
}

export default function LogItem({ input, data = null }:Props) {
  // state

  const symbolData:SymbolData = getSymbolData(input);
  const dataString:string|null = getDataString(data);

  const symbolClasses:string = classNames({
    [styles.symbol]: true,
    [styles[`symbol--${symbolData.class}`]]: symbolData.class,
  });

  const backgroundClasses:string = classNames({
    [styles.background]: true,
    [styles[`background--${symbolData.background}`]]: symbolData.background,
  });

  const iconClasses:string = classNames({
    [styles.icon]: true,
    [styles['icon--dark']]: !symbolData.background,
  });

  // template

  let icon:ReactNode|undefined;
  if (symbolData.icon.type === 'graphic') {
    icon = symbolData.icon.graphic;
  } else if (symbolData.icon.type === 'text') {
    icon = <span>{symbolData.icon.text}</span>;
  }

  return (
    <div className={styles['c-log-item']}>
      <div className={styles['content-wrapper']}>
        <div className={symbolClasses}>
          <div className={backgroundClasses}>
            {symbolData.background === 'direction' ? <IconDirection /> : null}
            {symbolData.background === 'stick' ? <IconAnalogStick /> : null}
          </div>
          <div className={iconClasses}>
            {icon}
          </div>
        </div>
        <div className={styles.data}>
          <span className={styles.message}>
            {symbolData.message}
          </span>
          {dataString ? <span className={styles['secondary-message']}>{dataString}</span> : null}
        </div>
      </div>
    </div>
  );
}
