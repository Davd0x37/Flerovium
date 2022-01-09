<template>
  <button
    :class="[
      'text-primary border border-gray-500 rounded p-2.5 mx-5 transition',
      inversed
        ? 'bg-secondary hover:bg-secondary-dark'
        : 'bg-secondary-dark hover:bg-brand',
    ]"
  >
    <v-icon v-if="icon" class="pr-2.5" :icon="icon" />
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import VIcon from '@/components/common/VIcon.vue';

const _props = withDefaults(
  defineProps<{
    icon?: string;
    inversed?: boolean;
  }>(),
  {
    icon: 'fa fa-lock',
    inversed: false,
  },
);
</script>
