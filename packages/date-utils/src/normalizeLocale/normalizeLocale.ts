import { isValidLocale } from '../isValidLocale';

/**
 * Returns the provided locale, or the resolved locale from the Intl object
 */
export const normalizeLocale = (localeStr?: string): string => {
  return isValidLocale(localeStr)
    ? localeStr
    : Intl.DateTimeFormat().resolvedOptions().locale;
};
