<template>
  <div class="log-item">
    <div
      :class="{
        symbol: true,
        [`symbol--${symbolData.class}`]: symbolData.class,
      }"
    >
      <div :class="`background background--${symbolData.background}`">
        <IconDirection v-if="symbolData.background === 'direction'" />
        <IconAnalogStick v-if="symbolData.background === 'stick'" />
      </div>
      <div
        :class="{
          icon: true,
          [`icon--dark`]: !symbolData.background,
        }"
      >
        <component
          :is="symbolData.icon.graphic"
          v-if="symbolData.icon.type === 'graphic'"
        />
        <span v-else-if="symbolData.icon.type === 'text'">
          {{ symbolData.icon.text }}
        </span>
      </div>
    </div>
    <div class="data">
      <span class="message">{{ symbolData.message }}</span>
      <span
        v-if="dataString"
        class="secondary-message"
      >
        {{ dataString }}
      </span>
    </div>
  </div>
</template>

<script setup>
  import IconMute from '@fortawesome/fontawesome-free/svgs/solid/microphone-slash.svg';
  import IconUnmute from '@fortawesome/fontawesome-free/svgs/solid/microphone.svg';
  import { computed } from 'vue';
  import IconCircle from '../../assets/action-circle.svg';
  import IconCross from '../../assets/action-cross.svg';
  import IconSquare from '../../assets/action-square.svg';
  import IconTriangle from '../../assets/action-triangle.svg';
  import IconOptions from '../../assets/menu-options.svg';
  import IconShare from '../../assets/menu-share.svg';
  import IconAnalogStick from './assets/analog-stick.svg';
  import IconDirection from './assets/direction-button.svg';
  import IconPS from './assets/ps-button.svg';
  import { INPUTS } from '@/utilities/constants';

  const props = defineProps({
    input: {
      type: String,
      validator(value) {
        return Object.values(INPUTS).includes(value);
      },
      required: true,
    },
    data: {
      type: Object,
      default: null,
    },
  });

  const symbolData = computed(() => {
    switch (props.input) {
      case INPUTS.L1:
        return { background: 'shoulder', icon: { type: 'text', text: 'L1' }, message: '\'L1\' Pressed' };
      case INPUTS.R1:
        return { background: 'shoulder', icon: { type: 'text', text: 'R1' }, message: '\'R1\' Pressed' };
      case INPUTS.TRIANGLE:
        return { background: 'action', icon: { type: 'graphic', graphic: IconTriangle }, class: 'green', message: '\'Triangle\' Pressed' };
      case INPUTS.CIRCLE:
        return { background: 'action', icon: { type: 'graphic', graphic: IconCircle }, class: 'red', message: '\'Circle\' Pressed' };
      case INPUTS.CROSS:
        return { background: 'action', icon: { type: 'graphic', graphic: IconCross }, class: 'blue', message: '\'X\' Pressed' };
      case INPUTS.SQUARE:
        return { background: 'action', icon: { type: 'graphic', graphic: IconSquare }, class: 'pink', message: '\'Square\' Pressed' };
      case INPUTS.UP:
        return { background: 'direction', icon: { type: null }, class: 'up', message: '\'Up\' Pressed' };
      case INPUTS.DOWN:
        return { background: 'direction', icon: { type: null }, class: 'down', message: '\'Down\' Pressed' };
      case INPUTS.LEFT:
        return { background: 'direction', icon: { type: null }, class: 'left', message: '\'Left\' Pressed' };
      case INPUTS.RIGHT:
        return { background: 'direction', icon: { type: null }, class: 'right', message: '\'Right\' Pressed' };
      case INPUTS.LEFTSTICK:
        return { background: 'stick', icon: { type: 'text', text: 'L' }, message: 'Left Stick' };
      case INPUTS.RIGHTSTICK:
        return { background: 'stick', icon: { type: 'text', text: 'R' }, message: 'Right Stick' };
      case INPUTS.SHARE:
        return { background: null, icon: { type: 'graphic', graphic: IconShare }, message: '\'Share\' Pressed' };
      case INPUTS.OPTIONS:
        return { background: null, icon: { type: 'graphic', graphic: IconOptions }, message: '\'Options\' Pressed' };
      case INPUTS.MUTE:
        return { background: null, icon: { type: 'graphic', graphic: IconMute }, class: 'mute', message: 'Microphone Muted' };
      case INPUTS.UNMUTE:
        return { background: null, icon: { type: 'graphic', graphic: IconUnmute }, message: 'Microphone Unmuted' };
      case INPUTS.PS:
        return { background: null, icon: { type: 'graphic', graphic: IconPS }, message: '\'PS Button\' Pressed' };
      default:
        return { background: null, icon: { type: 'text', text: 'unknown' }, message: 'Unknown Input' };
    }
  });

  const dataString = computed(() => {
    if (!props.data) {
      return null;
    }
    const values = [];
    if (props.data.angle !== undefined) {
      values.push(`${props.data.angle}°`);
    }
    if (props.data.force !== undefined) {
      values.push(`${props.data.force}%`);
    }
    return `(${values.join(', ')})`;
  });
</script>

<style lang="scss" scoped>
  .log-item {
    background: #f1f1f1;
    border-radius: 6px;
    padding: 8px 12px;
    display: flex;
    grid-gap: 14px;
    align-items: center;
    border: 1px solid #e0e0e0;
  }

  .symbol {
    position: relative;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    .background {
      &--action {
        width: 100%;
        height: 100%;
        background: #222;
        border-radius: 100%;
      }

      &--shoulder {
        width: 100%;
        height: 70%;
        background: #222;
        border-radius: 6px;
      }

      &--direction {
        :deep(svg) {
          fill: #222;
          height: 25px;
          vertical-align: middle;
        }
      }

      &--stick {
        :deep(svg) {
          width: 100%;
          vertical-align: middle;
        }
      }
    }

    .icon {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 12px;

      :deep(svg) {
        fill: currentColor;
        width: 60%;
        height: 60%;
      }

      &--dark {
        color: #222;
      }
    }

    &--green {
      color: #26c9b4;
    }

    &--red {
      color: #f586a7;
    }

    &--blue {
      color: #69aefb;
    }

    &--pink {
      color: #ebbee9;
    }

    &--mute :deep(svg) {
      color: #e79d3e;
    }

    &--up,
    &--down,
    &--left,
    &--right {
      .icon::before {
        content: '';
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
      }
    }

    &--up {
      .icon::before {
        transform: translateY(-5px);
      }
    }

    &--down {
      .background {
        transform: rotate(180deg);
      }
      .icon::before {
        transform: rotate(180deg) translateY(-5px);
      }
    }

    &--left {
      .background {
        transform: rotate(-90deg);
      }
      .icon::before {
        transform: rotate(-90deg) translateY(-5px);
      }
    }

    &--right {
      .background {
        transform: rotate(90deg);
      }
      .icon::before {
        transform: rotate(90deg) translateY(-5px);
      }
    }
  }

  .data {
    font-size: 14px;

    .message {
      font-weight: 800;
      color: #222;
    }

    .secondary-message {
      margin-left: 12px;
    }
  }
</style>
