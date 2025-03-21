<template>
  <div class="c-profile-card">
    <h2 class="heading">
      User Profile
    </h2>
    <div class="fields">
      <div class="field">
        <h3 class="field-label">
          Name
        </h3>
        <span
          class="field-value"
          data-test="name"
        >
          {{ name || '&ndash;' }}
        </span>
      </div>
      <div class="field">
        <h3 class="field-label">
          Age
        </h3>
        <span
          class="field-value"
          data-test="age"
        >
          {{ age || '&ndash;' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  interface Props {
    name: string,
    age: number|null,
  }
</script>

<script setup lang="ts">
  // defines

  const { name, age } = defineProps<Props>();
</script>

<style lang="scss" scoped>
  @use 'sass:map';
  @use '@/shared/styles/core' as *;

  .c-profile-card {
    background: #fff;
    border-radius: 6px;
    position: relative;
    box-shadow: 0 5px 5px rgb(10 0 50 / 12.5%);
  }

  .heading {
    font-size: 16px;
    font-weight: 800;
    margin: 0;
    padding: 12px;
    border-bottom: 2px solid var(--color-bg);
  }

  .fields {
    padding: 12px 12px 24px;
  }

  .field {
    font-size: 11px;
    padding-bottom: 4px;
    border-bottom: 2px dotted var(--color-bg);

    &-label {
      margin: 0 0 4px;
    }

    &:not(:first-child) {
      margin-top: 8px;
    }
  }
</style>
