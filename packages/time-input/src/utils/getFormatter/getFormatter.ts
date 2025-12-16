import { isValidLocale, SupportedLocales } from '@leafygreen-ui/date-utils';

/**
 * Returns a formatter for the given locale.
 *
 * If the locale is iso-180, we explicitly set the hour cycle to 24h(`hourCycle: 'h23'`).
 *
 * @param locale - The locale to get the formatter for
 * @param options - The options to configure the formatter. {@link Intl.DateTimeFormatOptions}
 *
 * @returns Returns an object ({@link Intl.DateTimeFormat}) for the given locale that includes methods to format dates and time parts, such as `format()` and `formatToParts()`.
 *
 * @example
 * ```js
 * const formatter = getFormatter({ locale: 'en-US' });
 * formatter.format(new Date('2025-01-15T14:30:00Z')); // '1/15/2025'
 * formatter.formatToParts(new Date('2025-01-15T14:30:00Z')); // [ { type: 'month', value: '1' }, { type: 'literal', value: '/' }, { type: 'day', value: '15' }, { type: 'literal', value: '/' }, { type: 'year', value: '2025' } ]
 * ```
 */
export const getFormatter = ({
  locale = SupportedLocales.ISO_8601,
  options = {},
}: {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
}) => {
  const isIsoLocale = locale === SupportedLocales.ISO_8601;
  const isValidNonIsoLocale = isValidLocale(locale);

  if (!isValidNonIsoLocale && !isIsoLocale) {
    return undefined;
  }

  // If the locale is iso-8601, the default locale of the runtime environment is used, which is fine since we can explicitly set the format to 24h
  return new Intl.DateTimeFormat(locale, {
    ...(isIsoLocale ? { hourCycle: 'h23' } : {}),
    ...options,
  });
};
