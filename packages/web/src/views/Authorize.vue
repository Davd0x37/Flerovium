<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useServiceStore } from '@/store/service';

onMounted(() => {
  const store = useServiceStore();
  const route = useRoute();
  const router = useRouter();

  setTimeout(() => {
    const name = route.params.name as string;
    const { code, state: _state } = route.query;

    store.updateTokens(name, { code });

    void router.push({
      name: 'ServicesView',
      params: {
        name,
      },
    });
    // window.close();
  }, 500);
});
</script>
