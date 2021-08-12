<template>
  <div
    :class="[
      lightOnDark
        ? 'text-secondary dark:text-primary'
        : 'dark:text-secondary text-primary',
      'flex flex-col w-full lg:w-80 2xl:w-96 pb-5 px-5',
    ]"
  >
    <label :for="title">{{ title }}</label>
    <input
      :id="title"
      v-model="value"
      :type="type"
      class="text-secondary"
      @blur="v$.value.$touch"
    />

    <div
      v-for="error of v$.value.$errors"
      :key="error.$uid"
      class="input-errors"
    >
      <div class="text-danger pt-2.5 font-bold">{{ error.$message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */

import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';

export default defineComponent({
  name: 'VLink',

  props: {
    modelValue: {},
    title: { type: String, default: 'Title', required: true },
    type: { type: String, default: 'text', required: false },
    lightOnDark: { type: Boolean, required: false, default: false },
    required: { type: Boolean, required: false },
    maxLength: { type: Number, required: false },
    minLength: { type: Number, required: false },
    rules: { type: Object, required: false },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      v$: useVuelidate(),
    };
  },

  computed: {
    value: {
      get(): any {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      },
    },
  },

  validations() {
    const rules = {
      ...(this.required ? { required } : {}),
      ...(this.maxLength ? { maxLength: maxLength(this.maxLength) } : {}),
      ...(this.minLength ? { minLength: minLength(this.minLength) } : {}),
      ...(this.rules ?? {}),
    };

    return {
      value: rules,
    };
  },
});
</script>

<style lang="postcss"></style>
