import { isNotZeroLike } from '@leafygreen-ui/lib';

import { DateSegmentsState } from '../../types';

/**
 * Returns whether at least one segment has a value
 */
export const doesSomeSegmentExist = (segments: DateSegmentsState) => {
  return Object.values(segments).some(isNotZeroLike);
};
