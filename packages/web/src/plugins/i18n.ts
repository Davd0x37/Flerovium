import { createI18n } from 'vue-i18n';
import locales from '@/i18n';

const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'en',
  messages: locales,
});

const { t, tc } = i18n.global;

const $t = t;
const $tc = tc;

export { $t, $tc };

export default i18n;
