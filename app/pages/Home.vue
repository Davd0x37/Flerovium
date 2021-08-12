<template>
  <div class="flex flex-wrap">
    <div v-for="service in services" :key="service.$id" class="max-w-4xl">
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
import { useServiceStore } from '@/store/service';
import { Service as ServiceType } from '@/types/service';

export default defineComponent({
  name: 'Default',
  components: {
    Service,
  },

  setup() {
    const store = useServiceStore();

    return {
      store,
    };
  },

  computed: {
    services(): ServiceType[] {
      return this.store.servicesList;
    },
  },
});
</script>

<style lang="postcss" scoped></style>
