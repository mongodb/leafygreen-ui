import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { SharedDatePickerContextProps } from '../../context';
import { SegmentRefs } from '../../hooks';
import { DateSegment } from '../../types';

type RelativeDirection = 'next' | 'prev' | 'first' | 'last';
// interface GetRelativeSegmentContext {
//   segment: HTMLInputElement | React.RefObject<HTMLInputElement>;
//   formatParts: SharedDatePickerContextProps['formatParts'];
//   segmentRefs: SegmentRefs;
// }

// TODO: needs to be updated so it is generic.
// needs:
/**
 * Given a direction, starting segment name & format
 * returns the segment name in the given direction
 */
// export const getRelativeSegment = (
//   direction: RelativeDirection,
//   {
//     segment,
//     formatParts,
//   }: {
//     segment: DateSegment;
//     formatParts: SharedDatePickerContextProps['formatParts'];
//   },
// ): DateSegment | undefined => {
//   if (
//     isUndefined(direction) ||
//     isUndefined(segment) ||
//     isUndefined(formatParts)
//   ) {
//     return;
//   }

//   // only the relevant segments, not separators
//   const formatSegments: Array<DateSegment> = formatParts
//     .filter(part => part.type !== 'literal')
//     .map(part => part.type as DateSegment);

//   /** The index of the reference segment relative to formatParts */
//   const currentSegmentIndex: number | undefined =
//     formatSegments.indexOf(segment);

//   switch (direction) {
//     case 'first': {
//       return formatSegments[0];
//     }

//     case 'last': {
//       const lastSegmentName = last(formatSegments);
//       return lastSegmentName;
//     }

//     case 'next': {
//       if (
//         !isUndefined(currentSegmentIndex) &&
//         currentSegmentIndex >= 0 &&
//         currentSegmentIndex + 1 < formatSegments.length
//       ) {
//         return formatSegments[currentSegmentIndex + 1];
//       }

//       break;
//     }

//     case 'prev': {
//       if (!isUndefined(currentSegmentIndex) && currentSegmentIndex > 0) {
//         return formatSegments[currentSegmentIndex - 1];
//       }

//       break;
//     }

//     default:
//       break;
//   }
// };

export const getRelativeSegment = <V extends string = string>(
  direction: RelativeDirection,
  {
    segment,
    formatParts,
  }: {
    segment: V;
    formatParts?: Array<Intl.DateTimeFormatPart>;
  },
): V | undefined => {
  if (
    isUndefined(direction) ||
    isUndefined(segment) ||
    isUndefined(formatParts)
  ) {
    return;
  }

  // only the relevant segments, not separators
  const formatSegments: Array<V> = formatParts
    .filter(part => part.type !== 'literal')
    .map(part => part.type as V);

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

/**
 * Given a direction, staring segment, and segment refs,
 * returns the segment ref in the given direction
 */
// export const getRelativeSegmentRef = (
//   direction: RelativeDirection,
//   { segment, formatParts, segmentRefs }: GetRelativeSegmentContext,
// ): React.RefObject<HTMLInputElement> | undefined => {
//   if (
//     isUndefined(direction) ||
//     isUndefined(segment) ||
//     isUndefined(formatParts) ||
//     isUndefined(segmentRefs)
//   ) {
//     return;
//   }

//   // only the relevant segments, not separators
//   const formatSegments: Array<DateSegment> = formatParts
//     .filter(part => part.type !== 'literal')
//     .map(part => part.type as DateSegment);

//   const currentSegmentName: DateSegment | undefined = formatSegments.find(
//     segmentName => {
//       return (
//         segmentRefs[segmentName] === segment ||
//         segmentRefs[segmentName].current === segment
//       );
//     },
//   );

//   if (currentSegmentName) {
//     const relativeSegmentName = getRelativeSegment(direction, {
//       segment: currentSegmentName,
//       formatParts,
//     });

//     if (relativeSegmentName) {
//       return segmentRefs[relativeSegmentName];
//     }
//   }
// };

interface GetRelativeSegmentContext<
  T extends Record<string, React.RefObject<HTMLInputElement>>,
> {
  segment: HTMLInputElement | React.RefObject<HTMLInputElement>;
  formatParts?: Array<Intl.DateTimeFormatPart>;
  segmentRefs: T;
}

export const getRelativeSegmentRef = <
  T extends Record<string, React.RefObject<HTMLInputElement>>,
  V extends string = string,
>(
  direction: RelativeDirection,
  { segment, formatParts, segmentRefs }: GetRelativeSegmentContext<T>,
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
  const formatSegments: Array<V> = formatParts
    .filter(part => part.type !== 'literal')
    .map(part => part.type as V);

  const currentSegmentName: V | undefined = formatSegments.find(segmentName => {
    return (
      segmentRefs[segmentName] === segment ||
      segmentRefs[segmentName].current === segment
    );
  });

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
