<template>
  <div>
    <v-button @click="theme">{{ $t('actions.changeTheme') }}</v-button>
    <v-button @click="save">{{ $t('actions.save') }}</v-button>

    <a v-show="false" ref="download" href="#">download</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { debug } from 'debug';

import VButton from '@/components/common/VButton.vue';
import { useStore } from '@/store/main';
import { StorageService } from '@/services/storage.service';
import { useNotificationStore } from '@/store/notification';

export default defineComponent({
  name: 'ProfileSettings',
  components: {
    VButton,
  },

  setup() {
    const store = useStore();
    const notif = useNotificationStore();

    return {
      store,
      notif,
    };
  },

  methods: {
    theme() {
      this.store.toggleDarkMode();
    },

    async save() {
      try {
        const link = this.$refs.download as HTMLAnchorElement;
        const { vault } = this.store;
        const { name, url } = await StorageService.downloadVault(vault);

        link.href = url;
        link.download = `${name}-encrypted.json`;
        link.click();
      } catch (error) {
        if (error instanceof Error) {
          debug('[ProfileSettings]')(`Save: ${error.message}`);

          this.notif.showNotification({
            mode: 'error',
            title: 'Error while exporting vault',
            message: error.message,
          });
        }
      }
    },
  },
});
</script>

<style lang="postcss" scoped></style>
