<template>
  <div>
    <div
      class="
        text-primary
        bg-secondary-dark
        font-display
        flex flex-col
        h-full
        min-h-screen min-w-min
      "
    >
      <component :is="isAuth ? DefaultLayout : WelcomeLayout"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';

import { useStore } from './store/main';
import { useServiceStore } from '@/store/service';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import WelcomeLayout from '@/layouts/WelcomeLayout.vue';
import { isElectron } from './helpers/utils';

const store = useStore();
const isAuth = computed(() => store.isAuthenticated);

if (isElectron) {
  // Allow ipcRendener only in electron
  onMounted(() => {
    const serviceStore = useServiceStore();

    /* eslint-disable @typescript-eslint/no-unsafe-call */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    window.authApi.onServiceAuth(query => {
      const url = new URL(query);
      const name = url.pathname.split('/').pop();
      const params = url.searchParams;
      if (name) {
        const code = params.get('code');
        const _state = params.get('state');

        serviceStore.updateTokens(name, { code });
      }
    });
  });
}
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
