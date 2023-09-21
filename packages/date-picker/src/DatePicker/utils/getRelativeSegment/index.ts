import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { DatePickerContextProps } from '../../../DatePickerContext';
import { SegmentRefs } from '../../../hooks/useSegmentRefs';
import { getSegmentKey } from '../getSegmentKey';
import { getSegmentRefFromDateTimeFormatPart } from '../getSegmentRefFromDateTimeFormatPart';

type RelativeDirection = 'next' | 'prev' | 'first' | 'last';
interface GetRelativeSegmentContext {
  segment: HTMLInputElement | React.RefObject<HTMLInputElement>;
  formatParts: DatePickerContextProps['formatParts'];
  segmentRefs: SegmentRefs;
}

/**
 * Given a direction, staring segment, and segment refs,
 * returns the segment ref in the given direction
 */
export const getRelativeSegment = (
  direction: RelativeDirection,
  { segment, formatParts, segmentRefs }: GetRelativeSegmentContext,
): React.RefObject<HTMLInputElement> | undefined => {
  if (
    isUndefined(direction) ||
    isUndefined(segment) ||
    isUndefined(formatParts) ||
    isUndefined(segmentRefs)
  ) {
    return;
  }

  // only the relevant segments, not separators
  const formatSegments = formatParts.filter(part => part.type !== 'literal');

  switch (direction) {
    case 'first': {
      const firstSegmentRef = getSegmentRefFromDateTimeFormatPart(
        formatSegments[0],
        segmentRefs,
      );
      return firstSegmentRef;
    }

    case 'last': {
      const lastSegment = last(formatSegments);

      if (lastSegment) {
        const lastSegmentRef = getSegmentRefFromDateTimeFormatPart(
          lastSegment,
          segmentRefs,
        );
        return lastSegmentRef;
      }

      break;
    }

    case 'next': {
      const currentSegmentKey = getSegmentKey(segment, segmentRefs);

      if (currentSegmentKey) {
        const currentSegmentIndex = formatSegments.findIndex(
          p => p.type === currentSegmentKey,
        );

        const nextSegmentIndex = Math.min(
          currentSegmentIndex + 1,
          formatSegments.length - 1,
        );

        const nextSegmentRef = getSegmentRefFromDateTimeFormatPart(
          formatSegments[nextSegmentIndex],
          segmentRefs,
        );
        return nextSegmentRef;
      }

      break;
    }

    case 'prev': {
      const currentSegmentKey = getSegmentKey(segment, segmentRefs);

      if (currentSegmentKey) {
        const currentSegmentIndex = formatSegments.findIndex(
          p => p.type === currentSegmentKey,
        );

        const prevSegmentIndex = Math.max(currentSegmentIndex - 1, 0);

        const prevSegmentRef = getSegmentRefFromDateTimeFormatPart(
          formatSegments[prevSegmentIndex],
          segmentRefs,
        );
        return prevSegmentRef;
      }

      break;
    }

    default:
      break;
  }
};
