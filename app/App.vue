<template>
  <div :class="isDarkMode ? 'dark' : ''">
    <div
      class="
        bg-primary
        dark:bg-secondary
        text-secondary
        dark:text-primary
        font-display
        flex flex-col
        h-full
        min-h-screen min-w-min
      "
    >
      <component :is="layout"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

import { useStore } from './store/main';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import WelcomeLayout from '@/layouts/WelcomeLayout.vue';

export default defineComponent({
  name: 'App',

  components: {
    DefaultLayout,
    WelcomeLayout,
  },

  setup() {
    const store = useStore();
    const layout = ref('');

    return {
      layout,
      store,
    };
  },

  computed: {
    isDarkMode(): boolean {
      return this.store.isDarkMode;
    },
  },

  watch: {
    $route(to: RouteLocationNormalized) {
      if (to.meta.layout !== undefined) {
        this.layout = to.meta.layout as string;
      } else {
        this.layout = 'DefaultLayout';
      }
    },
  },
});
</script>

<style lang="postcss"></style>
