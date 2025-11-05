import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

type RelativeDirection = 'next' | 'prev' | 'first' | 'last';

/**
 * Given a direction, starting segment name & format
 * returns the segment name in the given direction
 *
 * @param direction - The direction to get the relative segment from
 * @param segment - The starting segment name
 * @param formatParts - The format parts of the date
 * @returns The segment name in the given direction
 * @example
 * const formatParts = [
 *   { type: 'year', value: '2023' },
 *   { type: 'literal', value: '-' },
 *   { type: 'month', value: '10' },
 *   { type: 'literal', value: '-' },
 *   { type: 'day', value: '31' },
 * ];
 * getRelativeSegment('next', { segment: 'year', formatParts }); // 'month'
 * getRelativeSegment('next', { segment: 'month', formatParts }); // 'day'
 * getRelativeSegment('prev', { segment: 'day', formatParts }); // 'month'
 * getRelativeSegment('prev', { segment: 'month', formatParts }); // 'year'
 * getRelativeSegment('first', { segment: 'day', formatParts }); // 'year'
 * getRelativeSegment('last', { segment: 'year', formatParts }); // 'day'
 */
export const getRelativeSegment = <Segment extends string = string>(
  direction: RelativeDirection,
  {
    segment,
    formatParts,
  }: {
    segment: Segment;
    formatParts?: Array<Intl.DateTimeFormatPart>;
  },
): Segment | undefined => {
  if (
    isUndefined(direction) ||
    isUndefined(segment) ||
    isUndefined(formatParts)
  ) {
    return;
  }

  // only the relevant segments, not separators
  const formatSegments: Array<Segment> = formatParts
    .filter(part => part.type !== 'literal')
    .map(part => part.type as Segment);

  /** The index of the reference segment relative to formatParts */
  const currentSegmentIndex: number | undefined =
    formatSegments.indexOf(segment);

  switch (direction) {
    case 'first': {
      return formatSegments[0];
    }

    case 'last': {
      const lastSegmentName = last(formatSegments);
      return lastSegmentName;
    }

    case 'next': {
      if (
        !isUndefined(currentSegmentIndex) &&
        currentSegmentIndex >= 0 &&
        currentSegmentIndex + 1 < formatSegments.length
      ) {
        return formatSegments[currentSegmentIndex + 1];
      }

      break;
    }

    case 'prev': {
      if (!isUndefined(currentSegmentIndex) && currentSegmentIndex > 0) {
        return formatSegments[currentSegmentIndex - 1];
      }

      break;
    }

    default:
      break;
  }
};

interface GetRelativeSegmentContext<
  SegmentRefs extends Record<string, React.RefObject<HTMLInputElement>>,
> {
  segment: HTMLInputElement | React.RefObject<HTMLInputElement>;
  formatParts?: Array<Intl.DateTimeFormatPart>;
  segmentRefs: SegmentRefs;
}

/**
 * Given a direction, staring segment, and segment refs,
 * returns the segment ref in the given direction
 *
 * @param direction - The direction to get the relative segment from
 * @param segment - The starting segment ref
 * @param formatParts - The format parts of the date
 * @param segmentRefs - The segment refs
 * @returns The segment ref in the given direction
 * @example
 * const formatParts = [
 *   { type: 'year', value: '2023' },
 *   { type: 'literal', value: '-' },
 *   { type: 'month', value: '10' },
 *   { type: 'literal', value: '-' },
 *   { type: 'day', value: '31' },
 * ];
 * const segmentRefs = {
 *   year: yearRef,
 *   month: monthRef,
 *   day: dayRef,
 * };
 * getRelativeSegmentRef('next', { segment: yearRef, formatParts, segmentRefs }); // monthRef
 * getRelativeSegmentRef('prev', { segment: dayRef, formatParts, segmentRefs }); // monthRef
 * getRelativeSegmentRef('first', { segment: monthRef, formatParts, segmentRefs }); // yearRef
 * getRelativeSegmentRef('last', { segment: monthRef, formatParts, segmentRefs }); // dayRef
 */
export const getRelativeSegmentRef = <
  SegmentRefs extends Record<string, React.RefObject<HTMLInputElement>>,
>(
  direction: RelativeDirection,
  { segment, formatParts, segmentRefs }: GetRelativeSegmentContext<SegmentRefs>,
): React.RefObject<HTMLInputElement> | undefined => {
  if (
    isUndefined(direction) ||
    isUndefined(segment) ||
    isUndefined(formatParts) ||
    isUndefined(segmentRefs)
  ) {
    return;
  }

  type SegmentName = keyof SegmentRefs & string;

  // only the relevant segments, not separators
  const formatSegments: Array<SegmentName> = formatParts
    .filter(part => part.type !== 'literal')
    .map(part => part.type as SegmentName);

  const currentSegmentName: SegmentName | undefined = formatSegments.find(
    segmentName => {
      return (
        segmentRefs[segmentName] === segment ||
        segmentRefs[segmentName].current === segment
      );
    },
  );

  if (currentSegmentName) {
    const relativeSegmentName = getRelativeSegment(direction, {
      segment: currentSegmentName,
      formatParts,
    });

    if (relativeSegmentName) {
      return segmentRefs[relativeSegmentName];
    }
  }
};
