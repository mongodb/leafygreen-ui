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
  withDate = false,
  withTime = true,
  options = {},
}: {
  locale: string;
  showSeconds?: boolean;
  isIsoLocale?: boolean;
  withDate?: boolean;
  withTime?: boolean;
  options?: Intl.DateTimeFormatOptions;
}) => {
  const isValid = isValidLocale(locale);

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
      ...options,
    });
  }

  return undefined;
};
