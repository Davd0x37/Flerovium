<template>
  <div v-if="$route.name == $options.name">
    <!-- <v-button icon="las la-sync" @click="refresh">{{
      $t('actions.refresh')
    }}</v-button> -->
  </div>
  <router-view v-else :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import VButton from '@/components/common/VButton.vue';
// import { useServiceStore } from '@/store/service';
// import { ApiService } from '@/services/api.service';

export default defineComponent({
  name: 'ServicesDefault',

  components: {
    // VButton,
  },

  // setup() {
  //   const serviceStore = useServiceStore();
  //   const services = serviceStore.servicesList;

  //   return {
  //     serviceStore,
  //     services,
  //   };
  // },

  methods: {
    // async refresh(): Promise<void> {
    //   // const apiService = new ApiService();
    //   // this.services.forEach(service => apiService.requestData(service));
    // },
  },
});
</script>

<style lang="postcss" scoped></style>
