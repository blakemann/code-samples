<template>
  <div
    :class="{
      'input-container': true,
      'input-container--loading': formLoading,
    }"
  >
    <div
      :class="{
        'info': true,
        'info--hidden': hiddenLabel,
      }"
      data-test="info"
    >
      <div
        v-if="label || labelParens"
        class="label"
      >
        <label
          v-if="label"
          :for="uid"
          data-test="label"
        >
          {{ label }}
        </label>
        <span
          v-if="labelParens"
          class="label-parens"
          data-test="labelParens"
        >
          ({{ labelParens }})
        </span>
      </div>
      <div class="info-meta">
        <slot name="infoMeta" />
      </div>
    </div>
    <div
      v-if="description"
      class="description"
      data-test="description"
    >
      {{ description }}
    </div>
    <div class="field-wrapper">
      <slot />
      <div
        :class="{
          'error-indicator': true,
          'error-indicator--visible': error,
        }"
        data-test="errorIndicator"
      >
        <IconCircleExclamation />
      </div>
    </div>
    <div
      v-if="(!collapseErrorSpace || error) || slots.validationMeta"
      class="validation"
    >
      <div
        v-if="!collapseErrorSpace || error"
        class="error-message"
        data-test="errorMessage"
      >
        {{ error ? `This ${error}` : '' }}
      </div>
      <div class="validation-meta">
        <slot name="validationMeta" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import type { Ref } from 'vue';
  import IconCircleExclamation from '@fortawesome/fontawesome-free/svgs/solid/circle-exclamation.svg';
  import { ref, inject } from 'vue';

  interface Props {
    uid: string,
    label?: string,
    labelParens?: string,
    description?: string,
    error?: string|null,
    collapseErrorSpace?: boolean,
    hiddenLabel?: boolean,
  }
</script>

<script setup lang="ts">
  // defines

  const {
    uid,
    label = '',
    labelParens = '',
    description = '',
    error = null,
    collapseErrorSpace = false,
    hiddenLabel = false,
  } = defineProps<Props>();

  const slots = defineSlots<{
    default():any,
    infoMeta():any,
    validationMeta():any,
  }>();

  // data

  const formLoading = inject<Ref>('ui:form:loading', ref(false));
</script>

<style lang="scss" scoped>
  @use 'sass:map';
  @use '@/shared/styles/core' as *;

  .input-container {
    &--loading {
      .label,
      .description {
        position: relative;

        &, * {
          color: transparent;
        }

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 10em;
          height: 1.5ex;
          transform: translateY(-50%);
          @include form-field-shimmer;
        }
      }

      .description {
        &::before {
          width: 100%;
        }
      }
    }
  }

  .info,
  .validation {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: spacing(0.25) 0;

    &-meta {
      margin-left: auto;
    }
  }

  .info {
    align-items: flex-end;

    &--hidden {
      height: 0;
      margin: 0;
      opacity: 0;
      pointer-events: none;
    }
  }

  .validation {
    align-items: flex-start;
  }

  .label,
  .error-message,
  .description {
    flex-grow: 1;
    flex-shrink: 1;
    margin-left: 0.2em;
    white-space: normal;
  }

  .label {
    display: flex;
    flex-wrap: wrap;
    font-size: var(--forms-font-size-label);
    font-weight: var(--forms-font-weight-label);
  }

  .label-parens {
    opacity: 0.6;

    &:not(:first-child) {
      margin-left: 0.5em;
    }
  }

  .error-message {
    font-size: var(--forms-font-size-error);
    font-weight: var(--forms-font-weight-error);
    margin-right: spacing(1);
    min-height: 3ex;
    color: var(--forms-color-error);
  }

  .description {
    font-size: var(--forms-font-size-description);
    margin-bottom: spacing(0.25);
  }

  .field-wrapper {
    position: relative;
  }

  .error-indicator {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(25%, -25%) scale(0);
    background: #fff;
    line-height: 0;
    border-radius: 100%;
    padding: 2px;
    transition: 0.2s all ease-in-out;

    svg {
      fill: var(--forms-color-error);
      width: 0.75em;
      height: 0.75em;
    }

    &--visible {
      transform: translate(25%, -25%) scale(1);
    }
  }
</style>
