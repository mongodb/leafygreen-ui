import { DynamicRefGetter } from '@leafygreen-ui/hooks';

import { DateSegment } from '../useDateSegments';

export type SegmentRefs = Record<
  DateSegment,
  ReturnType<DynamicRefGetter<HTMLInputElement>>
>;
