<template>
  <div class="game-controller-demo">
    <h1>Game Controller Demo</h1>
    <div class="demo-content">
      <LogBox
        :logs="logs"
        class="log-box"
      />
      <GameController
        class="game-controller"
        @input="onInput"
        @input-data-update="onInputDataUpdate"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import GameController from '@/components/GameController';
  import LogBox from '@/components/LogBox';

  // data

  const logs = ref([]);

  // methods

  function onInput(input, data) {
    logs.value.push({
      timestamp: Date.now(),
      input,
      data,
    });
  }

  function onInputDataUpdate(data) {
    const log = logs.value[logs.value.length - 1];
    log.data = data;
  }
</script>

<style lang="scss" scoped>
  .game-controller-demo {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 350px 0 100px;
  }

  h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 800;
    position: absolute;
    top: 24px;
    left: 24px;
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
