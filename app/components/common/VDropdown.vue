<template>
  <div class="group w-max relative">
    <button
      class="text-primary w-max p-2.5 border bg-brand border-gray-500 rounded"
    >
      {{ title }}
    </button>
    <nav
      class="
        absolute
        hidden
        group-hover:flex
        flex-col
        bg-gray-600
        drop-shadow-xl
        transition-shadow
        border-2 border-gray-800
        rounded
        w-60
        overflow-hidden
      "
    >
      <slot></slot>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const _props = withDefaults(defineProps<{ title: string }>(), {
  title: 'Click me',
});
</script>
