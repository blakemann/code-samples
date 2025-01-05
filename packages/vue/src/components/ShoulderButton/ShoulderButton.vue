<template>
  <button
    type="button"
    :class="`root root--side-${side}`"
    :aria-label="side === 'left' ? 'L1' : 'R1'"
    @mousedown="onMouseDown"
  >
    <ShoulderButtonGraphic
      ref="graphic"
      class="graphic"
    />
  </button>
</template>

<script setup>
  import { gsap } from 'gsap';
  import { ref } from 'vue';
  import ShoulderButtonGraphic from './assets/shoulder-button.svg';
  import { useGlobalRelease } from '@/composables';

  defineProps({
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

  const graphic = ref(null);
  const isDown = ref(false);

  // methods

  function onMouseDown() {
    isDown.value = true;
    emit('pressed');
    const { $el } = graphic.value;
    gsap.to($el, { y: '20%', duration: 0.1, ease: 'power2.inOut' });
  }

  function onRelease() {
    isDown.value = false;
    emit('released');
    const { $el } = graphic.value;
    gsap.to($el, { y: 0, duration: 0.1, ease: 'power2.inOut' });
  }

  useGlobalRelease(isDown, onRelease);
</script>

<style lang="scss" scoped>
  @use '@/styles/core' as *;

  .root {
    @include button-reset();

    &--side-right {
      .graphic {
        transform: scaleX(-100%);
      }
    }
  }

  .graphic {
    width: 100%;
  }
</style>
