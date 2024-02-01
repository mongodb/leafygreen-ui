import { useMemo } from 'react';

import { useDynamicRefs } from '@leafygreen-ui/hooks';

import { SegmentRefs } from './segmentRefs.types';

/**
 * @returns A {@link SegmentRefs} object to keep track of each day/month/year input segment
 */
export const useSegmentRefs = () => {
  const getSegmentRef = useDynamicRefs<HTMLInputElement>();

  const segmentRefs: SegmentRefs = useMemo(
    () => ({
      day: getSegmentRef('day') || undefined,
      month: getSegmentRef('month') || undefined,
      year: getSegmentRef('year') || undefined,
    }),
    [getSegmentRef],
  );

  return segmentRefs;
};
