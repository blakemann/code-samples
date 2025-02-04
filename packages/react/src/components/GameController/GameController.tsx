import { gsap } from 'gsap';
import type { ReactNode } from 'react';
import { useState, useRef } from 'react';
import type { Coord } from '@/shared/utilities/trigonometry';
import type { LogItemData } from '@/react/components/LogItem';
import { Input } from '@/shared/utilities/constants';
import IconCircle from '@/shared/assets/action-circle.svg?react';
import IconCross from '@/shared/assets/action-cross.svg?react';
import IconSquare from '@/shared/assets/action-square.svg?react';
import IconTriangle from '@/shared/assets/action-triangle.svg?react';
import IconOptions from '@/shared/assets/menu-options.svg?react';
import IconShare from '@/shared/assets/menu-share.svg?react';
import { getPointAlongAngle } from '@/shared/utilities/trigonometry';
import ActionButton, { ActionButtonColor } from '@/react/components/ActionButton';
import DirectionalButton, { DirectionalButtonDirection } from '@/react/components/DirectionalButton';
import AnalogStick from '@/react/components/AnalogStick';
import ControllerBody from '@/react/components/ControllerBody';
import MenuButton, { MenuButtonSide } from '@/react/components/MenuButton';
import MuteButton from '@/react/components/MuteButton';
import PlayStationButton from '@/react/components/PlayStationButton';
import ShoulderButton, { ShoulderButtonSide } from '@/react/components/ShoulderButton';
import TouchPad from '@/react/components/TouchPad';
import styles from './index.module.scss';

enum ControllerSide {
  Left,
  Center,
  Right,
}

type StickInput = {
  angle: number,
  force: number,
};

type DirectionalButtonData = {
  direction: DirectionalButtonDirection,
  input: Input,
}

type ActionButtonData = {
  key: string,
  label: string,
  color: ActionButtonColor,
  icon: ReactNode,
  input: Input,
}

interface Props {
  onInput?: (input:Input, data?:LogItemData) => void | undefined,
  onUpdateInputData?: (data:LogItemData) => void | undefined,
}

const directionalButtons:Array<DirectionalButtonData> = [
  { direction: DirectionalButtonDirection.Up, input: Input.UP },
  { direction: DirectionalButtonDirection.Down, input: Input.DOWN },
  { direction: DirectionalButtonDirection.Left, input: Input.LEFT },
  { direction: DirectionalButtonDirection.Right, input: Input.RIGHT },
];

const actionButtons:Array<ActionButtonData> = [
  { key: 'triangle', label: 'Triangle', color: ActionButtonColor.Green, icon: <IconTriangle />, input: Input.TRIANGLE },
  { key: 'circle', label: 'Circle', color: ActionButtonColor.Red, icon: <IconCircle />, input: Input.CIRCLE },
  { key: 'cross', label: 'Cross', color: ActionButtonColor.Blue, icon: <IconCross />, input: Input.CROSS },
  { key: 'square', label: 'Square', color: ActionButtonColor.Pink, icon: <IconSquare />, input: Input.SQUARE },
];

export default function GameController({ onInput, onUpdateInputData }:Props) {
  // state

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [leftStickValue, setLeftStickValue] = useState<StickInput>({ angle: 0, force: 0 });
  const [rightStickValue, setRightStickValue] = useState<StickInput>({ angle: 0, force: 0 });

  // data

  const container = useRef<HTMLDivElement|null>(null);

  // event handlers

  function onShoulderPressed(side:ControllerSide):void {
    // animate push in
    if (container.current) {
      const transformOrigin:string = (side === ControllerSide.Left) ? 'top right' : 'top left';
      const rotate:string = (side === ControllerSide.Left) ? '-0.5deg' : '0.5deg';
      gsap.set(container.current, { transformOrigin });
      gsap.to(container.current, { rotate, duration: 0.2, ease: 'power2.inOut' });
    }
    // emit input event
    onInput?.((side === ControllerSide.Left) ? Input.L1 : Input.R1);
  }

  function onShoulderReleased(side:ControllerSide):void {
    // animate back to default state
    if (container.current) {
      const transformOrigin:string = (side === ControllerSide.Left) ? 'top right' : 'top left';
      gsap.set(container.current, { transformOrigin });
      gsap.to(container.current, { rotate: 0, duration: 0.2, ease: 'power2.inOut' });
    }
  }

  function onStickGrabbed(side:ControllerSide):void {
    // emit input event for appropriate stick
    if (side === ControllerSide.Left) {
      onInput?.(Input.LEFTSTICK, formatStickData(leftStickValue));
    } else if (side === ControllerSide.Right) {
      onInput?.(Input.RIGHTSTICK, formatStickData(rightStickValue));
    }
    // trigger initial move state
    onStickMoved(side);
  }

  function onStickMoved(side:ControllerSide):void {
    // calculate position values based on stick input for current side
    const transformOrigin:string = (side === ControllerSide.Left) ? 'center right' : 'center left';
    const maxTranslation:number = 0.75;
    const maxRotation:number = 0.4;
    const { angle, force }:StickInput = (side === ControllerSide.Left) ? leftStickValue : rightStickValue;
    const translation:Coord = getPointAlongAngle(0, 0, angle, maxTranslation * force);
    const rotation:Coord = getPointAlongAngle(0, 0, angle, maxRotation * force);
    const rotationBoost:number = (side === ControllerSide.Left) ? 2 : -2;
    if (container.current) {
      // kill existing animations before starting a new one
      gsap.killTweensOf(container.current);
      // animate container to new position
      gsap.set(container.current, { transformOrigin });
      gsap.to(container.current, {
        scale: 0.975,
        x: `${translation.x}%`,
        y: `${translation.y}%`,
        rotateX: `${-rotation.y}deg`,
        rotateY: `${-rotation.x + rotationBoost}deg`,
        duration: 0.25,
        ease: 'power1.out',
      });
    }
    // emit data update event
    onUpdateInputData?.(formatStickData({ angle, force }));
  }

  function onStickReleased(side:ControllerSide):void {
    // animate back to default state
    if (container.current) {
      const transformOrigin:string = (side === ControllerSide.Left) ? 'center right' : 'center left';
      gsap.set(container.current, { transformOrigin });
      gsap.to(container.current, { rotateY: 0, x: 0, y: 0, scale: 1, duration: 0.25, ease: 'power1.inOut' });
    }
  }

  function onFaceButtonPressed(side:ControllerSide, input:Input|null):void {
    // animate push in on specified side
    if (container.current) {
      if (side === ControllerSide.Left) {
        gsap.set(container.current, { transformOrigin: 'center right' });
        gsap.to(container.current, { rotateY: -0.6, x: '0.3%', y: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' });
      } else if (side === ControllerSide.Right) {
        gsap.set(container.current, { transformOrigin: 'center left' });
        gsap.to(container.current, { rotateY: 0.6, x: '-0.3%', y: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' });
      } else {
        gsap.set(container.current, { transformOrigin: 'center center' });
        gsap.to(container.current, { scale: 0.99, duration: 0.15, ease: 'power1.inOut' });
      }
    }
    // emit input event if applicable
    if (input) {
      onInput?.(input);
    }
  }

  function formatStickData({ angle, force }:StickInput):StickInput {
    // return stick input data adjusted for display requirements
    const shiftedAngle:number = angle + 90;
    return {
      angle: (shiftedAngle < 0) ? Math.round(180 + (180 + shiftedAngle)) : Math.round(shiftedAngle),
      force: Math.round(force * 100),
    };
  }

  function onFaceButtonReleased(side:ControllerSide):void {
    // animate back to initial state
    if (container.current) {
      if (side === ControllerSide.Left) {
        gsap.set(container.current, { transformOrigin: 'center right' });
      } else if (side === ControllerSide.Right) {
        gsap.set(container.current, { transformOrigin: 'center left' });
      } else {
        gsap.set(container.current, { transformOrigin: 'center center' });
      }
      gsap.to(container.current, { rotateY: 0, x: 0, y: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' });
    }
  }

  function onUpdateMuted(value:boolean):void {
    setIsMuted(value);
    onInput?.(value ? Input.MUTE : Input.UNMUTE);
  }

  // template

  const directionalButtonElements = directionalButtons.map((button) => (
    <div
      key={button.direction}
      className={`${styles['directional-button']} ${styles[`directional-button--${button.direction}`]}`}
    >
      <DirectionalButton
        direction={button.direction}
        onPressed={() => onFaceButtonPressed(ControllerSide.Left, button.input)}
        onReleased={() => onFaceButtonReleased(ControllerSide.Left)}
      />
    </div>
  ));

  const actionButtonElements = actionButtons.map((button) => (
    <div
      key={button.key}
      className={`${styles['action-button']} ${styles[`action-button--${button.key}`]}`}
    >
      <ActionButton
        color={button.color}
        label={button.label}
        onPressed={() => onFaceButtonPressed(ControllerSide.Right, button.input)}
        onReleased={() => onFaceButtonReleased(ControllerSide.Right)}
      >
        {button.icon}
      </ActionButton>
    </div>
  ));

  return (
    <div className={styles['c-game-controller']}>
      <div
        ref={container}
        className={styles.container}
      >
        <div className={styles['controller-body']}>
          <ControllerBody />
        </div>
        <div className={styles['touch-pad']}>
          <TouchPad />
        </div>
        <div className={`${styles['shoulder-button']} ${styles['shoulder-button--left']}`}>
          <ShoulderButton
            side={ShoulderButtonSide.Left}
            onPressed={() => onShoulderPressed(ControllerSide.Left)}
            onReleased={() => onShoulderReleased(ControllerSide.Left)}
          />
        </div>
        <div className={`${styles['shoulder-button']} ${styles['shoulder-button--right']}`}>
          <ShoulderButton
            side={ShoulderButtonSide.Right}
            onPressed={() => onShoulderPressed(ControllerSide.Right)}
            onReleased={() => onShoulderReleased(ControllerSide.Right)}
          />
        </div>
        <div className={`${styles['analog-stick']} ${styles['analog-stick--left']}`}>
          <AnalogStick
            angle={leftStickValue.angle}
            force={leftStickValue.force}
            onUpdateAngle={(angle:number):void => { onStickMoved(ControllerSide.Left); setLeftStickValue((prev) => ({ ...prev, angle })) }}
            onUpdateForce={(force:number):void => { onStickMoved(ControllerSide.Left); setLeftStickValue((prev) => ({ ...prev, force })) }}
            onGrabbed={() => onStickGrabbed(ControllerSide.Left)}
            onReleased={() => onStickReleased(ControllerSide.Left)}
          />
        </div>
        <div className={`${styles['analog-stick']} ${styles['analog-stick--right']}`}>
          <AnalogStick
            angle={rightStickValue.angle}
            force={rightStickValue.force}
            onUpdateAngle={(angle:number):void => { onStickMoved(ControllerSide.Right); setRightStickValue((prev) => ({ ...prev, angle })) }}
            onUpdateForce={(force:number):void => { onStickMoved(ControllerSide.Right); setRightStickValue((prev) => ({ ...prev, force })) }}
            onGrabbed={() => onStickGrabbed(ControllerSide.Right)}
            onReleased={() => onStickReleased(ControllerSide.Right)}
          />
        </div>
        <div className={`${styles['menu-button']} ${styles['menu-button--share']}`}>
          <MenuButton
            side={MenuButtonSide.Left}
            label="Share"
            onPressed={() => onFaceButtonPressed(ControllerSide.Left, Input.SHARE)}
            onReleased={() => onFaceButtonReleased(ControllerSide.Left)}
          >
            <IconShare />
          </MenuButton>
        </div>
        <div className={`${styles['menu-button']} ${styles['menu-button--options']}`}>
          <MenuButton
            side={MenuButtonSide.Right}
            label="Options"
            onPressed={() => onFaceButtonPressed(ControllerSide.Right, Input.OPTIONS)}
            onReleased={() => onFaceButtonReleased(ControllerSide.Right)}
          >
            <IconOptions />
          </MenuButton>
        </div>
        <div className={styles['playstation-button']}>
          <PlayStationButton
            onPressed={() => onFaceButtonPressed(ControllerSide.Center, Input.PS)}
            onReleased={() => onFaceButtonReleased(ControllerSide.Center)}
          />
        </div>
        <div className={styles['mute-button']}>
          <MuteButton
            v-model="isMuted"
            muted={isMuted}
            onUpdateMuted={onUpdateMuted}
            onPressed={() => onFaceButtonPressed(ControllerSide.Center, null)}
            onReleased={() => onFaceButtonReleased(ControllerSide.Center)}
          />
        </div>
        {directionalButtonElements}
        {actionButtonElements}
      </div>
    </div>
  );
}
