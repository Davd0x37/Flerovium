<template>
  <div>
    <json-editor
      v-model="vault"
      mode="view"
      :title="$t('services.dataPaths')"
      height="h-full"
    ></json-editor>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/main';
import { useServiceStore } from '@/store/service';
import { useNotificationStore } from '@/store/notification';
import JsonEditor from '@/components/JsonEditor.vue';

const store = useStore();
const serviceStore = useServiceStore();
const notifStore = useNotificationStore();

// eslint-disable-next-line prefer-const
let vault = {
  store: store.$state,
  serviceStore: serviceStore.$state,
  notifStore: notifStore.$state,
};
</script>
