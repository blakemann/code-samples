<template>
  <InputContainer
    ref="inputContainer"
    :uid="uid"
    :label="label"
    :label-parens="labelParens"
    :description="description"
    :error="error"
  >
    <div
      :class="{
        'input-wrapper': true,
        'input-wrapper--loading': formLoading,
        'input-wrapper--disabled': disabled,
      }"
    >
      <NumberFieldRoot
        :id="uid"
        ref="fieldRoot"
        v-model="model"
        :min="min"
        :max="max"
        :step="step"
        :step-snapping="false"
        :disabled="formLoading || disabled"
        :format-options="formatOptions"
        as-child
      >
        <div class="combined-input">
          <NumberFieldDecrement
            v-if="stepButtonsAllowed"
            ref="decrementButton"
            class="step-button step-button--decrement"
          >
            <IconMinus />
          </NumberFieldDecrement>
          <NumberFieldInput
            ref="input"
            :class="{
              input: true,
              'input--has-step-buttons': stepButtonsAllowed,
            }"
            @focus="emit('focus')"
            @blur="emit('blur')"
          />
          <NumberFieldIncrement
            v-if="stepButtonsAllowed"
            ref="incrementButton"
            class="step-button step-button--increment"
          >
            <IconPlus />
          </NumberFieldIncrement>
        </div>
      </NumberFieldRoot>
    </div>
  </InputContainer>
</template>

<script lang="ts">
  import type { Ref } from 'vue';
  import IconPlus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
  import IconMinus from '@fortawesome/fontawesome-free/svgs/solid/minus.svg';
  import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot } from 'reka-ui';
  import { ref, inject, computed, useTemplateRef } from 'vue';
  import InputContainer from '../InputContainer';
  import { useUniqueId } from '@/vue/composables';

  type NumberFieldInputType = InstanceType<typeof NumberFieldInput>;

  interface Props {
    label:string,
    labelParens?:string,
    description?:string,
    min?:number,
    max?:number,
    step?:number,
    error?:string|null,
    disabled?:boolean,
    showStepButtons?:boolean,
    formatOptions?:Intl.NumberFormatOptions,
  }
</script>

<script setup lang="ts">
  // defines

  const {
    label,
    labelParens = '',
    description = '',
    min = 0,
    max = 1000000,
    step = 1,
    error = null,
    disabled = false,
    showStepButtons = true,
    formatOptions = { maximumFractionDigits: 4 },
  } = defineProps<Props>();

  const [model, { nullable }] = defineModel<number>({
    default: 0,
    set(value:number):number|null {
      return (Number.isNaN(value) && nullable) ? null : value;
    },
    get(value:number|null):number {
      return (value === null && nullable) ? Number.NaN : value;
    },
  });

  const emit = defineEmits< {
    focus: [],
    blur: [],
  }>();

  // data

  const input = useTemplateRef<NumberFieldInputType>('input');
  const formLoading = inject<Ref>('ui:form:loading', ref(false));

  const uid:string = useUniqueId('input');

  // computed

  const stepButtonsAllowed = computed<boolean>(() => {
    return showStepButtons && !disabled;
  });

  // methods

  function focus():void {
    input.value.$el.focus();
  }

  // exposed

  defineExpose({
    focus,
    get input() {
      return input.value?.$el || null;
    },
  });
</script>

<style lang="scss" scoped>
  @use 'sass:map';
  @use '@/shared/styles/core' as *;

  .combined-input {
    position: relative;
    --step-button-width: 2rem;
  }

  .input {
    @include form-field-text;

    &--has-step-buttons {
      padding-left: calc(var(--forms-padding-horizontal) + var(--step-button-width));
      padding-right: calc(var(--forms-padding-horizontal) + var(--step-button-width));
    }
  }

  .input-wrapper--loading {
    @include form-field-shimmer-container;
  }

  .input-wrapper--disabled {
    opacity: 0.5;
  }

  .step-button {
    @include button-reset;
    width: var(--step-button-width);
    position: absolute;
    top: 0;
    bottom: 0;
    transition: 0.2s opacity ease-in-out;

    svg {
      width: 0.65em;
    }

    &--decrement {
      left: 2px;
    }

    &--increment {
      right: 2px;
    }

    &:hover,
    &:focus {
      opacity: 0.5;
    }
  }
</style>
