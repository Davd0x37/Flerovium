<template>
  <div>
    <select
      v-model="locale"
      class="text-primary bg-gray-700 border-none rounded py-2.5"
    >
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/store/main';
import locales from '@/i18n';

const { locale } = useI18n({ useScope: 'global' });
const store = useStore();

const { language } = store;
const selected = ref(language);
const langs = ref(Object.keys(locales));

watch(
  () => selected.value,
  (newLang: string) => {
    store.changeLanguage(newLang);
    locale.value = newLang;
  },
);
</script>
