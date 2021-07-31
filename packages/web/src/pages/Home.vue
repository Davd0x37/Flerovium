<template>
  <div class="flex flex-wrap">
    <div class="max-w-4xl" v-for="service in services" :key="service.$id">
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

<script lang="ts">
import { defineComponent } from 'vue';
import Service from '@/components/Service.vue';
import { GETTERS } from '@/store/names';

export default defineComponent({
  name: 'Default',
  components: {
    Service,
  },

  computed: {
    services() {
      return this.$store.getters[GETTERS.SERVICES_LIST](true);
    },
  },
});
</script>

<style lang="postcss" scoped></style>
