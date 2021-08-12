<template>
  <div
    class="
      bg-primary
      dark:bg-secondary
      text-secondary
      dark:text-primary-light
      rounded-xl
      font-bold
      p-2.5
      m-5
    "
  >
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
        class="px-5 py-2.5"
        :label="val.label"
        :important="val.isImportant"
        :color="color"
        :enabled="val.isEnabled"
        light-on-dark
        >{{ val.detail }}</v-label
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VLabel from '@/components/common/VLabel.vue';
import VIcon from '@/components/common/VIcon.vue';

export default defineComponent({
  name: 'Service',

  components: {
    VLabel,
    VIcon,
  },

  props: {
    title: { type: String, default: 'Service', required: true },
    icon: { type: String, default: 'lab la-windows', required: true },
    color: { type: String, default: '#1db954', required: false },
    data: { type: Object, required: true },
  },
});
</script>

<style lang="postcss"></style>
