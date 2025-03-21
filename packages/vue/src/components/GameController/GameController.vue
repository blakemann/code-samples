<template>
  <div class="c-game-controller">
    <div
      ref="container"
      class="container"
    >
      <ControllerBody
        class="controller-body"
      />
      <TouchPad
        class="touch-pad"
      />
      <ShoulderButton
        class="shoulder-button shoulder-button--left"
        :side="ShoulderButtonSide.Left"
        @pressed="onShoulderPressed(ControllerSide.Left)"
        @released="onShoulderReleased(ControllerSide.Left)"
      />
      <ShoulderButton
        class="shoulder-button shoulder-button--right"
        :side="ShoulderButtonSide.Right"
        @pressed="onShoulderPressed(ControllerSide.Right)"
        @released="onShoulderReleased(ControllerSide.Right)"
      />
      <AnalogStick
        v-model:angle="leftStickValue.angle"
        v-model:force="leftStickValue.force"
        class="analog-stick analog-stick--left"
        @update:angle="onStickMoved(ControllerSide.Left)"
        @update:force="onStickMoved(ControllerSide.Left)"
        @grabbed="onStickGrabbed(ControllerSide.Left)"
        @released="onStickReleased(ControllerSide.Left)"
      />
      <AnalogStick
        v-model:angle="rightStickValue.angle"
        v-model:force="rightStickValue.force"
        class="analog-stick analog-stick--right"
        @update:angle="onStickMoved(ControllerSide.Right)"
        @update:force="onStickMoved(ControllerSide.Right)"
        @grabbed="onStickGrabbed(ControllerSide.Right)"
        @released="onStickReleased(ControllerSide.Right)"
      />
      <DirectionalButton
        v-for="button of directionalButtons"
        :key="button.direction"
        :class="`directional-button directional-button--${button.direction}`"
        :direction="button.direction"
        @pressed="onFaceButtonPressed(ControllerSide.Left, button.input)"
        @released="onFaceButtonReleased(ControllerSide.Left)"
      />
      <ActionButton
        v-for="button of actionButtons"
        :key="button.key"
        :class="`action-button action-button--${button.key}`"
        :color="button.color"
        :label="button.label"
        @pressed="onFaceButtonPressed(ControllerSide.Right, button.input)"
        @released="onFaceButtonReleased(ControllerSide.Right)"
      >
        <component :is="button.icon" />
      </ActionButton>
      <MenuButton
        :side="MenuButtonSide.Left"
        label="Share"
        class="menu-button menu-button--share"
        @pressed="onFaceButtonPressed(ControllerSide.Left, Input.SHARE)"
        @released="onFaceButtonReleased(ControllerSide.Left)"
      >
        <IconShare />
      </MenuButton>
      <MenuButton
        :side="MenuButtonSide.Right"
        label="Options"
        class="menu-button menu-button--options"
        @pressed="onFaceButtonPressed(ControllerSide.Right, Input.OPTIONS)"
        @released="onFaceButtonReleased(ControllerSide.Right)"
      >
        <IconOptions />
      </MenuButton>
      <PlayStationButton
        class="playstation-button"
        @pressed="onFaceButtonPressed(ControllerSide.Center, Input.PS)"
        @released="onFaceButtonReleased(ControllerSide.Center)"
      />
      <MuteButton
        v-model="isMuted"
        class="mute-button"
        @pressed="onFaceButtonPressed(ControllerSide.Center, null)"
        @released="onFaceButtonReleased(ControllerSide.Center)"
        @update:muted="onUpdateMuted"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { gsap } from 'gsap';
  import { ref, useTemplateRef } from 'vue';
  import type { Coord } from '@/shared/utilities/trigonometry';
  import { Input } from '@/shared/utilities/constants';
  import IconCircle from '@/shared/assets/action-circle.svg';
  import IconCross from '@/shared/assets/action-cross.svg';
  import IconSquare from '@/shared/assets/action-square.svg';
  import IconTriangle from '@/shared/assets/action-triangle.svg';
  import IconOptions from '@/shared/assets/menu-options.svg';
  import IconShare from '@/shared/assets/menu-share.svg';
  import { getPointAlongAngle } from '@/shared/utilities/trigonometry';
  import ActionButton, { ActionButtonColor } from '@/vue/components/ActionButton';
  import DirectionalButton, { DirectionalButtonDirection } from '@/vue/components/DirectionalButton';
  import AnalogStick from '@/vue/components/AnalogStick';
  import ControllerBody from '@/vue/components/ControllerBody';
  import MenuButton, { MenuButtonSide } from '@/vue/components/MenuButton';
  import MuteButton from '@/vue/components/MuteButton';
  import PlayStationButton from '@/vue/components/PlayStationButton';
  import ShoulderButton, { ShoulderButtonSide } from '@/vue/components/ShoulderButton';
  import TouchPad from '@/vue/components/TouchPad';

  export enum ComponentEvent {
    Input = 'input',
    InputDataUpdate = 'InputDataUpdate',
  }

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
    icon: string,
    input: Input,
  }
</script>

<script setup lang="ts">
  // defines

  const emit:Function = defineEmits(Object.values(ComponentEvent));

  // data

  const container = useTemplateRef<HTMLDivElement>('container');
  const leftStickValue = ref<StickInput>({ angle: 0, force: 0 });
  const rightStickValue = ref<StickInput>({ angle: 0, force: 0 });
  const isMuted = ref<boolean>(false);

  const directionalButtons:Array<DirectionalButtonData> = [
    { direction: DirectionalButtonDirection.Up, input: Input.UP },
    { direction: DirectionalButtonDirection.Down, input: Input.DOWN },
    { direction: DirectionalButtonDirection.Left, input: Input.LEFT },
    { direction: DirectionalButtonDirection.Right, input: Input.RIGHT },
  ];

  const actionButtons:Array<ActionButtonData> = [
    { key: 'triangle', label: 'Triangle', color: ActionButtonColor.Green, icon: IconTriangle, input: Input.TRIANGLE },
    { key: 'circle', label: 'Circle', color: ActionButtonColor.Red, icon: IconCircle, input: Input.CIRCLE },
    { key: 'cross', label: 'Cross', color: ActionButtonColor.Blue, icon: IconCross, input: Input.CROSS },
    { key: 'square', label: 'Square', color: ActionButtonColor.Pink, icon: IconSquare, input: Input.SQUARE },
  ];

  // methods

  function onShoulderPressed(side:ControllerSide):void {
    // animate push in
    const transformOrigin:string = (side === ControllerSide.Left) ? 'top right' : 'top left';
    const rotate:string = (side === ControllerSide.Left) ? '-0.5deg' : '0.5deg';
    gsap.set(container.value, { transformOrigin });
    gsap.to(container.value, { rotate, duration: 0.2, ease: 'power2.inOut' });
    // emit input event
    emit(ComponentEvent.Input, (side === ControllerSide.Left) ? Input.L1 : Input.R1);
  }

  function onShoulderReleased(side:ControllerSide):void {
    // animate back to default state
    const transformOrigin:string = (side === ControllerSide.Left) ? 'top right' : 'top left';
    gsap.set(container.value, { transformOrigin });
    gsap.to(container.value, { rotate: 0, duration: 0.2, ease: 'power2.inOut' });
  }

  function onStickGrabbed(side:ControllerSide):void {
    // emit input event for appropriate stick
    if (side === ControllerSide.Left) {
      emit(ComponentEvent.Input, Input.LEFTSTICK, formatStickData(leftStickValue.value));
    } else if (side === ControllerSide.Right) {
      emit(ComponentEvent.Input, Input.RIGHTSTICK, formatStickData(rightStickValue.value));
    }
    // trigger initial move state
    onStickMoved(side);
  }

  function onStickMoved(side:ControllerSide):void {
    // calculate position values based on stick input for current side
    const transformOrigin:string = (side === ControllerSide.Left) ? 'center right' : 'center left';
    const maxTranslation:number = 0.75;
    const maxRotation:number = 0.4;
    const { angle, force }:StickInput = (side === ControllerSide.Left) ? leftStickValue.value : rightStickValue.value;
    const translation:Coord = getPointAlongAngle(0, 0, angle, maxTranslation * force);
    const rotation:Coord = getPointAlongAngle(0, 0, angle, maxRotation * force);
    const rotationBoost:number = (side === ControllerSide.Left) ? 2 : -2;
    // kill existing animations before starting a new one
    gsap.killTweensOf(container.value);
    // animate container to new position
    gsap.set(container.value, { transformOrigin });
    gsap.to(container.value, {
      scale: 0.975,
      x: `${translation.x}%`,
      y: `${translation.y}%`,
      rotateX: `${-rotation.y}deg`,
      rotateY: `${-rotation.x + rotationBoost}deg`,
      duration: 0.25,
      ease: 'power1.out',
    });
    // emit data update event
    emit(ComponentEvent.InputDataUpdate, formatStickData({ angle, force }));
  }

  function onStickReleased(side:ControllerSide):void {
    // animate back to default state
    const transformOrigin:string = (side === ControllerSide.Left) ? 'center right' : 'center left';
    gsap.set(container.value, { transformOrigin });
    gsap.to(container.value, { rotateY: 0, x: 0, y: 0, scale: 1, duration: 0.25, ease: 'power1.inOut' });
  }

  function onFaceButtonPressed(side:ControllerSide, input:Input|null):void {
    // animate push in on specified side
    if (side === ControllerSide.Left) {
      gsap.set(container.value, { transformOrigin: 'center right' });
      gsap.to(container.value, { rotateY: -0.6, x: '0.3%', y: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' });
    } else if (side === ControllerSide.Right) {
      gsap.set(container.value, { transformOrigin: 'center left' });
      gsap.to(container.value, { rotateY: 0.6, x: '-0.3%', y: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' });
    } else {
      gsap.set(container.value, { transformOrigin: 'center center' });
      gsap.to(container.value, { scale: 0.99, duration: 0.15, ease: 'power1.inOut' });
    }
    // emit input event if applicable
    if (input) {
      emit(ComponentEvent.Input, input);
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
    if (side === ControllerSide.Left) {
      gsap.set(container.value, { transformOrigin: 'center right' });
    } else if (side === ControllerSide.Right) {
      gsap.set(container.value, { transformOrigin: 'center left' });
    } else {
      gsap.set(container.value, { transformOrigin: 'center center' });
    }
    gsap.to(container.value, { rotateY: 0, x: 0, y: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' });
  }

  function onUpdateMuted(value:boolean):void {
    emit(ComponentEvent.Input, value ? Input.MUTE : Input.UNMUTE);
  }
</script>

<style lang="scss" scoped>
  .c-game-controller {
    perspective: 600px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container {
    position: relative;
  }

  .controller-body {
    position: relative;
    z-index: 100;
    pointer-events: none;
  }

  .touch-pad {
    width: 34%;
    position: absolute;
    top: -1%;
    left: 50%;
    transform: translateX(-50%);
    filter: drop-shadow(0 5px 3px rgb(0 0 0 / 50%));
    z-index: 110;
  }

  .shoulder-button {
    $h-offset: 17%;
    $v-offset: -1.8%;

    width: 12%;
    position: absolute;
    top: $v-offset;
    z-index: 90;

    &--left {
      left: $h-offset;
    }

    &--right {
      right: $h-offset;
    }
  }

  .analog-stick {
    $h-offset: 31.8%;
    $v-offset: 36.6%;

    width: 9.8%;
    position: absolute;
    top: $v-offset;
    z-index: 110;

    &--left {
      left: $h-offset;
    }

    &--right {
      right: $h-offset;
    }
  }

  .action-button {
    width: 5.75%;
    position: absolute;
    z-index: 110;

    &--triangle {
      top: 11%;
      right: 20%;
    }

    &--circle {
      top: 20.5%;
      right: 14%;
    }

    &--cross {
      top: 30.75%;
      right: 20%;
    }

    &--square {
      top: 20.5%;
      right: 26%;
    }
  }

  .directional-button {
    width: 5.3%;
    position: absolute;
    z-index: 110;

    &--up {
      top: 13%;
      left: 21%;
    }

    &--down {
      top: 28%;
      left: 21%;
    }

    &--left {
      top: 20.3%;
      left: 16.5%;
    }

    &--right {
      top: 20.3%;
      left: 25.5%;
    }
  }

  .menu-button {
    $h-offset: 28.5%;

    width: 2.5%;
    position: absolute;
    z-index: 110;
    top: 4%;

    &--share {
      left: $h-offset;
    }

    &--options {
      right: $h-offset;
    }
  }

  .playstation-button {
    width: 5%;
    position: absolute;
    z-index: 110;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
  }

  .mute-button {
    width: 4%;
    position: absolute;
    z-index: 110;
    top: 51%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
