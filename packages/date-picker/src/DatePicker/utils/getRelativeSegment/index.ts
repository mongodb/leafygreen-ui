import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { DatePickerContextProps } from '../../../shared/components/DatePickerContext';
import { DateSegment, SegmentRefs } from '../../../shared/hooks';

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
  const orderedSegmentRefs = formatSegments.map(
    ({ type }) => segmentRefs[type as DateSegment],
  );

  const currentSegmentIndex: number | undefined = orderedSegmentRefs.findIndex(
    ref => ref.current === segment,
  );

  switch (direction) {
    case 'first': {
      const firstSegmentRef = orderedSegmentRefs[0];
      return firstSegmentRef;
    }

    case 'last': {
      const lastSegmentRef = last(orderedSegmentRefs);

      if (lastSegmentRef) {
        return lastSegmentRef;
      }

      break;
    }

    case 'next': {
      if (currentSegmentIndex) {
        const nextSegmentIndex = Math.min(
          currentSegmentIndex + 1,
          orderedSegmentRefs.length - 1,
        );

        const nextSegmentRef = orderedSegmentRefs[nextSegmentIndex];
        return nextSegmentRef;
      }

      break;
    }

    case 'prev': {
      if (currentSegmentIndex) {
        const prevSegmentIndex = Math.max(currentSegmentIndex - 1, 0);

        const prevSegmentRef = orderedSegmentRefs[prevSegmentIndex];
        return prevSegmentRef;
      }

      break;
    }

    default:
      break;
  }
};
