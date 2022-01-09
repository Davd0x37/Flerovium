<template>
  <div class="flex flex-col w-full">
    <v-label
      v-if="isParamsSet()"
      class="py-2.5"
      size-content="text-3xl"
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
      <v-button icon="fa fa-save" @click="submit">{{
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

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import useVuelidate from '@vuelidate/core';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import VLabel from '@/components/common/VLabel.vue';
import JsonEditor from '@/components/JsonEditor.vue';
import { Service } from '@/types/service';

import { copyObject, GET_REDIRECT_URI } from '@/helpers/utils';
import { useServiceStore } from '@/store/service';

// @TODO: remove or move to config directory
const defaults = (): Service => ({
  $id: '',
  name: '',
  config: {
    icon: '',
    color: '',
    isEnabled: true,
  },
  data: [],
  auth: {
    hasRequestedTokens: false,
    tokens: {},
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
});

const v$ = useVuelidate();
const serviceStore = useServiceStore();

const route = useRoute();
const params = computed(() => route.params);
const service = ref({} as Service);

const { name } = params.value;
if (name) {
  service.value = copyObject(serviceStore.getService(name as string));
} else {
  service.value = defaults();
}

function isParamsSet() {
  return !!route.params?.name;
}

function submit() {
  v$.value.$touch();
  if (v$.value.$error) return;

  // We need to make copy of services obj because vue puts it in proxy and
  // after saving, it automatically changes properties in store
  // instead of copy it stores reactive handler
  const redirectUri = GET_REDIRECT_URI(service.value.name);
  service.value.auth.credentials.redirectUri = redirectUri;

  if (isParamsSet()) {
    serviceStore.updateService(service.value);
  } else {
    serviceStore.addService(service.value);
  }
}
</script>
