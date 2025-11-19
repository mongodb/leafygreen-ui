import { useMemo } from 'react';

import { useDynamicRefs } from '@leafygreen-ui/hooks';

/**
 * Creates a memoized object of refs for each segment.
 * @param segments - An object mapping segment names to their values.
 * @returns An object mapping segment names to their refs.
 *
 * @example
 * const segments = { day: 'day', month: 'month', year: 'year' };
 * const segmentRefs = useSegmentRefs(segments);
 * // segmentRefs is { day: ref, month: ref, year: ref }
 */
export const useSegmentRefs = <Segment extends string>(
  segments: Record<Segment, string>,
) => {
  const getSegmentRef = useDynamicRefs<HTMLInputElement>();

  const segmentRefs = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(segments).map(([key]) => [key, getSegmentRef(key)]),
      ) as Record<Segment, React.RefObject<HTMLInputElement>>,
    [getSegmentRef, segments],
  );

  return segmentRefs;
};
