<template>
  <div
    ref="logBox"
    class="component-log-box"
  >
    <div
      v-if="logs.length === 0"
      class="empty-state"
    >
      <h2 class="start-message-primary">
        Press
        <span class="cross-symbol">
          x
          <IconCross
            role="presentation"
            aria-hidden="true"
          />
        </span>
        to Start
      </h2>
      <span class="start-message-secondary">(or any other button 😉)</span>
    </div>
    <h2
      v-else
      class="logs-heading"
    >
      Input Log
    </h2>
    <div
      v-if="hiddenCountMessage"
      class="hidden-count"
    >
      {{ hiddenCountMessage }}
    </div>
    <TransitionGroup
      ref="logContainer"
      tag="div"
      class="log-items"
      @enter="onEnter"
      @leave="onLeave"
    >
      <div
        v-for="log of visibleLogs"
        :key="log.timestamp"
        class="log-item-wrapper"
      >
        <LogItem
          :input="log.input"
          :data="log.data"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
  import { gsap } from 'gsap';
  import { ref, computed } from 'vue';
  import IconCross from '../../assets/action-cross.svg';
  import LogItem from '@/components/LogItem';

  const props = defineProps({
    logs: {
      type: Array,
      default: () => [],
    },
  });

  // data

  const logBox = ref(null);
  const logContainer = ref(null);
  const maxLogs = 3;
  const logItemTransitionDuration = 0.3;

  // computed

  const hiddenCountMessage = computed(() => {
    if (props.logs.length <= maxLogs) {
      return null;
    }
    const count = props.logs.length - maxLogs;
    return count === 1 ? '1 older log not displayed' : `${count} older logs not displayed`;
  });

  const visibleLogs = computed(() => {
    return props.logs.slice(-maxLogs);
  });

  // methods

  function onEnter(itemWrapper, onComplete) {
    const item = itemWrapper.children[0];
    // animate item entering
    gsap.fromTo(itemWrapper, { height: 0 }, { height: 'auto', duration: logItemTransitionDuration, ease: 'power1.inOut' });
    gsap.fromTo(item, { scale: 0.75, opacity: 0 }, { scale: 1, opacity: 1, duration: logItemTransitionDuration, ease: 'power1.out', onComplete });
  }

  function onLeave(itemWrapper, onComplete) {
    const item = itemWrapper.children[0];
    const wrapperHeight = itemWrapper.offsetHeight;
    // animate item leaving
    gsap.fromTo(itemWrapper, { height: wrapperHeight }, { height: 0, duration: logItemTransitionDuration, ease: 'power1.inOut' });
    gsap.fromTo(item, { scale: 1, opacity: 1 }, { scale: 0.75, opacity: 0, duration: logItemTransitionDuration, ease: 'power1.out', onComplete });
  }
</script>

<style lang="scss" scoped>
  .component-log-box {
    background: #fff;
    border-radius: 6px;
    padding: 12px;
    position: relative;
    filter: drop-shadow(0 5px 5px rgba(10, 0, 50, 0.125));

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -1px);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #fff;
    }
  }

  .empty-state {
    text-align: center;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 10px;
  }

  .start-message-primary {
    font-size: 16px;
    font-weight: 800;
    margin: 0;
  }

  .start-message-secondary {
    font-size: 9px;
    margin-top: 6px;
  }

  .cross-symbol {
    font-size: 0;
    width: 20px;
    height: 20px;
    background: #222;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #69aefb;
    vertical-align: middle;
    transform: translateY(-5%);

    :deep(svg) {
      width: 60%;
    }
  }

  .logs-heading {
    font-size: 16px;
    font-weight: 800;
    margin: 0;
    text-align: center;
  }

  .hidden-count {
    font-size: 10px;
    text-align: center;
    margin-top: 10px;
  }

  .log-items {
    display: flex;
    flex-direction: column;
    //grid-gap: 4px;
    margin-top: 12px;
    overflow: hidden;
  }

  .log-item-wrapper {
    overflow: hidden;
  }
</style>
