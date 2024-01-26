import { DynamicRefGetter } from '@leafygreen-ui/hooks';

import { DateSegment } from '../../types';

export type SegmentRefs = Record<
  DateSegment,
  ReturnType<DynamicRefGetter<HTMLInputElement>>
>;
