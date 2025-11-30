import { isValidLocale } from '@leafygreen-ui/date-utils';

/**
 * Returns a formatter for the given locale. If the locale is invalid, returns undefined.
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
  locale,
  showSeconds = true,
  isIsoLocale = false,
  withFullDate = false,
  options = {},
}: {
  locale: string;
  showSeconds?: boolean;
  isIsoLocale?: boolean;
  withFullDate?: boolean;
  options?: Intl.DateTimeFormatOptions;
}) => {
  const isValid = isValidLocale(locale);

  if (isValid || isIsoLocale) {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: showSeconds ? 'numeric' : undefined,
      ...(withFullDate
        ? {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }
        : {}),
      ...options,
    });
  }

  return undefined;
};
