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
}: {
  locale: string;
  showSeconds?: boolean;
}) => {
  const isValid = isValidLocale(locale);

  if (isValid) {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: showSeconds ? 'numeric' : undefined,
    });
  }

  return undefined;
};
