<template>
  <div class="flex flex-col flex-wrap">
    <v-input
      v-model="fields.name"
      :title="$t('form.vaultName')"
      required
      @click="v$.$touch"
    ></v-input>

    <v-input
      v-model="fields.password"
      :title="$t('form.password')"
      :min-length="6"
      required
      type="password"
      @click="v$.$touch"
    ></v-input>

    <v-input
      v-model="fields.repeatPassword"
      :title="$t('form.repeatPassword')"
      :min-length="6"
      :rules="rules"
      required
      type="password"
      @click="v$.$touch"
    ></v-input>

    <v-input
      v-model="fields.useBuiltin"
      :title="$t('form.useBuiltin')"
      inversed
      required
      type="checkbox"
      @click="v$.$touch"
    ></v-input>

    <v-button v-if="isClear" icon="fa fa-save" @click="save">{{
      $t('actions.save')
    }}</v-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { DerivKey } from 'cryfler';
import { same as sameAs } from '@/i18n/validators';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import { useStore } from '@/store/main';
import { useNotificationStore } from '@/store/notification';

const v$ = useVuelidate();
const fields = reactive({
  name: '',
  password: '',
  repeatPassword: '',
  useBuiltin: true,
});

const isClear = ref(false);

const store = useStore();
const notif = useNotificationStore();
const router = useRouter();

const rules = computed(() => ({
  // FIXME: fix custom validators in vuelidate
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  sameAs: sameAs(fields.password),
}));

watch(
  () => v$.value.$error,
  (_, newV: boolean) => {
    isClear.value = newV;
  },
);

function save(): void {
  try {
    // Clear storage
    localStorage.clear();

    const key = DerivKey.derive_key(fields.password);
    
    const payload = {
      useBuiltin: fields.useBuiltin,
      name: fields.name,
      encryption: {
        raw: key.get_raw(),
        hash: key.get_hash(),
        salt: key.get_salt(),
      },
    };

    store.createVault(payload);

    router.push({ name: 'Home' }).catch(() => {});
  } catch (err) {
    if (err instanceof Error) {
      notif.showNotification({
        mode: 'error',
        title: 'Error while creating vault',
        message: `${err.message}`,
      });
    }
  }
}
</script>
