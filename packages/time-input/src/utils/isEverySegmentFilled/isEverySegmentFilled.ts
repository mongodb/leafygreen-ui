import { isDefined } from '@leafygreen-ui/lib';

import { TimeSegmentsState } from '../../shared.types';

/**
 * Checks if every segment is filled
 *
 * @param segments - The segments to check
 * @returns Whether every segment is filled
 */
export const isEverySegmentFilled = (segments: TimeSegmentsState) => {
  const isEverySegmentFilled = Object.values(segments).every(segment => {
    const isSegmentDefined = isDefined(segment);
    const isSegmentEmpty = segment === '';
    // console.log('isEverySegmentFilled > isEmpty 🌼🌼🌼', { segment, isEmpty });
    return !isSegmentEmpty && isSegmentDefined;
  });
  // check if all segments are not empty
  return isEverySegmentFilled;
};
