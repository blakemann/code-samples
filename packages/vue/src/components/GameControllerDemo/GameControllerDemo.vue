<template>
  <div class="c-game-controller-demo">
    <h1>Game Controller Demo</h1>
    <div class="demo-content">
      <div class="log-box">
        <LogBox :logs="logs" />
      </div>
      <GameController
        class="game-controller"
        @input="onInput"
        @input-data-update="onInputDataUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Input } from '@/shared/utilities/constants';
  import GameController from '@/vue/components/GameController';
  import LogBox from '@/vue/components/LogBox';
  import type { LogEntry } from '@/vue/components/LogBox';
  import type { LogItemData } from '@/vue/components/LogItem';

  // data

  const logs = ref<LogEntry[]>([]);

  // methods

  function onInput(input:Input, data:LogItemData):void {
    logs.value.push({
      timestamp: Date.now(),
      input,
      data,
    });
  }

  function onInputDataUpdate(data:LogItemData):void {
    const log:LogEntry = logs.value[logs.value.length - 1];
    log.data = data;
  }
</script>

<style lang="scss" scoped>
  .c-game-controller-demo {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 350px 0 100px;
  }

  h1 {
    margin: 0;
    font-size: 14px;
    font-weight: 800;
    position: absolute;
    top: 24px;
    left: 24px;
    color: #222;
  }

  .demo-content {
    width: 100%;
    position: relative;
  }

  .log-box {
    width: 350px;
    max-width: 100%;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, max(-7vw, -50px));
  }

  .game-controller {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
