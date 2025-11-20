import { useMemo } from 'react';
import { isEmpty } from 'lodash';

import { useDynamicRefs, useObjectDependency } from '@leafygreen-ui/hooks';

/**
 * Creates a memoized object of refs for each segment.
 * @param segments - An object mapping segment names to their values.
 * @param segmentRefs - An optional object mapping segment names to their refs.
 * @returns If segmentRefs are provided, return them. Otherwise, create a new object mapping segment names to their refs.
 *
 * @example
 * const segments = { day: 'day', month: 'month', year: 'year' };
 * const segmentRefs = useSegmentRefs({ segments });
 * // segmentRefs is { day: ref, month: ref, year: ref }
 */
export const useSegmentRefs = <Segment extends string>({
  segments,
  segmentRefs,
}: {
  segments: Record<Segment, string>;
  segmentRefs?: Record<Segment, React.RefObject<HTMLInputElement>>;
}) => {
  const hasProvidedSegmentRefs = segmentRefs && !isEmpty(segmentRefs);

  /** Use object dependency to avoid triggering re-render when the segments object reference changes and the values are the same */
  const segmentsObj = useObjectDependency(segments);
  const getSegmentRef = useDynamicRefs<HTMLInputElement>();

  const createdSegmentRefs = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(segmentsObj).map(([key]) => [key, getSegmentRef(key)]),
      ) as Record<Segment, React.RefObject<HTMLInputElement>>,
    [getSegmentRef, segmentsObj],
  );

  return hasProvidedSegmentRefs ? segmentRefs : createdSegmentRefs;
};
