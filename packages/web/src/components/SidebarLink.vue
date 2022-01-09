<template>
  <router-link
    v-slot="{ isExactActive }"
    class="w-full font-bold text-primary text-xs"
    :to="href"
  >
    <div
      :class="[
        'flex place-items-center py-2 my-1 rounded transition h-10',
        isExactActive ? 'bg-brand' : 'hover:bg-gray-700',
        iconOnly ? 'justify-center' : '',
      ]"
    >
      <v-icon
        :icon="icon"
        :size="size"
        :class="!iconOnly ? ['pr-5', 'pl-2.5'] : ''"
      />
      <slot></slot>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import VIcon from '@/components/common/VIcon.vue';

const _props = defineProps<{
  icon: string;
  size: string;
  href: Record<string, unknown>;
  iconOnly?: boolean;
}>();
</script>
