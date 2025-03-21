<template>
  <div class="c-form-demo">
    <h1>Form Demo</h1>
    <div class="demo-content">
      <div class="fields">
        <InputText
          ref="nameField"
          v-model="name"
          label="What is your name?"
        />
        <InputNumber
          ref="ageField"
          v-model.nullable="age"
          label="How old are you?"
        />
      </div>
      <div class="sidebar">
        <ProfileCard
          ref="profileCard"
          :name="name"
          :age="age"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue';
  import InputText, { InputTextType } from '@/vue/components/form/InputText';
  import InputNumber from '@/vue/components/form/InputNumber';
  import ProfileCard from '@/vue/components/form/ProfileCard';
</script>

<script setup lang="ts">
  // data

  const name = ref<string>('');
  const age = ref<number|null>(null);
</script>

<style lang="scss" scoped>
  @use 'sass:map';
  @use '@/shared/styles/core' as *;

  .c-form-demo {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 40px 100px;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
    max-width: 900px;
  }

  @media only screen and (max-width: 1000px) {
    .demo-content {
      grid-template-columns: auto;
      grid-template-rows: auto auto;
    }
  }
</style>
