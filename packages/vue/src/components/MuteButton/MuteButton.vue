<template>
  <div class="c-mute-button">
    <div class="recess">
      <button
        type="button"
        :class="{
          button: true,
          'button--pressed': isDown,
          'button--lit': muted,
        }"
        :aria-label="muted ? 'Unmute' : 'Mute'"
        @mousedown="onMouseDown"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue';
  import { useGlobalRelease } from '@/vue/composables';

  export enum ComponentEvent {
    Pressed = 'pressed',
    Released = 'released',
  }
</script>

<script setup lang="ts">
  // defines

  const muted = defineModel<boolean>('muted', {
    default: false,
  });

  const emit = defineEmits(Object.values(ComponentEvent));

  // data

  const isDown = ref<boolean>(false);

  // methods

  function onMouseDown():void {
    // update internal state
    isDown.value = true;
    // emit event
    emit(ComponentEvent.Pressed);
  }

  function onRelease() {
    // update internal state
    isDown.value = false;
    muted.value = !muted.value;
    // emit event
    emit(ComponentEvent.Released);
  }

  useGlobalRelease(isDown, onRelease);
</script>

<style lang="scss" scoped>
  @use 'sass:color';
  @use '@/shared/styles/core' as *;

  .c-mute-button {
    width: 100%;
    line-height: 0;
  }

  .recess {
    background: #222;
    border-radius: 100vw;
    width: 100%;
    aspect-ratio: 52 / 14;
    padding: 5%;
  }

  .button {
    @include button-reset;
    background: linear-gradient(0deg, rgba(#8b8c96, 0.75), rgba(#ccc, 0.75));
    border-radius: inherit;
    position: relative;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    transition: 0.1s transform ease-in-out, 0.2s background ease-in-out, 0.2s box-shadow ease-in-out;

    &::before {
      content: '';
      position: absolute;
      inset: 30% 15%;
      background: color.mix(#222, #9e9faa, 50%);
      border-radius: inherit;
      z-index: 1;
      transition: 0.2s background ease-in-out;
    }

    &--pressed {
      transform: scale(0.9, 0.8);
    }

    &--lit {
      $light-color: #e79d3e;
      background: linear-gradient(0deg, color.mix($light-color, #000, 75%), color.mix($light-color, #fff, 25%));
      box-shadow: 0 0 5px 2px rgba($light-color, 0.5);

      &::before {
        background: $light-color;
      }
    }
  }
</style>
