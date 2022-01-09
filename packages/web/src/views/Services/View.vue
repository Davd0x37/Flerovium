<template>
  <div class="my-5">
    <v-button icon="fa fa-pen" @click="editService()">{{
      $t('actions.edit')
    }}</v-button>

    <v-button
      v-if="hasRequestedTokens && hasAccessToken"
      icon="fa fa-sync"
      @click="serviceTask(actionsEnum.REQUEST_DATA)"
      >{{ $t('actions.refresh') }}</v-button
    >

    <v-button
      v-if="!hasRequestedTokens && hasAccessToken && hasCredentials"
      icon="fa fa-atom"
      @click="serviceTask(actionsEnum.REQUEST_TOKENS)"
      >{{ $t('actions.requestTokens') }}</v-button
    >

    <v-button
      v-if="!hasRequestedTokens && !hasAccessToken && hasCredentials"
      icon="fa fa-atom"
      @click="serviceTask(actionsEnum.AUTHENTICATE_SERVICE)"
      >{{ $t('actions.authenticate') }}</v-button
    >

    <v-button icon="fa fa-trash" @click="deleteService()">{{
      $t('actions.delete')
    }}</v-button>
  </div>

  <v-tabs>
    <v-tab :title="$t('services.data')">
      <div class="flex flex-col flex-wrap">
        <div
          v-for="val in serviceComp.data"
          :key="val.label"
          class="flex flex-row"
        >
          <v-label
            :label="val.label"
            :important="val.isImportant"
            :color="service.config.color"
            class="py-2.5 w-96"
            >{{ val.detail }}</v-label
          >
          <!-- @TODO: Create custom checkbox -->
          <v-input
            v-model="val.isEnabled"
            type="checkbox"
            :title="
              $t(val.isEnabled ? 'form.enabledOption' : 'form.disabledOption', {
                option: val.label,
              })
            "
          ></v-input>
        </div>
      </div>
    </v-tab>

    <v-tab :title="$t('services.information')">
      <div
        v-for="(val, credName) in service.auth.credentials"
        :key="credName"
        class="flex flex-row flex-wrap"
      >
        <v-label :label="credName" class="py-2.5">{{ val }}</v-label>
      </div>
    </v-tab>

    <v-tab :title="$t('services.dataPaths')">
      <div>
        <json-editor
          v-model="service.dataPaths"
          mode="view"
          :title="$t('services.dataPaths')"
        ></json-editor>
      </div>
    </v-tab>
  </v-tabs>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import debug from 'debug';

import VButton from '@/components/common/VButton.vue';
import VLabel from '@/components/common/VLabel.vue';
import VInput from '@/components/common/VInput.vue';
import VTab from '@/components/tabs/VTab.vue';
import VTabs from '@/components/tabs/VTabs.vue';
import JsonEditor from '@/components/JsonEditor.vue';
import { AuthenticationActionEnum } from '@/types/auth';
import { GET_REDIRECT_URI, isBrowser } from '@/helpers/utils';
import { useServiceStore } from '@/store/service';
import { ApiService } from '@/services/api.service';

const serviceStore = useServiceStore();
const actionsEnum = ref(AuthenticationActionEnum);

const route = useRoute();
const router = useRouter();
const params = computed(() => route.params);

const { name } = params.value;
const redirectUri = GET_REDIRECT_URI(name as string);

const service = ref(serviceStore.getService(name as string));
service.value.auth.credentials.redirectUri = redirectUri;

const serviceComp = computed(() => ({
  ...serviceStore.getService(name as string),
  auth: {
    credentials: {
      redirectUri,
    },
  },
}));

const hasRequestedTokens = computed(() =>
  serviceStore.hasRequestedTokens(serviceComp.value.name),
);
const hasAccessToken = computed(() =>
  serviceStore.hasAccessToken(serviceComp.value.name),
);
const hasCredentials = computed(() =>
  serviceStore.hasCredentials(serviceComp.value.name),
);

function editService(): void {
  router
    .push({
      name: 'ServicesEdit',
      params: {
        name: service.value.name,
      },
    })
    .catch(err => debug('editService')(err));
}

function deleteService(): void {
  serviceStore.deleteService(service.value.name);

  router
    .push({
      name: 'ServicesDefault',
    })
    .catch(err => debug('deleteService')(err));
}

/**
 * @TODO:
 * Move logic from current component into api service?
 * Pros: handling data and changes will be made only in one file
 * Cons: api service handles all tasks:
 * - requesting data from service
 * - normalizing data
 * - saving in store
 * - redirecting? (or return path from method and redirect in view component)
 */
async function serviceTask(taskNum: AuthenticationActionEnum): Promise<void> {
  const apiService = new ApiService();

  switch (taskNum) {
    case AuthenticationActionEnum.REQUEST_DATA: {
      await apiService.refreshService(service.value.name);
      break;
    }

    case AuthenticationActionEnum.REQUEST_TOKENS: {
      await apiService.requestTokens(service.value);
      break;
    }

    case AuthenticationActionEnum.AUTHENTICATE_SERVICE: {
      const authorizationUri = await apiService.authenticate(service.value);

      if (isBrowser) {
        // window.open(
        //   authorizationUri,
        //   '_blank',
        //   'top=200,width=980,height=720,frame=true,nodeIntegration=no',
        // );
        window.location.replace(authorizationUri);
      }
      break;
    }

    default: {
      break;
    }
  }
}
</script>
