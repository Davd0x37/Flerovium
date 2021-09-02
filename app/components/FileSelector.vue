<template>
  <div>
    <label
      for="file"
      class="
        border
        rounded
        p-2.5
        mx-5
        flex flex-row
        items-center
        cursor-pointer
        text-primary-dark
        bg-gray-700
      "
    >
      <v-icon v-if="!spin" class="pr-2.5" icon="las la-lock" />

      <svg
        v-if="spin"
        class="animate-spin h-5 w-5 mr-3 border-brand border-r-2 rounded-full"
        viewBox="0 0 24 24"
      ></svg>

      <p>{{ $t('actions.selectFile') }}</p>
    </label>

    <input id="file" type="file" name="file" class="hidden" />
  </div>
</template>

<script lang="ts" setup>
import VIcon from '@/components/common/VIcon.vue';

const _props = withDefaults(
  defineProps<{
    icon?: string;
    spin?: boolean;
  }>(),
  {
    icon: 'las la-lock',
    spin: false,
  },
);
</script>
