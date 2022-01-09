<template>
  <div class="text-primary bg-secondary-dark rounded-xl font-bold p-2.5 m-5">
    <div class="flex flex-wrap justify-between p-2.5">
      <div class="flex-grow-0 font-normal">
        <v-icon :icon="icon" size="la-3x" :style="{ color }" />
      </div>
      <div class="flex-grow self-center justify-self-start ml-4">
        <p class="text-2xl">{{ title }}</p>
      </div>
    </div>

    <div class="flex flex-row flex-wrap">
      <v-label
        v-for="val in data"
        :key="val.label"
        :label="val.label"
        :important="val.isImportant"
        :color="color"
        :enabled="val.isEnabled"
        class="px-5 py-2.5"
        >{{ val.detail }}</v-label
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import VLabel from '@/components/common/VLabel.vue';
import VIcon from '@/components/common/VIcon.vue';
import { Data } from '@/types/service';

const _props = withDefaults(
  defineProps<{
    title: string;
    icon: string;
    color?: string;
    data: Data[];
  }>(),
  {
    title: 'Service',
    icon: 'lab la-github',
    color: '#1db954',
  },
);
</script>
