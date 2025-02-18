export const SupportedLocales = {
  ISO_8601: 'iso-8601',
  en_US: 'en-US',
  en_GB: 'en-GB',
} as const;
export type SupportedLocales =
  (typeof SupportedLocales)[keyof typeof SupportedLocales];
