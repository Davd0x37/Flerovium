<template>
  <div class="my-5">
    <v-button icon="las la-pen" @click="editService()">{{
      $t('actions.edit')
    }}</v-button>

    <v-button
      icon="las la-sync"
      @click="serviceTask(actionsEnum.REQUEST_DATA)"
      >{{ $t('actions.refresh') }}</v-button
    >

    <v-button
      v-if="!hasRequestedTokens && hasAccessToken"
      icon="las la-atom"
      @click="serviceTask(actionsEnum.REQUEST_TOKENS)"
      >{{ $t('actions.requestTokens') }}</v-button
    >

    <v-button
      v-if="!hasRequestedTokens && !hasAccessToken"
      icon="las la-atom"
      @click="serviceTask(actionsEnum.AUTHENTICATE_SERVICE)"
      >{{ $t('actions.authenticate') }}</v-button
    >

    <v-button icon="las la-trash" @click="deleteService()">{{
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
          <!-- @TODO: Make custom checkbox -->
          {{ val.isEnabled }}
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
        v-for="(val, name) in service.auth.credentials"
        :key="name"
        class="flex flex-row flex-wrap"
      >
        <v-label :label="name" class="py-2.5">{{ val }}</v-label>
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

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import VButton from '@/components/common/VButton.vue';
import VLabel from '@/components/common/VLabel.vue';
import VInput from '@/components/common/VInput.vue';
import VTab from '@/components/tabs/VTab.vue';
import VTabs from '@/components/tabs/VTabs.vue';
import { Service } from '@/types/service';
import JsonEditor from '@/components/JsonEditor.vue';
import { AuthenticationActionEnum } from '@/types/auth';
import { copyObject, GET_REDIRECT_URI } from '@/helpers/utils';
import { useStore } from '@/store/main';
import { useServiceStore } from '@/store/service';
import { ApiService } from '@/services/api.service';

export default defineComponent({
  name: 'ServicesView',

  components: {
    VButton,
    VLabel,
    VInput,
    VTab,
    VTabs,
    JsonEditor,
  },

  setup() {
    const store = useStore();
    const serviceStore = useServiceStore();
    const service = ref({} as Service);
    const actionsEnum = ref(AuthenticationActionEnum);

    const route = useRoute();
    const params = computed(() => route.params);

    const { name } = params.value;
    const redirectUri = GET_REDIRECT_URI(name as string);

    service.value = serviceStore.getService(name as string);
    service.value.auth.credentials.redirectUri = redirectUri;

    const serviceComp = computed(() => ({
      ...serviceStore.getService(name as string),
      auth: {
        credentials: {
          redirectUri,
        },
      },
    }));

    return {
      store,
      serviceStore,
      service,
      actionsEnum,
      serviceComp,
    };
  },

  computed: {
    hasRequestedTokens(): boolean {
      return this.service.auth?.hasRequestedTokens;
    },

    hasAccessToken(): boolean {
      const { tokens } = this.service.auth;

      return !!tokens?.accessToken || !!tokens?.code;
    },
  },

  methods: {
    editService(): void {
      void this.$router.push({
        name: 'ServicesEdit',
        params: {
          name: this.service.name,
        },
      });
    },

    deleteService(): void {
      this.serviceStore.deleteService(this.service.name);

      void this.$router.push({
        name: 'ServicesDefault',
      });
    },

    /**
     * @TODO:
     * Move logic from this component into api service?
     * Pros: handling data and changes will be made only in one file
     * Cons: api service handles all tasks:
     * - requesting data from service
     * - normalizing data
     * - saving in store
     * - redirecting? (or return path from method and redirect in view component)
     */
    async serviceTask(taskNum: AuthenticationActionEnum): Promise<void> {
      const apiService = new ApiService();

      switch (taskNum) {
        case AuthenticationActionEnum.REQUEST_DATA: {
          const data = await apiService.requestData(this.service);
          const copy = {
            ...copyObject(this.service),
            data,
          };

          this.serviceStore.updateService(copy);
          break;
        }
        case AuthenticationActionEnum.REQUEST_TOKENS: {
          await apiService.requestTokens(this.service);
          break;
        }
        case AuthenticationActionEnum.AUTHENTICATE_SERVICE: {
          const authorizationUri = await apiService.authenticate(this.service);

          window.location.replace(authorizationUri);
          break;
        }
        default: {
          break;
        }
      }
    },
  },
});
</script>

<style lang="postcss" scoped></style>
