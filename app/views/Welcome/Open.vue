<template>
  <div class="flex flex-col flex-wrap">
    <file-selector
      :class="selected && 'opacity-30'"
      :spin="spin"
      @change="onUploadFiles"
    />

    <v-input
      v-model="password"
      required
      type="password"
      :title="$t('form.password')"
      :rules="rules"
      @click="v$.$touch"
    ></v-input>

    <v-button v-if="isClear && selected" icon="las la-lock" @click="open()">{{
      $t('actions.open')
    }}</v-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, unref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { debug } from 'debug';
import { req as required, minLen as minLength } from '@/i18n/validators';
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import FileSelector from '@/components/FileSelector.vue';

import { readFile } from '@/helpers/fs';
import { StorageService } from '@/services/storage.service';
import { FileReadHandlers } from '@/types/fs';

const v$ = useVuelidate();
const router = useRouter();
const selected = ref(false);
const password = ref('');
const payload = ref('');
const isClear = ref(false);
const spin = ref(false);
const rules = {
  required,

  // FIXME: fix custom validators in vuelidate
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  minLength: minLength(6),
};

watch(
  () => v$.value.$error,
  (_, newV: boolean) => {
    isClear.value = newV;
  },
);

async function open() {
  try {
    // Clear storage
    localStorage.clear();

    await StorageService.openVault(unref(payload.value), unref(password.value));

    void router.push({ name: 'Home' });
  } catch (error) {
    if (error instanceof Error) {
      debug('[WelcomeOpen]')(`Open: ${error.message}`);
    }
    throw new Error(`[WelcomeOpen] Open - Throw ERROR`);
  }
}

function handlers(): FileReadHandlers {
  const onload = (res: string, _ev: ProgressEvent<FileReader>) => {
    setTimeout(() => {
      spin.value = false;
      selected.value = true;
    }, 700);

    payload.value = res;
  };

  const onerror = (ev: ProgressEvent<FileReader>) => {
    debug('[WelcomeOpen]')(`handlers: loaded = ${ev.loaded}`);
  };

  const onprogress = () => {
    spin.value = true;
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
}

function onUploadFiles(event: Event) {
  const target = event.target as HTMLInputElement;
  const { files } = target;

  if (files && files.length > 0) {
    const file = files.item(0);
    if (file) readFile(file, handlers());
  }
}
</script>

<style lang="postcss" scoped></style>
