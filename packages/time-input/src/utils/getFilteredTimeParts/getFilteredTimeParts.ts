/**
 * Returns the time parts that are not literals (e.g. ':').
 * @param timeParts - The time parts to get the filtered time parts for
 * @returns The filtered time parts
 *
 * @example
 * ```js
 * getFilteredTimeParts([
 *   { type: 'hour', value: '12' },
 *   { type: 'literal', value: ':' },
 *   { type: 'minute', value: '30' },
 * ]);
 * // returns: [{ type: 'hour', value: '12' }, { type: 'minute', value: '30' }]
 * ```
 */
export const getFilteredTimeParts = ({
  timeParts,
}: {
  timeParts?: Array<Intl.DateTimeFormatPart>;
}) => {
  const filteredTimeParts =
    timeParts?.filter(part => part.type !== 'literal') ?? [];

  return filteredTimeParts;
};
