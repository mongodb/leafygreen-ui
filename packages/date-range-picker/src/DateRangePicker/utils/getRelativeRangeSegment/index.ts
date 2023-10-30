import React from 'react';
import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { DateSegment, SegmentRefs } from '@leafygreen-ui/date-picker/hooks';
import { DatePickerContextProps } from '@leafygreen-ui/date-picker/shared';

type RelativeDirection = 'next' | 'prev' | 'first' | 'last';
interface GetRelativeSegmentContext {
  target: HTMLInputElement | React.RefObject<HTMLInputElement>;
  formatParts: DatePickerContextProps['formatParts'];
  rangeSegmentRefs: Array<SegmentRefs>;
}

export const getRelativeRangeSegment = (
  direction: RelativeDirection,
  { target, formatParts, rangeSegmentRefs }: GetRelativeSegmentContext,
): React.RefObject<HTMLInputElement> | undefined => {
  if (
    isUndefined(direction) ||
    isUndefined(target) ||
    isUndefined(formatParts) ||
    isUndefined(rangeSegmentRefs)
  ) {
    return;
  }

  // only the relevant segments, not separators
  const formatSegments = formatParts.filter(part => part.type !== 'literal');

  const orderedSegmentRefs = rangeSegmentRefs.flatMap(segmentRefs =>
    formatSegments.map(({ type }) => segmentRefs[type as DateSegment]),
  );

  const currentSegmentIndex: number | undefined = orderedSegmentRefs.findIndex(
    ref => ref.current === target,
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
      if (!isUndefined(currentSegmentIndex)) {
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
      if (!isUndefined(currentSegmentIndex)) {
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
