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
      <input
        :id="uid"
        ref="input"
        v-model="model"
        data-test="input"
        :type="type"
        class="input"
        v-bind="filteredAttrs"
        :aria-disabled="formLoading || disabled"
        :disabled="formLoading || disabled"
        @focus="emit('focus')"
        @blur="emit('blur')"
      >
    </div>
    <template
      v-if="maxlength && !formLoading"
      #validationMeta
    >
      <div
        data-test="characterCounter"
        :class="{
          'char-count': true,
          'char-count--over-limit': model.length > maxlength
        }"
      >
        {{ model.length }} / {{ maxlength }}
      </div>
    </template>
  </InputContainer>
</template>

<script lang="ts">
  import type { Ref } from 'vue';
  import { ref, useAttrs, computed, inject, useTemplateRef } from 'vue';
  import InputContainer from '../InputContainer';
  import { useUniqueId } from '@/vue/composables';

  export enum Type {
    Email = 'email',
    Password = 'password',
    Search = 'search',
    Tel = 'tel',
    Text = 'text',
    Url = 'url',
  }

  type Attrs = {
    placeholder:string|null,
    autocomplete:string|null,
  }

  interface Props {
    label:string,
    type?:Type,
    labelParens?:string,
    description?:string,
    maxlength?:number|null,
    error?:string|null,
    disabled?:boolean,
  }
</script>

<script setup lang="ts">
  // defines

  const {
    label,
    type = Type.Text,
    labelParens = '',
    description = '',
    maxlength = null,
    error = null,
    disabled = false,
  } = defineProps<Props>();

  const [model, { nullable }] = defineModel<string>({
    set(value:string):string|null {
      return (value === '' && nullable) ? null : value;
    },
    get(value:string|null):string {
      return (value === null && nullable) ? '' : value;
    },
  });

  const emit = defineEmits<{
    focus: [],
    blur: [],
  }>();

  // data

  const input = useTemplateRef<HTMLInputElement>('input');
  const formLoading = inject<Ref>('ui:form:loading', ref(false));

  const attrs:Record<string, unknown> = useAttrs();
  const uid:string = useUniqueId('input');

  // computed

  const filteredAttrs = computed<Attrs>(() => ({
    placeholder: attrs.placeholder,
    autocomplete: attrs.autocomplete,
  }));

  // methods

  function focus():void {
    input.value.focus();
  }

  // exposed

  defineExpose({
    focus,
    input,
  });
</script>

<style lang="scss" scoped>
  @use 'sass:map';
  @use '@/shared/styles/core' as *;

  .input {
    @include form-field-text;
  }

  .char-count {
    @include form-char-count;
  }

  .input-wrapper--loading {
    @include form-field-shimmer-container;
  }

  .input-wrapper--disabled {
    opacity: 0.5;
  }
</style>
