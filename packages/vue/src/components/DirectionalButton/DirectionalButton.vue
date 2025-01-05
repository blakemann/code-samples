<template>
  <div :class="`root root--${direction}`">
    <div class="rotation-wrapper">
      <div class="recess">
        <GraphicRecess />
      </div>
      <button
        type="button"
        :aria-label="direction"
        :class="{
          button: true,
          'button--pressed': isDown,
        }"
        @mousedown="onMouseDown"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50.13 66.7"
        >
          <defs>
            <linearGradient
              :id="gradients.face.id"
              v-bind="gradients.face.sizes[orientation]"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                v-for="stop of gradients.face.stops[direction]"
                :offset="stop.offset"
                :stop-color="stop.color"
                :stop-opacity="stop.opacity"
              />
            </linearGradient>
            <linearGradient
              :id="gradients.edge.id"
              v-bind="gradients.edge.sizes[orientation]"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                v-for="stop of gradients.edge.stops[direction]"
                :offset="stop.offset"
                :stop-color="stop.color"
                :stop-opacity="stop.opacity"
              />
            </linearGradient>
            <linearGradient
              :id="gradients.shimmer.id"
              ref="shimmerGradient"
              v-bind="gradients.shimmer.size"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                v-for="stop of gradients.shimmer.stops"
                :offset="stop.offset"
                :stop-color="stop.color"
                :stop-opacity="stop.opacity"
              />
            </linearGradient>
          </defs>
          <path
            class="button-background"
            d="M49.93,15.57c-.24,4.93-.69,17.03-.92,23.3,0,0,.52,4.88-3.08,8.63-3.16,3.29-8.4,9.46-12.35,13.33-3.65,3.58-4.95,4.76-8.51,4.91-3.56-.15-4.85-1.33-8.51-4.91-3.94-3.86-9.19-10.04-12.35-13.33-3.6-3.75-3.08-8.63-3.08-8.63-.23-6.27-.68-18.37-.92-23.3C-.02,10.65-3.1.04,25.07,0c28.16.04,25.09,10.65,24.86,15.57Z"
          />
          <path
            ref="shimmer"
            class="button-shimmer"
            :fill="`url(#${gradients.shimmer.id})`"
            d="M49.93,15.57c-.24,4.93-.69,17.03-.92,23.3,0,0,.52,4.88-3.08,8.63-3.16,3.29-8.4,9.46-12.35,13.33-3.65,3.58-4.95,4.76-8.51,4.91-3.56-.15-4.85-1.33-8.51-4.91-3.94-3.86-9.19-10.04-12.35-13.33-3.6-3.75-3.08-8.63-3.08-8.63-.23-6.27-.68-18.37-.92-23.3C-.02,10.65-3.1.04,25.07,0c28.16.04,25.09,10.65,24.86,15.57Z"
          />
          <path
            class="button-highlight"
            :fill="`url(#${gradients.face.id})`"
            :stroke="`url(#${gradients.edge.id})`"
            d="M47.9,18.6c-.22,4.63-.64,15.99-.85,21.87,0,0,.48,4.58-2.83,8.1-2.9,3.09-7.72,8.88-11.34,12.51-3.36,3.36-4.54,4.47-7.81,4.61-3.27-.14-4.46-1.25-7.81-4.61-3.62-3.63-8.44-9.43-11.34-12.51-3.31-3.52-2.83-8.1-2.83-8.1-.21-5.88-.63-17.24-.85-21.87-.21-4.62-3.03-14.58,22.84-14.62,25.87.04,23.04,10,22.84,14.62Z"
          />
          <path
            class="button-icon"
            d="M23.82,15.97l-5.37,4.76c-1.3,1.15-.48,3.29,1.25,3.29h10.73c1.73,0,2.54-2.14,1.25-3.29l-5.37-4.76c-.71-.63-1.78-.63-2.5,0Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { uniqueId } from 'lodash-es';
  import { gsap } from 'gsap';
  import { computed, ref } from 'vue';
  import GraphicRecess from './assets/recess.svg';
  import { useGlobalRelease } from '@/composables';

  const props = defineProps({
    direction: {
      type: String,
      validator(value) {
        return ['up', 'down', 'left', 'right'].includes(value);
      },
      default: 'up',
    },
  });

  const emit = defineEmits([
    'pressed',
    'released',
  ]);

  // data

  const shimmer = ref(null);
  const shimmerGradient = ref(null);
  const isDown = ref(false);
  let shimmerTimeline = null;

  const gradients = ref({
    edge: {
      id: uniqueId('d-button-edge'),
      sizes: {
        vertical: { x1: 25.07, y1: 2.98, x2: 25.07, y2: 66.7 },
        horizontal: { x1: 0, y1: 31.86, x2: 48.05, y2: 31.86 },
      },
      stops: {
        up: [
          { offset: 0, color: '#ccc', opacity: 1 },
          { offset: 0.5, color: '#ccc', opacity: 0 },
        ],
        down: [
          { offset: 0.3, color: '#ccc', opacity: 0 },
          { offset: 1, color: '#ccc', opacity: 1 },
        ],
        right: [
          { offset: 0, color: '#ccc', opacity: 1 },
          { offset: 0.6, color: '#ccc', opacity: 0 },
        ],
        left: [
          { offset: 0, color: '#ccc', opacity: 0 },
          { offset: 1, color: '#ccc', opacity: 1 },
        ],
      },
    },
    face: {
      id: uniqueId('d-button-face'),
      sizes: {
        vertical: { x1: 25.07, y1: 65.43, x2: 25.07, y2: 5.43 },
        horizontal: { x1: 1.2, y1: 31.86, x2: 45.97, y2: 31.86 },
      },
      stops: {
        up: [
          { offset: 0, color: '#fff', opacity: 0 },
          { offset: 0.8, color: '#fff', opacity: 0 },
          { offset: 1, color: '#fff', opacity: 0.2 },
        ],
        down: [
          { offset: 0.2, color: '#fff', opacity: 0.3 },
          { offset: 0.9, color: '#fff', opacity: 0.4 },
          { offset: 1, color: '#fff', opacity: 0.2 },
        ],
        right: [
          { offset: 0, color: '#fff', opacity: 0 },
          { offset: 0.5, color: '#fff', opacity: 0 },
          { offset: 0.55, color: '#fff', opacity: 0.3 },
          { offset: 0.9, color: '#fff', opacity: 0.3 },
          { offset: 1, color: '#fff', opacity: 0.2 },
        ],
        left: [
          { offset: 0, color: '#fff', opacity: 0.2 },
          { offset: 0.1, color: '#fff', opacity: 0.3 },
          { offset: 0.5, color: '#fff', opacity: 0.3 },
          { offset: 0.55, color: '#fff', opacity: 0 },
          { offset: 1, color: '#fff', opacity: 0 },
        ],
      },
    },
    shimmer: {
      id: uniqueId('d-button-shimmer'),
      size: { x1: 25.07, y1: 0, x2: 25.07, y2: 600 },
      stops: [
        { offset: 0, color: 'transparent', opacity: 1 },
        { offset: 0.33, color: '#fc0', opacity: 1 },
        { offset: 0.66, color: '#f92ff7', opacity: 1 },
        { offset: 1, color: '#3197ff', opacity: 1 },
      ],
    },
  });

  // computed

  const orientation = computed(() => {
    return ['left', 'right'].includes(props.direction) ? 'horizontal' : 'vertical';
  });

  // methods

  function onMouseDown() {
    isDown.value = true;
    emit('pressed');
    const size = { y1: 0, y2: 600 };
    if (shimmerTimeline) {
      shimmerTimeline.kill();
    }
    shimmerTimeline = gsap.timeline();
    const onUpdate = () => {
      shimmerGradient.value.setAttribute('y1', size.y1);
      shimmerGradient.value.setAttribute('y2', size.y2);
    };
    shimmerTimeline.to(shimmer.value, { opacity: 0.4, duration: 0.1, ease: 'power1.easeIn' });
    shimmerTimeline.to(shimmer.value, { opacity: 0, duration: 0.5, ease: 'power1.easeOut', delay: 0.1 });
    shimmerTimeline.to(size, { y1: -540, y2: 60, duration: 0.5, ease: 'power1.easeIn', onUpdate }, 0);
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
    position: relative;

    :deep(svg) {
      height: 100%;
      vertical-align: top;
    }

    &--down {
      .rotation-wrapper {
        transform: rotate(180deg);
      }
    }

    &--left {
      .rotation-wrapper {
        transform: rotate(-90deg);
      }
    }

    &--right {
      .rotation-wrapper {
        transform: rotate(90deg);
      }
    }
  }

  .recess {
    fill: #222;
    width: 100%;
    height: 100%;
  }

  .button {
    @include button-reset();
    position: absolute;
    inset: 0;
    padding: 4%;
    transition: 0.1s transform ease-in-out;

    &--pressed {
      transform: scale(0.85);

      .button-icon {
        fill: #fff;
      }
    }
  }

  .button-background,
  .button-shimmer,
  .button-highlight {
    fill-rule: evenodd;
  }

  .button-highlight {
    stroke-miterlimit: 10;
    stroke-width: 2px;
  }

  .button-background {
    fill: #3c4649;
  }

  .button-icon {
    fill: #eaeaea;
  }

  .button-shimmer {
    opacity: 0;
  }
</style>
