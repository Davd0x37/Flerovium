<template>
  <div
    class="grid grid-cols-header justify-items-center items-center h-20 text-primary"
  >
    <div>
      <i class="fa fa-2x la-ellipsis-h"></i>
    </div>

    <div class="justify-self-start font-bold text-4xl">
      {{ vaultName }}
    </div>

    <div class="justify-self-stretch">
      <input
        id="search"
        v-model="search"
        class="font-bold uppercase py-2.5 px-5 w-full rounded border border-none text-brand placeholder-brand bg-gray-700"
        type="text"
        name="search"
        :placeholder="$t('header.search')"
      />
    </div>

    <div class="flex flex-row">
      <v-dropdown :title="$t('header.actions')">
        <ul class="nav">
          <li>
            <p @click="save">{{ $t('actions.save') }}</p>
          </li>

          <li v-if="servicesExist">
            <p @click="refresh">{{ $t('actions.refresh') }}</p>
          </li>

          <li>
            <p @click="logout">{{ $t('actions.open') }}</p>
          </li>
        </ul>
      </v-dropdown>

      <locale-changer class="px-5"></locale-changer>

      <div
        class="w-full h-10 flex items-center justify-center cursor-pointer"
        @click="logout"
      >
        <i class="fa fa-lg la-sign-out-alt pr-2.5"></i>
        <p>
          {{ $t('actions.logout') }}
        </p>
      </div>
    </div>

    <a v-show="false" ref="link" href="#">download</a>
  </div>
</template>

<script lang="ts" setup>
import { computed, Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { debug } from 'debug';
import { useStore } from '@/store/main';
import VDropdown from '@/components/common/VDropdown.vue';
import LocaleChanger from '@/components/LocaleChanger.vue';
import { StorageService } from '@/services/storage.service';
import { useNotificationStore } from '@/store/notification';
import { useServiceStore } from '@/store/service';
import { ApiService } from '@/services/api.service';

const apiService = new ApiService();
const store = useStore();
const serviceStore = useServiceStore();
const notif = useNotificationStore();
const router = useRouter();
const { vaultName } = store;
const search = ref('');
const link = ref<HTMLAnchorElement>() as Ref<HTMLAnchorElement>;
const servicesExist = computed(() => serviceStore.servicesExist);

watch(
  () => search.value,
  val => {
    store.setSearch(val);
  },
);

async function save() {
  try {
    const { vault } = store;
    const { name, url } = await StorageService.downloadVault(vault);

    link.value.href = url;
    link.value.download = `${name}-encrypted.json`;
    link.value.click();
  } catch (error) {
    if (error instanceof Error) {
      debug('[Settings]')(`Save: ${error.message}`);

      notif.showNotification({
        mode: 'error',
        title: 'Error while exporting vault',
        message: error.message,
      });
    }
  }
}
async function refresh() {
  await apiService.refreshServices();
}

function logout() {
  store.setAuthenticated(false);
  void router.push({ name: 'WelcomeDefault' });
}
</script>

<style lang="postcss">
.nav li p {
  cursor: pointer;
  display: block;
  transition: theme('transitionProperty.all')
    theme('transitionDuration.DEFAULT')
    theme('transitionTimingFunction.DEFAULT');
  will-change: background-color;
  padding: theme('padding[2.5]');
}

.nav li p:hover {
  background-color: theme('backgroundColor.brand');
}
</style>
