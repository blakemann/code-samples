<template>
  <div
    ref="logBox"
    class="c-log-box"
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

<script lang="ts">
  import { gsap } from 'gsap';
  import { computed, useTemplateRef, TransitionGroup } from 'vue';
  import IconCross from '@/shared/assets/action-cross.svg';
  import type { Input } from '@/shared/utilities/constants';
  import LogItem, { LogItemData } from '@/vue/components/LogItem';

  export type LogEntry = {
    timestamp: number,
    input: Input,
    data: LogItemData,
  }

  type TransitionGroupType = InstanceType<typeof TransitionGroup>;

  interface Props {
    logs: Array<LogEntry>,
  }
</script>

<script setup lang="ts">
  // defines

  const { logs = [] } = defineProps<Props>();

  // data

  const logBox = useTemplateRef<HTMLDivElement>('logBox');
  const logContainer = useTemplateRef<TransitionGroupType>('logContainer');
  const maxLogs:number = 3;
  const logItemTransitionDuration:number = 0.3;

  // computed

  const hiddenCountMessage = computed<string|null>(() => {
    if (logs.length <= maxLogs) {
      return null;
    }
    const count:number = logs.length - maxLogs;
    return count === 1 ? '1 older log not displayed' : `${count} older logs not displayed`;
  });

  const visibleLogs = computed<LogEntry[]>(() => {
    return logs.slice(-maxLogs);
  });

  // methods

  function onEnter(itemWrapper:HTMLDivElement, onComplete:GSAPCallback):void {
    const item:Element = itemWrapper.children[0];
    // animate item entering
    gsap.fromTo(itemWrapper, { height: 0 }, { height: 'auto', duration: logItemTransitionDuration, ease: 'power1.inOut' });
    gsap.fromTo(item, { scale: 0.75, opacity: 0 }, { scale: 1, opacity: 1, duration: logItemTransitionDuration, ease: 'power1.out', onComplete });
  }

  function onLeave(itemWrapper:HTMLDivElement, onComplete:GSAPCallback):void {
    const item:Element = itemWrapper.children[0];
    const wrapperHeight:number = itemWrapper.offsetHeight;
    // animate item leaving
    gsap.fromTo(itemWrapper, { height: wrapperHeight }, { height: 0, duration: logItemTransitionDuration, ease: 'power1.inOut' });
    gsap.fromTo(item, { scale: 1, opacity: 1 }, { scale: 0.75, opacity: 0, duration: logItemTransitionDuration, ease: 'power1.out', onComplete });
  }
</script>

<style lang="scss" scoped>
  .c-log-box {
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
