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
// const getIsoFormatParts = (
//   showSeconds: boolean,
// ): Array<Intl.DateTimeFormatPart> => {
//   const formatParts: Array<Intl.DateTimeFormatPart> = [
//     { type: 'hour', value: '' },
//     { type: 'literal', value: ':' },
//     { type: 'minute', value: '' },
//     ...(showSeconds
//       ? ([
//           { type: 'literal', value: ':' },
//           { type: 'second', value: '' },
//         ] as Array<Intl.DateTimeFormatPart>)
//       : []),
//   ];

//   return formatParts;
// };

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
  const isIsoLocale = locale === SupportedLocales.ISO_8601;

  const formatter = getFormatter({
    locale: locale,
    isIsoLocale,
    showSeconds,
    options: { hourCycle: 'h23' },
  });

  const formatParts = formatter?.formatToParts(now);

  return formatParts;
};
