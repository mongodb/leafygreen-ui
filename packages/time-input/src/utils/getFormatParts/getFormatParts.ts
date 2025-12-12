/**
 * Returns an array of {@link Intl.DateTimeFormatPart} for the provided locale.
 *
 * Filters out the dayPeriod and the empty literal before it
 * since they are not part of the time format parts.
 *
 * This will return `:` for every literal part regardless of the locale.
 *
 * @param showSeconds - Whether to show seconds
 * @returns The format parts
 *
 * @example
 *
 * ```js
 * getFormatParts({ showSeconds: true });
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
  showSeconds = false,
}: {
  showSeconds?: boolean;
}): Array<Intl.DateTimeFormatPart> | undefined => {
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
