<template>
  <div v-if="$route.name == $options.name">
    <v-button icon="las la-sync" @click="refresh">{{
      $t('actions.refresh')
    }}</v-button>
  </div>
  <router-view :key="$route.fullPath" v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/common/VButton.vue';
import { GETTERS } from '@/store/names';
import { Service } from '@/store/modules/services/types';
import { runRequestData } from '@/api/actions';

export default defineComponent({
  name: 'ServicesDefault',

  components: {
    VButton,
  },

  data() {
    return {
      services: [] as Service[],
    };
  },

  created() {
    this.services = this.$store.getters[GETTERS.SERVICES_LIST]();
  },

  methods: {
    async refresh() {
      this.services.forEach(async service => await runRequestData(service));
    },
  },
});
</script>

<style lang="postcss" scoped></style>
