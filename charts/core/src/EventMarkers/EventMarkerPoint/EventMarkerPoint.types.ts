import { EventLevel } from '../EventMarker.types';

export interface EventMarkerPointProps {
  position: [string | number, string | number];
  label: string;
  message: string;
  level?: EventLevel;
}
