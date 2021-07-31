import { $api } from '@/api';
import { $notification } from '@/services';

export default {
  computed: {
    $api: () => $api,
    $notification: () => $notification,
  },
};
