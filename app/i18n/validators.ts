// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  required,
  minLength,
  maxLength,
  sameAs,
  createI18nMessage,
} from '@vuelidate/validators';
import i18n from '@/plugins/i18n';

const {
  global: { t },
} = i18n;

const withI18nMessage = createI18nMessage({ t });

export const req = withI18nMessage(required);
export const minLen = withI18nMessage(minLength, {
  withArguments: true,
});
export const maxLen = withI18nMessage(maxLength, {
  withArguments: true,
});
export const same = withI18nMessage(sameAs, {
  withArguments: true,
});
