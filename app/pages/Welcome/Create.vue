<template>
  <div class="flex flex-col flex-wrap">
    <v-input
      v-model="fields.name"
      :title="$t('form.vaultName')"
      light-on-dark
      required
      @click="v$.$touch"
    ></v-input>
    <v-input
      v-model="fields.password"
      :title="$t('form.password')"
      light-on-dark
      required
      :min-length="6"
      type="password"
      @click="v$.$touch"
    ></v-input>
    <v-input
      v-model="fields.repeatPassword"
      :title="$t('form.repeatPassword')"
      light-on-dark
      required
      :min-length="6"
      type="password"
      :rules="rules"
      @click="v$.$touch"
    ></v-input>
    <v-input
      v-model="fields.useBuiltin"
      :title="$t('form.useBuiltin')"
      light-on-dark
      required
      type="checkbox"
      @click="v$.$touch"
    ></v-input>

    <v-button v-if="isClear" icon="las la-save" inversed @click="save">{{
      $t('actions.save')
    }}</v-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { sameAs } from '@vuelidate/validators';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import { Argon2 } from '@/helpers/hash';
import { useStore } from '@/store/main';
import { useNotificationStore } from '@/store/notification';

export default defineComponent({
  name: 'WelcomeCreate',
  components: {
    VInput,
    VButton,
  },

  setup() {
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

    return {
      v$,
      fields,
      isClear,
      store,
      notif,
    };
  },

  computed: {
    rules(): Record<string, unknown> {
      return {
        sameAs: sameAs(this.fields.password),
      };
    },
  },

  watch: {
    'v$.$error': function checkError(_, newV: boolean) {
      this.isClear = newV;
    },
  },

  methods: {
    async save(): Promise<void> {
      try {
        // @TODO: Move this to store actions?
        const [salt, encoded] = await Argon2.hash(this.fields.password);
        const payload = {
          useBuiltin: this.fields.useBuiltin,
          name: this.fields.name,
          encryption: {
            passwordHash: encoded,
            salt,
          },
        };

        this.store.createVault(payload);

        await this.$router.push({ name: 'Home' });
      } catch (err) {
        if (err instanceof Error) {
          this.notif.showNotification({
            mode: 'error',
            title: 'Error while creating vault',
            message: `${err.message}`,
          });
        }
      }
    },
  },
});
</script>

<style lang="postcss" scoped></style>
