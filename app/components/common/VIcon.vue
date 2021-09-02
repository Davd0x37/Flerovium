<template>
  <i :class="[size, icon]"></i>
</template>

<script lang="ts" setup>
const _props = withDefaults(
  defineProps<{
    size?: string;
    icon: string;
  }>(),
  {
    size: 'la-lg',
    icon: 'las la-sync',
  },
);
</script>
