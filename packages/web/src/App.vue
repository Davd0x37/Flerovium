<template>
  <div>
    <div
      class="text-primary bg-secondary-dark font-display flex flex-col h-full min-h-screen min-w-min"
    >
      <component :is="isAuth ? DefaultLayout : WelcomeLayout"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import init from 'cryfler';

import { useStore } from './store/main';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import WelcomeLayout from '@/layouts/WelcomeLayout.vue';

const store = useStore();
const isAuth = computed(() => store.isAuthenticated);

onMounted(async () => {
  await init();
});
</script>

<style lang="postcss">
html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: theme('width[3.5]');
  height: theme('width[3.5]');
}

::-webkit-scrollbar-track {
  background: theme('backgroundColor.default');
}

::-webkit-scrollbar-corner {
  background: theme('backgroundColor.default');
}

::-webkit-scrollbar-thumb {
  border-radius: theme('borderRadius.DEFAULT');
  background-color: theme('backgroundColor.brand');
}
</style>
