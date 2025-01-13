import { Theme } from '@leafygreen-ui/lib';
import { EventLevel } from '../EventMarker.types';

export interface EventMarkerLineProps {
  name: string;
  theme: Theme;
  label: string;
  message: string;
  level: EventLevel;
  position: string | number;
}
