<template>
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
      side="left"
      @pressed="onShoulderPressed('left')"
      @released="onShoulderReleased('left')"
    />
    <ShoulderButton
      class="shoulder-button shoulder-button--right"
      side="right"
      @pressed="onShoulderPressed('right')"
      @released="onShoulderReleased('right')"
    />
    <AnalogStick
      v-model:angle="leftStickValue.angle"
      v-model:force="leftStickValue.force"
      class="analog-stick analog-stick--left"
      @update:angle="onStickMoved('left')"
      @update:force="onStickMoved('left')"
      @grabbed="onStickMoved('left')"
      @released="onStickReleased('left')"
    />
    <AnalogStick
      v-model:angle="rightStickValue.angle"
      v-model:force="rightStickValue.force"
      class="analog-stick analog-stick--right"
      @update:angle="onStickMoved('right')"
      @update:force="onStickMoved('right')"
      @grabbed="onStickMoved('right')"
      @released="onStickReleased('right')"
    />
    <DirectionalButton
      v-for="button of directionalButtons"
      :key="button.direction"
      :class="`directional-button directional-button--${button.direction}`"
      :direction="button.direction"
      @pressed="onFaceButtonPressed('left', button.direction)"
      @released="onFaceButtonReleased('left')"
    />
    <ActionButton
      v-for="button of actionButtons"
      :key="button.key"
      :class="`action-button action-button--${button.key}`"
      :color="button.color"
      :label="button.label"
      @pressed="onFaceButtonPressed('right', button.key)"
      @released="onFaceButtonReleased('right')"
    >
      <component :is="button.icon" />
    </ActionButton>
    <MenuButton
      side="left"
      label="Share"
      class="menu-button menu-button--share"
      @pressed="onFaceButtonPressed('left', 'left')"
      @released="onFaceButtonReleased('left')"
    >
      <IconShare />
    </MenuButton>
    <MenuButton
      side="right"
      label="Options"
      class="menu-button menu-button--options"
      @pressed="onFaceButtonPressed('right', 'options')"
      @released="onFaceButtonReleased('right')"
    >
      <IconOptions />
    </MenuButton>
    <PlayStationButton
      class="playstation-button"
      @pressed="onFaceButtonPressed('center', 'ps')"
      @released="onFaceButtonReleased('center')"
    />
    <MuteButton
      class="mute-button"
      @pressed="onFaceButtonPressed('center', null)"
      @released="onFaceButtonReleased('center')"
      @update:muted="onUpdateMuted"
    />
  </div>
</template>

<script setup>
  import { gsap } from 'gsap';
  import { ref } from 'vue';
  import IconCircle from './assets/action-circle.svg';
  import IconCross from './assets/action-cross.svg';
  import IconSquare from './assets/action-square.svg';
  import IconTriangle from './assets/action-triangle.svg';
  import IconOptions from './assets/menu-options.svg';
  import IconShare from './assets/menu-share.svg';
  import ActionButton from '@/components/ActionButton';
  import AnalogStick from '@/components/AnalogStick';
  import ControllerBody from '@/components/ControllerBody';
  import DirectionalButton from '@/components/DirectionalButton';
  import MenuButton from '@/components/MenuButton';
  import MuteButton from '@/components/MuteButton';
  import PlayStationButton from '@/components/PlayStationButton';
  import ShoulderButton from '@/components/ShoulderButton';
  import TouchPad from '@/components/TouchPad';
  import { getPointAlongAngle } from '@/utilities/trigonometry';

  // data

  const container = ref(null);
  const leftStickValue = ref({ angle: 0, force: 0 });
  const rightStickValue = ref({ angle: 0, force: 0 });

  const directionalButtons = [
    { direction: 'up' },
    { direction: 'down' },
    { direction: 'left' },
    { direction: 'right' },
  ];

  const actionButtons = [
    { key: 'triangle', label: 'Triangle', color: 'green', icon: IconTriangle },
    { key: 'circle', label: 'Circle', color: 'red', icon: IconCircle },
    { key: 'cross', label: 'Cross', color: 'blue', icon: IconCross },
    { key: 'square', label: 'Square', color: 'pink', icon: IconSquare },
  ];

  // methods

  function onShoulderPressed(side) {
    const $el = container.value;
    const transformOrigin = (side === 'left') ? 'top right' : 'top left';
    const rotate = (side === 'left') ? '-0.5deg' : '0.5deg';
    gsap.set($el, { transformOrigin });
    gsap.to($el, { rotate, duration: 0.2, ease: 'power2.inOut' });
  }

  function onShoulderReleased(side) {
    const $el = container.value;
    const transformOrigin = (side === 'left') ? 'top right' : 'top left';
    gsap.set($el, { transformOrigin });
    gsap.to($el, { rotate: 0, duration: 0.2, ease: 'power2.inOut' });
  }

  function onStickMoved(side) {
    const $el = container.value;
    const transformOrigin = (side === 'left') ? 'center right' : 'center left';
    const maxTranslation = 0.75;
    const maxRotation = 0.4;
    const { angle, force } = (side === 'left') ? leftStickValue.value : rightStickValue.value;
    const translation = getPointAlongAngle(0, 0, angle, maxTranslation * force);
    const rotation = getPointAlongAngle(0, 0, angle, maxRotation * force);
    const rotationBoost = (side === 'left') ? 2 : -2;
    gsap.killTweensOf($el);
    gsap.set($el, { transformOrigin });
    gsap.to($el, {
      scale: 0.975,
      x: `${translation.x}%`,
      y: `${translation.y}%`,
      rotateX: `${-rotation.y}deg`,
      rotateY: `${-rotation.x + rotationBoost}deg`,
      duration: 0.25,
      ease: 'power1.out',
    });
  }

  function onStickReleased(side) {
    const $el = container.value;
    const transformOrigin = (side === 'left') ? 'center right' : 'center left';
    gsap.set($el, { transformOrigin });
    gsap.to($el, { rotateY: 0, x: 0, y: 0, scale: 1, duration: 0.25, ease: 'power1.inOut' });
  }

  function onFaceButtonPressed(side, button) {
    const $el = container.value;
    if (side === 'left') {
      gsap.set($el, { transformOrigin: 'center right' });
      gsap.to($el, { rotateY: -0.6, x: '0.3%', y: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' });
    } else if (side === 'right') {
      gsap.set($el, { transformOrigin: 'center left' });
      gsap.to($el, { rotateY: 0.6, x: '-0.3%', y: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' });
    } else {
      gsap.set($el, { transformOrigin: 'center center' });
      gsap.to($el, { scale: 0.99, duration: 0.15, ease: 'power1.inOut' });
    }
  }

  function onFaceButtonReleased(side) {
    const $el = container.value;
    if (side === 'left') {
      gsap.set($el, { transformOrigin: 'center right' });
    } else if (side === 'right') {
      gsap.set($el, { transformOrigin: 'center left' });
    } else {
      gsap.set($el, { transformOrigin: 'center center' });
    }
    gsap.to($el, { rotateY: 0, x: 0, y: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' });
  }

  function onUpdateMuted(value) {
    console.log(value);
  }
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
    filter: drop-shadow(0 5px 3px rgba(0, 0, 0, 0.5));
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
    width: 5.5%;
    position: absolute;
    z-index: 110;

    &--triangle {
      top: 11%;
      right: 21%;
    }

    &--circle {
      top: 20.5%;
      right: 15%;
    }

    &--cross {
      top: 30.75%;
      right: 21%;
    }

    &--square {
      top: 20.5%;
      right: 27%;
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
