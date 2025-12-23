import { useMemo } from 'react';

import { useDynamicRefs } from '@leafygreen-ui/hooks';

import { SegmentRefs } from '../../shared.types';

export interface TimeInputComponentRefs {
  segmentRefs: SegmentRefs;
}

/**
 * Creates `ref` objects for time input segments
 * @returns A {@link TimeInputComponentRefs} object to keep track of each time input segment
 */
export const useTimeInputComponentRefs = (): TimeInputComponentRefs => {
  const getSegmentRef = useDynamicRefs<HTMLInputElement>();

  const segmentRefs: SegmentRefs = useMemo(
    () => ({
      hour: getSegmentRef('hour') || undefined,
      minute: getSegmentRef('minute') || undefined,
      second: getSegmentRef('second') || undefined,
    }),
    [getSegmentRef],
  );

  return {
    segmentRefs,
  };
};
