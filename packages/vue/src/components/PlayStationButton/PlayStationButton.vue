<template>
  <div class="c-playstation-button">
    <div
      :class="{
        recess: true,
        'recess--lit': isDown || recessLit,
      }"
    >
      <RecessGraphic class="recess-graphic" />
      <button
        type="button"
        :class="{
          button: true,
          'button--pressed': isDown,
        }"
        aria-label="PS Button"
        @mousedown="onMouseDown"
      >
        <PlayStationLogoGraphic />
        <svg
          class="shimmer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 62 46.72"
        >
          <defs>
            <linearGradient
              :id="shimmerGradientValues.id"
              ref="shimmerGradient"
              v-bind="shimmerGradientValues.size"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                v-for="stop of shimmerGradientValues.stops"
                :offset="stop.offset"
                :stop-color="stop.color"
                :stop-opacity="stop.opacity"
              />
            </linearGradient>
          </defs>
          <path
            :fill="`url(#${shimmerGradientValues.id})`"
            d="M33.45,9.41l-.04,37.31-10-3.25V1.29c0-.84.8-1.46,1.61-1.24l11.15,2.95c8.17,2.2,13.17,6.46,13.08,13.94-.08,8.7-4.1,12.19-11.95,9.92V9.7c0-2.07-3.86-2.19-3.86-.28h0ZM61.94,33.56c-.65-2.93-5.32-4.52-12.51-5.04-4.84-.35-9.62.64-14.29,2.18v5.8l7.18-2.46,5.2-1.74c5.44-1.02,7.64.77,2.4,2.43l-2.6.9h-.01l-12.17,4.16v6.36l7.1-2.47,14.5-5.13.17-.04c3.81-1.34,5.44-3.21,5.03-4.95ZM19.48,26.97l-14.3,4.84s-.13.04-.21.04C2.33,32.74-.15,34.65,0,37.34c.17,2.72,6.38,3.37,11.18,4.14,3.79.62,7.28.43,10.51-.44v-5.77l-2.87.97-4.71,1.58c-3.05,1.06-5.65-1.42-2.85-2.44l2.28-.81,8.15-2.91v-5.45l-2.22.76Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { gsap } from 'gsap';
  import { uniqueId } from 'lodash-es';
  import { ref, useTemplateRef } from 'vue';
  import RecessGraphic from './assets/recess.svg';
  import PlayStationLogoGraphic from './assets/playstation-logo.svg';
  import { useGlobalRelease } from '@/vue/composables';

  export enum ComponentEvent {
    Pressed = 'pressed',
    Released = 'released',
  }

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
</script>

<script setup lang="ts">
  // defines

  const emit = defineEmits(Object.values(ComponentEvent));

  // data

  const shimmerGradient = useTemplateRef<SVGLinearGradientElement>('shimmerGradient');
  const isDown = ref<boolean>(false);
  const recessLit = ref<boolean>(false);
  let shimmerGradientTween:GSAPTween|null = null;
  let lightingTimeout = null;

  const shimmerGradientValues = ref<GradientValues>({
    id: uniqueId('ps-button-shimmer'),
    size: { x1: 21.34, y1: -50, x2: 33.99, y2: 0 },
    stops: [
      { offset: 0.20, color: '#fff', opacity: 0 },
      { offset: 0.45, color: '#fff', opacity: 1 },
      { offset: 0.55, color: '#fff', opacity: 1 },
      { offset: 0.80, color: '#fff', opacity: 0 },
    ],
  });

  // methods

  function onMouseDown():void {
    // update internal state
    isDown.value = true;
    recessLit.value = true;
    // emit event
    emit(ComponentEvent.Pressed);
    // clear existing timeout if applicable
    if (lightingTimeout) {
      clearTimeout(lightingTimeout);
    }
    // create timeout to turn off recess lighting
    lightingTimeout = setTimeout(():void => {
      recessLit.value = false;
    }, 250);
    // kill existing shimmer animation if applicable
    if (shimmerGradientTween) {
      shimmerGradientTween.kill();
    }
    // animate shimmer effect
    const shimmer:{ y1:number, y2:number } = { y1: -25, y2: 0 };
    const onUpdate:GSAPCallback = ():void => {
      shimmerGradient.value.setAttribute('y1', String(shimmer.y1));
      shimmerGradient.value.setAttribute('y2', String(shimmer.y2));
    };
    shimmerGradientTween = gsap.to(shimmer, { y1: 40, y2: 90, duration: 0.75, ease: 'circ.out', onUpdate });
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
  @use 'sass:color';
  @use '@/shared/styles/core' as *;

  .c-playstation-button {
    width: 100%;
    line-height: 0;

    :deep(svg) {
      vertical-align: top;
    }
  }

  .recess {
    position: relative;

    .recess-graphic {
      fill: #222;
      transition: 0.2s fill ease-in-out;
    }

    &--lit {
      .recess-graphic {
        //fill: color.mix(#222, #fc0, 50%);
      }
    }
  }

  .button {
    @include button-reset();
    position: absolute;
    inset: 9% 6%;
    transition: 0.1s transform ease-in-out;

    .shimmer {
      position: absolute;
      inset: 0;
      fill: #fff;
    }

    &--pressed {
      transform: scale(0.9);
    }
  }
</style>
