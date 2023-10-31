import { DynamicRefGetter } from '@leafygreen-ui/hooks/src/useDynamicRefs';

import { DateSegment } from '../useDateSegments';

export type SegmentRefs = Record<
  DateSegment,
  ReturnType<DynamicRefGetter<HTMLInputElement>>
>;
