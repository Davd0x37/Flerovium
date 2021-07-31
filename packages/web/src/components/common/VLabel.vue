<template>
  <div
    v-if="enabled"
    :class="[
      lightOnDark
        ? 'text-secondary dark:text-primary'
        : 'dark:text-secondary text-primary',
    ]"
  >
    <p :class="['font-normal leading-3', size_label]">
      {{ label }}
    </p>
    <p :style="important ? { color } : ''" :class="size_content">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VLabel',

  props: {
    label: { type: String, required: true, default: 'Label' },
    important: { type: Boolean, required: false, default: false },
    enabled: { type: Boolean, required: false, default: true },
    color: { type: String, required: false, default: 'white' },
    size_label: { type: String, required: false, default: 'test-sm' },
    size_content: { type: String, required: false, default: 'test-lg' },
    lightOnDark: { type: Boolean, required: false, default: false },
  },
});
</script>

<style lang="postcss"></style>
