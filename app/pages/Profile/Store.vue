<template>
  <div>
    <json-editor
      v-model="vault"
      :mode="mode"
      title="Store"
      height="h-full"
    ></json-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JsonEditor from '@/components/JsonEditor.vue';
import { useStore } from '@/store/main';
import { useServiceStore } from '@/store/service';
import { useNotificationStore } from '@/store/notification';

export default defineComponent({
  name: 'ProfileStore',
  components: { JsonEditor },

  setup() {
    const store = useStore();
    const serviceStore = useServiceStore();
    const notifStore = useNotificationStore();
    const mode = 'view';

    const vault = {
      store: store.$state,
      serviceStore: serviceStore.$state,
      notifStore: notifStore.$state,
    };

    return {
      mode,
      vault,
    };
  },
});
</script>

<style lang="postcss" scoped>
.my-editor {
  height: 650px;
}
</style>
