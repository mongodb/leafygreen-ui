import { DynamicRefGetter } from '@leafygreen-ui/hooks';
import { createRef } from 'react';

type Segment = 'day' | 'month' | 'year';

export type SegmentRefs = Record<
  Segment,
  ReturnType<DynamicRefGetter<HTMLInputElement>>
>;

export const segmentRefsMock: SegmentRefs = {
  day: createRef<HTMLInputElement>(),
  month: createRef<HTMLInputElement>(),
  year: createRef<HTMLInputElement>(),
};
