import { createRef } from 'react';

import { SegmentRefs } from '../shared.types';

export const timeSegmentRefsMock: SegmentRefs = {
  hour: createRef<HTMLInputElement>(),
  minute: createRef<HTMLInputElement>(),
  second: createRef<HTMLInputElement>(),
};
