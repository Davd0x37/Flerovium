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
import { same as sameAs } from '@/i18n/validators';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import { Argon2 } from '@/helpers/hash';
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

async function save(): Promise<void> {
  try {
    // Clear storage
    localStorage.clear();

    // @TODO: Move this to store actions?
    const [salt, encoded] = await Argon2.hash(fields.password);
    const payload = {
      useBuiltin: fields.useBuiltin,
      name: fields.name,
      encryption: {
        passwordHash: encoded,
        salt,
      },
    };

    store.createVault(payload);

    await router.push({ name: 'Home' });
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
