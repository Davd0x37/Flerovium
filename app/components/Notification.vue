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
        <p class="font-bold text-lg text-primary-light">{{ notif.title }}</p>
        <p>
          {{ notif.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { debug } from 'debug';
import { NotificationMode, Notification } from '@/types/notification';
import { useNotificationStore } from '@/store/notification';

export default defineComponent({
  name: 'Notification',

  setup() {
    const store = useNotificationStore();

    store.$subscribe((mutation, state) => {
      debug('mutation')(mutation);
      debug('state')(state);
    }, true);
    return {
      store,
    };
  },

  computed: {
    notifications(): Notification[] {
      return this.store.notifications;
    },
  },

  methods: {
    classMode(mode: NotificationMode) {
      const modes = {
        success: 'bg-success',
        info: 'bg-info',
        warning: 'bg-warning',
        error: 'bg-danger',
      };

      return modes[mode];
    },
  },
});
</script>

<style lang="postcss"></style>
