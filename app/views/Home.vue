<template>
  <div class="flex flex-wrap">
    <div v-for="service in servicesList" :key="service.$id" class="max-w-4xl">
      <Service
        v-if="service.config.isEnabled"
        :title="service.name"
        :icon="service.config.icon"
        :color="service.config.color"
        :data="service.data"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Service from '@/components/Service.vue';
import { useServiceStore } from '@/store/service';
import { useStore } from '@/store/main';

const store = useStore();
const storeService = useServiceStore();

const servicesList = ref(storeService.servicesList);

watch(
  () => store.search,
  () => {
    const { search } = store;

    if (search !== '') {
      const reg = new RegExp(search, 'gmi');

      servicesList.value = storeService.servicesList.filter(service =>
        reg.exec(service.name),
      );
    } else {
      servicesList.value = storeService.servicesList;
    }
  },
);
</script>
