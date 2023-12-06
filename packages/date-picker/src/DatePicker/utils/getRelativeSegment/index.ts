import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { DatePickerContextProps } from '../../../shared/components/DatePickerContext';
import { SegmentRefs } from '../../../shared/hooks';
import { DateSegment } from '../../../shared/types';

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
  const formatSegments: Array<DateSegment> = formatParts
    .filter(part => part.type !== 'literal')
    .map(part => part.type as DateSegment);

  /** The index of the reference segment relative to formatParts */
  const currentSegmentIndex: number | undefined = formatSegments.findIndex(
    segmentName => {
      return (
        segmentRefs[segmentName] === segment ||
        segmentRefs[segmentName].current === segment
      );
    },
  );

  const getRefAtIndex = (index: number) => {
    const segmentName = formatSegments[index];
    return segmentRefs[segmentName];
  };

  switch (direction) {
    case 'first': {
      const firstSegmentRef = getRefAtIndex(0);
      return firstSegmentRef;
    }

    case 'last': {
      const lastSegmentName = last(formatSegments);

      if (lastSegmentName) {
        const lastSegmentRef = segmentRefs[lastSegmentName];
        return lastSegmentRef;
      }

      break;
    }

    case 'next': {
      if (!isUndefined(currentSegmentIndex) && currentSegmentIndex >= 0) {
        const nextSegmentIndex = Math.min(
          currentSegmentIndex + 1,
          formatSegments.length - 1,
        );

        const nextSegmentRef = getRefAtIndex(nextSegmentIndex);
        return nextSegmentRef;
      }

      break;
    }

    case 'prev': {
      if (!isUndefined(currentSegmentIndex) && currentSegmentIndex >= 0) {
        const prevSegmentIndex = Math.max(currentSegmentIndex - 1, 0);

        const prevSegmentRef = getRefAtIndex(prevSegmentIndex);
        return prevSegmentRef;
      }

      break;
    }

    default:
      break;
  }
};
