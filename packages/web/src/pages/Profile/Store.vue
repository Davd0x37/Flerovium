<template>
  <div>
    <json-editor
      :mode="options.mode"
      title="Store"
      v-model="vault"
      height="h-full"
    ></json-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JsonEditor from '@/components/JsonEditor.vue';
import { GETTERS } from '@/store/names';

export default defineComponent({
  name: 'ProfileStore',
  components: { JsonEditor },
  data() {
    return {
      options: {
        mode: 'view',
      },
      vault: this.$store.getters[GETTERS.VAULT],
    };
  },
});
</script>

<style lang="postcss" scoped>
.my-editor {
  height: 650px;
}
</style>
