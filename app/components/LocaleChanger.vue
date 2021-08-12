<template>
  <div class="px-5">
    <select
      v-model="$i18n.locale"
      class="bg-secondary dark:bg-primary text-primary dark:text-secondary"
    >
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import locales from '@/i18n';
import { useStore } from '@/store/main';

export default defineComponent({
  name: 'LocaleChanger',

  setup() {
    const store = useStore();
    const { language } = store;
    const langs = ref(Object.keys(locales));
    const selected = ref(language);

    // this.$i18n.locale = selected.value;

    return {
      store,
      language,
      langs,
      selected,
    };
  },

  watch: {
    selected: {
      handler(newLang: string) {
        this.store.changeLanguage(newLang);
        this.$i18n.locale = newLang;
      },
    },
  },
});
</script>
