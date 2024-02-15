import { isNotZeroLike } from '@leafygreen-ui/lib';

import { DateSegmentsState } from '../../types';

export const isEverySegmentFilled = (segments: DateSegmentsState) => {
  return Object.values(segments).every(isNotZeroLike);
};
