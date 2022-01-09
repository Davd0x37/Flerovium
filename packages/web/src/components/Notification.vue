<template>
  <div class="absolute right-2.5">
    <div v-if="notifications.length > 0">
      <div
        v-for="notif in notifications"
        :key="notif.title"
        :class="[
          classMode(notif.mode),
          'rounded my-4 p-4 w-80 flex flex-col text-primary',
        ]"
      >
        <p class="font-bold text-lg text-primary">{{ notif.title }}</p>
        <p>
          {{ notif.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { debug } from 'debug';
import { NotificationMode } from '@/types/notification';
import { useNotificationStore } from '@/store/notification';

const store = useNotificationStore();
const notifications = computed(() => store.notifications);

store.$subscribe(
  (mutation, state) => {
    debug('mutation')(mutation);
    debug('state')(state);
  },
  { detached: true },
);

function classMode(mode: NotificationMode) {
  const modes = {
    success: 'bg-success',
    info: 'bg-info',
    warning: 'bg-warning',
    error: 'bg-danger',
  };

  return modes[mode];
}
</script>

<style lang="postcss"></style>
