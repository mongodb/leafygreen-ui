import { SupportedLocales } from '@leafygreen-ui/date-utils';
import { getFormatter } from '..';

/** A sample date to use for formatting */
const now = new Date();

/**
 * Returns the ISO format parts for the given locale
 * @param showSeconds - Whether to show seconds
 * @returns The ISO format parts
 *
 * @example
 * ```js
 * getIsoFormatParts(true);
 *
 * // [
 * //   { type: 'hour', value: '' },
 * //   { type: 'literal', value: ':' },
 * //   { type: 'minute', value: '' },
 * //   { type: 'literal', value: ':' },
 * //   { type: 'second', value: '' },
 * // ]
 * ```
 */
const getIsoFormatParts = (
  showSeconds: boolean,
): Array<Intl.DateTimeFormatPart> => {
  const formatParts: Array<Intl.DateTimeFormatPart> = [
    { type: 'hour', value: '' },
    { type: 'literal', value: ':' },
    { type: 'minute', value: '' },
    ...(showSeconds
      ? ([
          { type: 'literal', value: ':' },
          { type: 'second', value: '' },
        ] as Array<Intl.DateTimeFormatPart>)
      : []),
  ];

  return formatParts;
};

// TODO: confirm with Sooa if we want to change the presentation value based on the locale. If that is the case then we only need to return a predefined format with seconds or not.
/**
 * Returns an array of {@link Intl.DateTimeFormatPart} for the provided locale.
 *
 * Filters out the dayPeriod and the empty literal before it
 * since they are not part of the time format parts
 *
 * @param locale - The locale to get the format parts for
 * @param showSeconds - Whether to show seconds
 * @returns The format parts
 *
 * @example
 *
 * ```js
 * getFormatParts({ locale: 'en-US', showSeconds: true });
 *
 * // [
 * //   { type: 'hour', value: '' },
 * //   { type: 'literal', value: ':' },
 * //   { type: 'minute', value: '' },
 * //   { type: 'literal', value: ':' },
 * //   { type: 'second', value: '' },
 * // ]
 */
export const getFormatParts = ({
  locale,
  showSeconds = false,
}: {
  locale: string;
  showSeconds?: boolean;
}): Array<Intl.DateTimeFormatPart> | undefined => {
  // If the locale is ISO_8601, return the predefined ISO format parts
  if (locale === SupportedLocales.ISO_8601) {
    return getIsoFormatParts(showSeconds);
  }

  // Otherwise, get the formatter and format the date
  const formatter = getFormatter({ locale, showSeconds });
  const formatParts = formatter?.formatToParts(now);

  if (!formatParts) return undefined;

  // Find the dayPeriod and the empty literal before it and remove them  both from the format parts
  const dayPeriodIndex = formatParts.findIndex(
    part => part.type === 'dayPeriod',
  );

  // If no dayPeriod found, return the format parts as is
  if (dayPeriodIndex === -1) return formatParts;

  // Filter out the dayPeriod and the empty literal before it
  const filteredFormatParts = formatParts.filter((part, index) => {
    if (part.type === 'dayPeriod') {
      return false;
    }
    if (part.type === 'literal' && index === dayPeriodIndex - 1) {
      return false;
    }
    return true;
  });

  return filteredFormatParts;
};
