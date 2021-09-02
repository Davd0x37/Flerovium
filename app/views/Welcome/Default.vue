<template>
  <div class="flex flex-col h-screen items-center justify-center">
    <div class="flex flex-row text-center">
      <router-link :to="{ name: 'WelcomeOpen' }">
        <v-icon size="la-5x" icon="las la-lock" />
        <p>{{ $t('actions.open') }}</p>
      </router-link>

      <router-link :to="{ name: 'WelcomeCreate' }">
        <v-icon size="la-5x" icon="las la-plus" />
        <p>{{ $t('actions.createNew') }}</p>
      </router-link>

      <div class="border-l-2 mx-5 flex items-center">
        <locale-changer></locale-changer>
      </div>
    </div>

    <div class="mt-5">
      <router-view :key="route.fullPath" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VIcon from '@/components/common/VIcon.vue';
import LocaleChanger from '@/components/LocaleChanger.vue';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  void router.push({
    name: 'WelcomeOpen',
  });
});
</script>
