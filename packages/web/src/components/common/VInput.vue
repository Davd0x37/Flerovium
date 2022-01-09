<template>
  <div
    :class="[
      inversed ? 'text-primary' : 'text-primary',
      'flex flex-col w-full lg:w-80 2xl:w-96 pb-5 px-5',
    ]"
  >
    <label :for="title">{{ title }}</label>
    <input
      :id="title"
      v-model="value"
      :type="type"
      :class="inversed ? 'text-accent-dark' : 'text-secondary-dark'"
      @blur="v$.value.$touch"
    />

    <div v-for="error of v$.$errors" :key="error.$uid" class="input-errors">
      <div class="text-danger pt-2.5 font-bold">{{ error.$message }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, Ref } from 'vue';
import useVuelidate, { ValidationArgs } from '@vuelidate/core';
import {
  req as required,
  maxLen as maxLength,
  minLen as minLength,
} from '@/i18n/validators';

const props = withDefaults(
  defineProps<{
    modelValue: string | boolean;
    title: string;
    type?: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    inversed?: boolean;
    rules?: Record<string, unknown>;
  }>(),
  {
    title: 'Title',
    type: 'text',
    inversed: false,
  },
);

const rules = computed(() => ({
  value: {
    ...(props.required ? { required } : {}),
    // FIXME: fix custom validators in vuelidate
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...(props.maxLength ? { maxLength: maxLength(props.maxLength) } : {}),
    // FIXME: fix custom validators in vuelidate
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...(props.minLength ? { minLength: minLength(props.minLength) } : {}),
    ...(props.rules ?? {}),
  },
})) as Ref<ValidationArgs>;

const emits = defineEmits(['update:modelValue']);
const value = computed({
  get(): any {
    return props.modelValue;
  },
  set(val: string) {
    emits('update:modelValue', val);
  },
});

const v$ = useVuelidate(rules, { value });
</script>
