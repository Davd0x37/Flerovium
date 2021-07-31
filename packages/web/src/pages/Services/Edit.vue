<template>
  <div class="flex flex-col w-full">
    <v-label
      v-if="isParamsSet()"
      class="py-2.5"
      size_content="text-3xl"
      :label="$t('labels.name')"
      important
      :color="service.config.color"
      >{{ service.name }}</v-label
    >
    <v-label v-if="isParamsSet()" class="py-2.5" :label="$t('labels.id')">{{
      service.$id
    }}</v-label>

    <div class="flex flex-wrap">
      <v-input
        v-if="!isParamsSet()"
        v-model="service.name"
        :title="$t('labels.name')"
        required
      />

      <v-input
        v-model="service.config.icon"
        :title="$t('labels.logoIcon')"
        required
      />
      <v-input
        v-model="service.config.color"
        :title="$t('labels.importantColor')"
        required
      />
      <v-input
        v-model="service.auth.credentials.clientId"
        :title="$t('labels.clientId')"
        required
      />
      <v-input
        v-model="service.auth.credentials.clientSecret"
        :title="$t('labels.clientSecret')"
        required
      />
      <v-input
        v-model="service.auth.credentials.authorizationUri"
        :title="$t('labels.authorizationUri')"
        required
      />
      <v-input
        v-model="service.auth.credentials.tokenEndpointUri"
        :title="$t('labels.tokenEndpointUri')"
        required
      />
      <v-input
        v-model="service.auth.credentials.scope"
        :title="$t('labels.scope')"
        required
      />
      <v-input
        v-model="service.config.isEnabled"
        type="checkbox"
        :title="
          service.config.isEnabled
            ? $t('actions.enabledService')
            : $t('actions.disabledService')
        "
        required
      />
    </div>
    <div>
      <v-button @click="submit" icon="las la-save">{{
        $t('form.submit')
      }}</v-button>
    </div>
    <div>
      <json-editor
        v-model="service.dataPaths"
        :title="$t('services.dataPaths')"
      ></json-editor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import useVuelidate from '@vuelidate/core';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import VLabel from '@/components/common/VLabel.vue';
import JsonEditor from '@/components/JsonEditor.vue';
import { Service } from '@/store/modules/services/types';

import { copyObject } from '@/common/functions';
import { GET_REDIRECT_URI } from '@/common/helpers';
import { ACTIONS, GETTERS } from '@/store/names';

// @TODO: add context and plurals to i18n

export default defineComponent({
  name: 'ServicesEdit',
  components: {
    JsonEditor,
    VInput,
    VButton,
    VLabel,
  },

  data() {
    return {
      v$: useVuelidate(),
      service: {} as Service,
    };
  },

  created() {
    if (this.isParamsSet()) {
      const serviceName = this.$route.params.name;
      this.service = this.$store.getters[GETTERS.GET_SERVICE](
        serviceName,
        true,
      );
    } else {
      // @FIXME: remove 'any' and implement it properly
      this.service = {
        name: '',
        config: {
          icon: '',
          color: '',
          isEnabled: true,
        },
        auth: {
          credentials: {
            clientId: '',
            clientSecret: '',
            authorizationUri: '',
            tokenEndpointUri: '',
            scope: '',
          },
        },
        dataPaths: [
          {
            name: 'path name',
            path: 'path',
            select: [
              {
                label: 'Verifired',
                detail: 'verified',
                isImportant: true,
                isEnabled: true,
                matcher: {
                  true: 'Yes',
                  false: 'No',
                },
              },
            ],
          },
        ],
      } as any;
    }
  },

  methods: {
    isParamsSet() {
      return !!this.$route.params?.name;
    },

    submit() {
      this.v$.$touch();
      if (this.v$.$error) return;

      // We need to make copy of services obj because vue puts it in proxy and
      // after saving, it automatically changes properties in store
      // instead of copy it stores reactive handler
      const copiedService = copyObject(this.service);
      const redirectUri = GET_REDIRECT_URI(copiedService.name);
      copiedService.auth.credentials.redirectUri = redirectUri;

      if (this.isParamsSet()) {
        this.$store.dispatch(ACTIONS.UPDATE_SERVICE, copiedService);
      } else {
        this.$store.dispatch(ACTIONS.ADD_SERVICE, copiedService);
      }
    },
  },
});
</script>

<style lang="postcss" scoped></style>
