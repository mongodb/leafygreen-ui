import { Theme } from '@leafygreen-ui/lib';

import { EventLevel } from '../EventMarker.types';

export interface EventMarkerPointProps {
  position: [string | number, string | number];
  label: string;
  message: string;
  level?: EventLevel;
}
