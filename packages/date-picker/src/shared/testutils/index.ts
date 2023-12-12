import { createRef } from 'react';

import { SegmentRefs } from '../hooks';

export {
  getProviderPropsFromStoryContext,
  type ProviderPropsObject,
} from './getProviderPropsFromStoryContext';

export const segmentRefsMock: SegmentRefs = {
  day: createRef<HTMLInputElement>(),
  month: createRef<HTMLInputElement>(),
  year: createRef<HTMLInputElement>(),
};
