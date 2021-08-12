<template>
  <div
    class="
      grid grid-cols-header
      justify-items-center
      items-center
      h-20
      text-secondary
      dark:text-primary
    "
  >
    <div>
      <i class="las la-2x la-ellipsis-h"></i>
    </div>
    <div class="justify-self-start font-bold text-4xl">{{ vaultName }}</div>
    <div class="justify-self-stretch">
      <input
        id="search"
        v-model="search"
        class="
          font-bold
          uppercase
          py-2.5
          px-5
          w-full
          rounded
          border border-none
          text-primary
          dark:text-secondary
          placeholder-brand
          bg-secondary
          dark:bg-primary
        "
        type="search"
        name="search"
        :placeholder="$t('header.search')"
      />
    </div>
    <div class="flex flex-row">
      <div
        class="w-full h-10 flex items-center justify-center cursor-pointer"
        @click="logout"
      >
        <i class="las la-lg la-sign-out-alt pr-5"></i>
        <p>
          {{ $t('actions.logout') }}
        </p>
      </div>
      <locale-changer></locale-changer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store/main';
import LocaleChanger from './LocaleChanger.vue';

export default defineComponent({
  name: 'Header',
  components: {
    LocaleChanger,
  },

  setup() {
    const store = useStore();
    const { vaultName } = store;
    const search = ref('');

    return {
      store,
      vaultName,
      search,
    };
  },

  methods: {
    logout() {
      this.store.setAuthenticated(false);
      void this.$router.push({ name: 'WelcomeDefault' });
    },
  },
});
</script>

<style lang="postcss"></style>
