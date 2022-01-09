<template>
  <div v-if="$route.name == $options.name">
    <v-button v-if="servicesExist" icon="fa fa-sync" @click="refresh">{{
      $t('actions.refresh')
    }}</v-button>
  </div>
  <router-view v-else :key="$route.fullPath" />
</template>

<script lang="ts">
/* eslint-disable import/first */
export default {
  name: 'ServicesDefault',
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import VButton from '@/components/common/VButton.vue';
import { useServiceStore } from '@/store/service';
import { ApiService } from '@/services/api.service';

const serviceStore = useServiceStore();
const apiService = new ApiService();
const servicesExist = computed(() => serviceStore.servicesExist);

async function refresh(): Promise<void> {
  await apiService.refreshServices();
}
</script>
