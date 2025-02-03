<template>
  <button
    type="button"
    :class="`c-shoulder-button c-shoulder-button--side-${side}`"
    :aria-label="side === 'left' ? 'L1' : 'R1'"
    @mousedown="onMouseDown"
  >
    <ShoulderButtonGraphic
      ref="graphic"
      class="graphic"
    />
  </button>
</template>

<script lang="ts">
  import { gsap } from 'gsap';
  import { ref, useTemplateRef } from 'vue';
  import ShoulderButtonGraphic from './assets/shoulder-button.svg';
  import { useGlobalRelease } from '@/vue/composables';

  export enum ButtonSide {
    Left = 'left',
    Right = 'right',
  }

  enum ComponentEvent {
    Pressed = 'pressed',
    Released = 'released',
  }

  type GraphicType = InstanceType<typeof ShoulderButtonGraphic>;

  interface Props {
    side: ButtonSide,
  }
</script>

<script setup lang="ts">
  // defines

  const { side = ButtonSide.Left } = defineProps<Props>();

  const emit = defineEmits(Object.values(ComponentEvent));

  // data

  const graphic = useTemplateRef<GraphicType>('graphic');
  const isDown = ref<boolean>(false);

  // methods

  function onMouseDown():void {
    // update internal state
    isDown.value = true;
    // emit event
    emit(ComponentEvent.Pressed);
    // animate in
    gsap.to(graphic.value.$el, { y: '20%', duration: 0.1, ease: 'power2.inOut' });
  }

  function onRelease():void {
    // update internal state
    isDown.value = false;
    // emit event
    emit(ComponentEvent.Released);
    // animate out
    gsap.to(graphic.value.$el, { y: 0, duration: 0.1, ease: 'power2.inOut' });
  }

  useGlobalRelease(isDown, onRelease);
</script>

<style lang="scss" scoped>
  @use '@/shared/styles/core' as *;

  .c-shoulder-button {
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
