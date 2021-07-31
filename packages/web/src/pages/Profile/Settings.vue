<template>
  <div>
    <v-button @click="theme">{{ $t('actions.changeTheme') }}</v-button>
    <v-button @click="save">{{ $t('actions.save') }}</v-button>

    <a href="#" ref="download" v-show="false">download</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/common/VButton.vue';
import { ACTIONS, GETTERS } from '@/store/names';
import { downloadVault, openVault } from '@/api/actions';

export default defineComponent({
  name: 'ProfileSettings',
  components: {
    VButton,
  },
  methods: {
    theme() {
      this.$store.dispatch(ACTIONS.TOGGLE_DARK_MODE);
    },

    async save() {
      try {
        const link = this.$refs.download as HTMLAnchorElement;
        const vault = this.$store.getters[GETTERS.VAULT];
        const { url, name } = await downloadVault(vault);

        link.href = url;
        link.download = `${name}-encrypted.json`;
        link.click();
      } catch (error) {
        console.error(error);
        this.$notification.show({
          mode: 'error',
          title: 'Error while exporting vault',
          message: error,
        });
      }
    },
  },
});
</script>

<style lang="postcss" scoped></style>
