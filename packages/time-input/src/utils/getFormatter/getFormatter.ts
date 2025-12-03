import { isValidLocale, SupportedLocales } from '@leafygreen-ui/date-utils';

/**
 * Returns a formatter for the given locale. This determines the format of the time parts that are returned when called with a date.
 *
 * If the locale is invalid, returns undefined.
 *
 * @param locale - The locale to get the formatter for
 * @param showSeconds - Whether to show seconds
 * @returns A formatter for the given locale
 *
 * @example
 * ```js
 * const formatter = getFormatter({ locale: 'en-US' });
 * ```
 */
export const getFormatter = ({
  locale = SupportedLocales.ISO_8601,
  showSeconds = true,
  withDate = false,
  withTime = true,
  options = {},
}: {
  locale?: string;
  showSeconds?: boolean;
  withDate?: boolean;
  withTime?: boolean;
  options?: Intl.DateTimeFormatOptions;
}) => {
  const isIsoLocale = locale === SupportedLocales.ISO_8601;
  const isValid = isValidLocale(locale);

  // If the locale is iso-8601, the default locale of the runtime environment is used, which is fine since we can explicitly set the format to 24h
  if (isValid || isIsoLocale) {
    return new Intl.DateTimeFormat(locale, {
      ...(withTime
        ? {
            hour: 'numeric',
            minute: 'numeric',
            second: showSeconds ? 'numeric' : undefined,
          }
        : {}),
      ...(withDate
        ? {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }
        : {}),
      ...(isIsoLocale ? { hourCycle: 'h23' } : {}),
      ...options,
    });
  }

  return undefined;
};
