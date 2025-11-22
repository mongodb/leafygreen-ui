interface GetFirstEmptySegmentProps<
  SegmentRefs extends Record<string, React.RefObject<HTMLInputElement>>,
> {
  formatParts: Array<Intl.DateTimeFormatPart>;
  segmentRefs: SegmentRefs;
}
/**
 * @param formatParts - The format parts of the date
 * @param segmentRefs - The segment refs
 *
 * @returns The first empty date segment input for the given format
 *
 * @example
 * const formatParts = [
 *   { type: 'year', value: '' },
 *   { type: 'month', value: '' },
 *   { type: 'day', value: '' },
 * ];
 * const segmentRefs = {
 *   year: { current: yearRef },
 *   month: { current: monthRef },
 *   day: { current: dayRef },
 * };
 * getFirstEmptySegment({ formatParts, segmentRefs }); // yearRef.current
 */
export const getFirstEmptySegment = <
  SegmentRefs extends Record<string, React.RefObject<HTMLInputElement>>,
>({
  formatParts,
  segmentRefs,
}: GetFirstEmptySegmentProps<SegmentRefs>): HTMLInputElement | null => {
  // if 1+ are empty, focus the first empty one
  const formatSegments = formatParts.filter(part => part.type !== 'literal');
  const emptySegmentKeys = formatSegments
    .map(p => p.type)
    .filter(type => {
      const element = segmentRefs[type as keyof SegmentRefs];
      return !element?.current?.value;
    });
  const firstEmptySegmentKey = emptySegmentKeys[0] as keyof SegmentRefs;
  const firstEmptySegmentRef = segmentRefs[firstEmptySegmentKey];
  return firstEmptySegmentRef?.current ?? null;
};
