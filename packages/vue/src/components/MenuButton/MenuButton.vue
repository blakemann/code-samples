<template>
  <div class="root">
    <div class="icon">
      <slot />
    </div>
    <div
      :class="{
        recess: true,
        [`recess--side-${side}`]: true,
        'recess--lit': isDown || recessLit,
      }"
    >
      <button
        type="button"
        :class="{
          button: true,
          'button--pressed': isDown,
        }"
        :aria-label="label"
        @mousedown="onMouseDown"
      />
    </div>
  </div>
</template>

<script setup>
  import { gsap } from 'gsap';
  import { ref } from 'vue';
  import { useGlobalRelease } from '@/composables';

  defineProps({
    label: {
      type: String,
      required: true,
    },
    side: {
      type: String,
      validator(value) {
        return ['left', 'right'].includes(value);
      },
      default: 'left',
    },
  });

  const emit = defineEmits([
    'pressed',
    'released',
  ]);

  // data

  const isDown = ref(false);
  const recessLit = ref(false);
  let lightingTimeout = null;

  // methods

  function onMouseDown() {
    isDown.value = true;
    emit('pressed');
    recessLit.value = true;
    if (lightingTimeout) {
      clearTimeout(lightingTimeout);
    }
    lightingTimeout = setTimeout(() => {
      recessLit.value = false;
    }, 250);
  }

  function onRelease() {
    isDown.value = false;
    emit('released');
  }

  useGlobalRelease(isDown, onRelease);
</script>

<style lang="scss" scoped>
  @use '@/styles/core' as *;

  .root {
    width: 100%;
    line-height: 0;
  }

  .icon {
    width: 60%;
    margin: auto;
    fill: #45494d;
  }

  .recess {
    background: #222;
    border-radius: 100vw;
    width: 75%;
    aspect-ratio: 1 / 2;
    transform-origin: top center;
    margin-top: 10%;
    padding: 5%;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(#fc0 0%, #f92ff7 50%, #3197ff 100%);
      border: 1px solid rgba(0, 0, 0, 0.25);
      opacity: 0;
      transition: 0.25s opacity ease-in-out;
    }

    &--side-left {
      rotate: -11deg;
      margin-left: 12%;
    }

    &--side-right {
      rotate: 11deg;
      margin-left: -5%;

    }

    &--lit::before {
      opacity: 0.9;
    }
  }

  .button {
    @include button-reset();
    background: linear-gradient(0deg, #8b8c96, #ccc);
    border-radius: inherit;
    position: relative;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    transition: 0.1s all ease-in-out;

    &::before {
      content: '';
      position: absolute;
      inset: 5% 11%;
      background: #9e9faa;
      border-radius: inherit;
      z-index: 1;
    }

    &--pressed {
      transform: scale(0.85, 0.88);
      outline: 2px solid rgba(0, 0, 0, 0.25);
    }
  }
</style>
