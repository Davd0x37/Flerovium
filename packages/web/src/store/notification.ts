import { defineStore } from 'pinia';

import { NotificationState } from '@/types/store';
import { Notification } from '@/types/notification';

export const useNotificationStore = defineStore('notification', {
  persists: {
    key: 'notificationStore',
  },
  state: () =>
    ({
      list: [],
    } as NotificationState),

  getters: {
    notifications: state => state.list,
  },

  actions: {
    showNotification(notification: Notification) {
      this.list.push(notification);
    },

    removeNotification() {
      this.list.shift();
    },
  },
});
