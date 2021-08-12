<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useServiceStore } from '@/store/service';

export default defineComponent({
  name: 'ServiceAuthorize',

  created() {
    const store = useServiceStore();

    setTimeout(() => {
      const name = this.$route.params.name as string;
      const { code, state: _state } = this.$route.query;

      store.updateTokens(name, { code });

      // eslint-disable-next-line no-void
      void this.$router
        .push({
          name: 'ServicesView',
          params: {
            name,
          },
        })
        .then(() => {
          // do nothing
        });
    }, 500);
  },
});
</script>

<style lang="postcss" scoped></style>
