<template>
  <span class="c-action-button">
    <span class="recess">
      <button
        type="button"
        :class="{
          button: true,
          [`button--color-${color}`]: true,
          'button--pressed': isDown,
        }"
        :aria-label="label"
        @mousedown="onMouseDown"
      >
        <slot />
        <span
          ref="shimmer"
          class="shimmer"
        />
      </button>
    </span>
  </span>
</template>

<script lang="ts">
  import { gsap } from 'gsap';
  import { ref, useTemplateRef } from 'vue';
  import { useGlobalRelease } from '@/composables';

  export enum Color {
    Green = 'green',
    Red = 'red',
    Blue = 'blue',
    Pink = 'pink',
  }

  export enum ComponentEvent {
    Pressed = 'pressed',
    Released = 'released',
  }

  interface Props {
    label: string,
    color: Color,
  }
</script>

<script setup lang="ts">
  // defines

  const { color = Color.Green } = defineProps<Props>();

  const emit:Function = defineEmits(Object.values(ComponentEvent));

  // data

  const shimmer = useTemplateRef<HTMLSpanElement>('shimmer');
  const isDown = ref<boolean>(false);
  let shimmerTimeline:GSAPTimeline|null = null;

  // methods

  function onMouseDown():void {
    // update internal state
    isDown.value = true;
    // emit event
    emit(ComponentEvent.Pressed);
    // animate
    if (shimmer.value) {
      if (shimmerTimeline) {
        shimmerTimeline.kill();
      }
      shimmerTimeline = gsap.timeline();
      shimmerTimeline.to(shimmer.value, { opacity: 1, duration: 0.1, ease: 'power1.easeIn' });
      shimmerTimeline.to(shimmer.value, { opacity: 0, duration: 0.5, ease: 'power1.easeOut' });
      shimmerTimeline.fromTo(shimmer.value, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'power1.easeIn' }, 0);
    }
  }

  function onRelease():void {
    // update internal state
    isDown.value = false;
    // emit event
    emit(ComponentEvent.Released);
  }

  useGlobalRelease(isDown, onRelease);
</script>

<style lang="scss" scoped>
  @use '@/styles/core' as *;

  .c-action-button {
    width: 100%;
    aspect-ratio: 1 / 1;
    display: inline-block;
  }

  .recess {
    background: #222;
    border-radius: 50%;
    padding: 5%;
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  .button {
    @include button-reset();
    background: linear-gradient(0deg, #000, #ccc);
    border-radius: inherit;
    padding: 15%;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.1s transform ease-in-out;

    &::before {
      content: '';
      position: absolute;
      inset: 3%;
      background: #3b3e45;
      border-radius: inherit;
      z-index: 1;
    }

    :deep(svg) {
      width: 100%;
      height: 100%;
      fill: currentColor;
      vertical-align: top;
      position: relative;
      z-index: 3;
      transition: 0.1s all ease-in-out;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 11%;
      right: 11%;
      height: 57.5%;
      background: linear-gradient(rgba(255, 255, 255, 0.4) 20%, rgba(255, 255, 255, 0) 100%);
      border-radius: inherit;
      z-index: 4;
    }

    &--color-green {
      color: #26c9b4;
      --shimmer-color: #66ff6d;
      --shimmer-accent: #458308;
    }

    &--color-red {
      color: #f586a7;
      --shimmer-color: #ffa02f;
      --shimmer-accent: #d60000;
    }

    &--color-blue {
      color: #69aefb;
      --shimmer-color: #00f0ff;
      --shimmer-accent: #62f;
    }

    &--color-pink {
      color: #ebbee9;
      --shimmer-color: #ff93df;
      --shimmer-accent: #9331d1;
    }

    .shimmer {
      position: absolute;
      top: -380%;
      left: -380%;
      width: 750%;
      height: 750%;
      border-radius: inherit;
      background: radial-gradient(closest-side, var(--shimmer-color) 10%, var(--shimmer-accent) 30%, var(--shimmer-accent) 60%, transparent 100%);
      background-size: contain;
      transform: scale(0);
      z-index: 2;
      opacity: 0;
    }

    &--pressed {
      color: var(--shimmer-color);
      transform: scale(0.85);
    }
  }
</style>
