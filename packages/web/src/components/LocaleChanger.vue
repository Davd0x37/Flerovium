<template>
  <div class="px-5">
    <select
      v-model="selected"
      class="bg-secondary dark:bg-primary text-primary dark:text-secondary"
    >
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import locales from '@/i18n';
import { ACTIONS, GETTERS } from '@/store/names';

export default defineComponent({
  name: 'LocaleChanger',

  data() {
    return {
      selected: '',
      langs: [] as string[],
    };
  },

  watch: {
    selected: {
      handler: function (newLang) {
        this.$store.dispatch(ACTIONS.CHANGE_LANGUAGE, newLang);
        this.$i18n.locale = newLang;
      },
    },
  },

  created() {
    const selectedLang = this.$store.getters[GETTERS.LANGUAGE];
    const langs = Object.keys(locales);

    this.langs = langs;
    this.selected = selectedLang;
    // Change language to selected
    this.$i18n.locale = selectedLang;
  },
});
</script>
