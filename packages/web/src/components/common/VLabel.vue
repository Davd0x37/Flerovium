<template>
  <div
    v-if="enabled"
    :class="inversed ? 'text-secondary-dark' : 'text-primary'"
  >
    <p :class="['font-normal leading-3', sizeLabel]">
      {{ label }}
    </p>

    <p :style="important ? { color } : ''" :class="sizeContent">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
const _props = withDefaults(
  defineProps<{
    label: string;
    important?: boolean;
    enabled?: boolean;
    color?: string;
    sizeLabel?: string;
    sizeContent?: string;
    inversed?: boolean;
  }>(),
  {
    label: 'Label',
    important: false,
    enabled: true,
    color: 'text-primary',
    sizeLabel: 'text-sm',
    sizeContent: 'text-lg',
    inversed: false,
  },
);
</script>
