<template>
  <div class="flex flex-col flex-wrap">
    <file-selector
      inversed
      :class="selected && 'opacity-30'"
      :spin="spin"
      @change="onUploadFiles"
    />

    <v-input
      v-model="password"
      :title="$t('form.password')"
      light-on-dark
      required
      type="password"
      :rules="rules"
      @click="v$.$touch"
    ></v-input>

    <v-button
      v-if="isClear && selected"
      icon="las la-lock"
      inversed
      @click="open()"
      >{{ $t('actions.open') }}</v-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { debug } from 'debug';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import FileSelector from '@/components/FileSelector.vue';

import { readFile } from '@/helpers/fs';
import { StorageService } from '@/services/storage.service';
import { useStore } from '@/store/main';
import { FileReadHandlers } from '@/types/fs';

export default defineComponent({
  name: 'WelcomeOpen',
  components: {
    VInput,
    VButton,
    FileSelector,
  },

  setup() {
    const v$ = useVuelidate();
    const store = useStore();

    const selected = ref(false);
    const password = ref('');
    const payload = ref('');
    const isClear = ref(false);
    const spin = ref(false);
    const rules = {
      required,
      minLength: minLength(6),
    };

    return {
      v$,
      store,
      selected,
      password,
      payload,
      isClear,
      spin,
      rules,
    };
  },

  watch: {
    // Must be checked in watch because computed is not accessible during rendering
    'v$.$error': function checkError(_, newV: boolean) {
      this.isClear = newV;
    },
  },

  methods: {
    async open() {
      try {
        await StorageService.openVault(this.payload, this.password);

        void this.$router.push({ name: 'Home' });
      } catch (error) {
        if (error instanceof Error) {
          debug('[WelcomeOpen]')(`Open: ${error.message}`);
        }
        throw new Error(`[WelcomeOpen] Open - Throw ERROR`);
      }
    },

    handlers(): FileReadHandlers {
      const onload = (res: string, _ev: ProgressEvent<FileReader>) => {
        setTimeout(() => {
          this.spin = false;
          this.selected = true;
        }, 700);

        this.payload = res;
      };

      const onerror = (ev: ProgressEvent<FileReader>) => {
        debug('[WelcomeOpen]')(`handlers: loaded = ${ev.loaded}`);
      };

      const onprogress = () => {
        this.spin = true;
      };

      const onabort = (ev: ProgressEvent<FileReader>) => {
        debug('[WelcomeOpen]')(`handlers: loaded = ${ev.loaded}`);
      };

      return {
        onload,
        onerror,
        onprogress,
        onabort,
      };
    },

    onUploadFiles(event: Event) {
      const target = event.target as HTMLInputElement;
      const { files } = target;

      if (files && files.length > 0) {
        const file = files.item(0);
        if (file) readFile(file, this.handlers());
      }
    },
  },
});
</script>

<style lang="postcss" scoped></style>
