<template>
  <div class="flex flex-col flex-wrap">
    <v-input
      :title="$t('form.vaultName')"
      lightOnDark
      required
      v-model="name"
      @click="v$.$touch"
    ></v-input>
    <v-input
      :title="$t('form.password')"
      lightOnDark
      required
      type="password"
      v-model="password"
      @click="v$.$touch"
    ></v-input>
    <v-input
      :title="$t('form.repeatPassword')"
      lightOnDark
      required
      type="password"
      v-model="repeatPass"
      @click="v$.$touch"
      :rules="rules"
    ></v-input>
    <v-input
      :title="$t('form.useBuiltin')"
      lightOnDark
      required
      type="checkbox"
      v-model="useBuiltin"
      @click="v$.$touch"
    ></v-input>

    <v-button icon="las la-save" @click="save" v-if="isClear" inversed>{{
      $t('actions.save')
    }}</v-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { sameAs } from '@vuelidate/validators';

import VIcon from '@/components/common/VIcon.vue';
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import { ACTIONS } from '@/store/names';

import { functions } from '@flerovium/crypto';

export default defineComponent({
  name: 'WelcomeCreate',
  components: {
    VIcon,
    VInput,
    VButton,
  },

  data() {
    return {
      v$: useVuelidate(),
      name: '',
      password: '',
      repeatPass: '',
      useBuiltin: true,
      isClear: false,
    };
  },

  watch: {
    'v$.$error': function (_, newV) {
      this.isClear = newV;
    },
  },

  computed: {
    rules: function () {
      return {
        // @ts-ignore
        sameAs: sameAs(this.password),
      };
    },
  },

  methods: {
    async save() {
      try {
        const hash = await functions.Argon2.hash(this.password);
        const payload = {
          useBuiltin: this.useBuiltin,
          name: this.name,
          encryption: {
            passwordHash: hash?.encoded,
            salt: hash?.salt,
          },
        };

        await this.$store.dispatch(ACTIONS.CREATE_VAULT, payload);

        this.$router.push({ name: 'Home' });
      } catch (err) {
        this.$notification.show({
          mode: 'error',
          title: 'Error while creating vault',
          message: err,
        });
      }
    },
  },
});
</script>

<style lang="postcss" scoped></style>
