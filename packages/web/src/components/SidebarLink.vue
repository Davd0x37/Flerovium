<template>
  <router-link
    class="w-full font-bold text-secondary dark:text-primary text-xs"
    v-slot="{ isExactActive }"
    :to="href"
  >
    <!-- @TODO: Change colors of text and background - use primary, etc. from theme colors -->
    <div
      :class="[
        'flex place-items-center py-2 my-1 rounded transition h-10',
        !isExactActive
          ? [
              'hover:bg-secondary',
              'hover:text-primary',
              'dark:hover:bg-primary',
              'dark:hover:text-secondary',
            ]
          : ['bg-brand', 'text-secondary', 'dark:text-primary'],
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

<script lang="ts">
import { defineComponent } from 'vue';
import VIcon from '@/components/common/VIcon.vue';

export default defineComponent({
  name: 'SidebarLink',

  components: {
    VIcon,
  },

  props: {
    color: { type: String, required: false },
    icon: { type: String, required: true },
    size: { type: String, required: true },
    href: { type: [String, Object], required: true },
    iconOnly: { type: Boolean, default: false, required: false },
  },
});
</script>

<style lang="postcss"></style>
