import { BaseEventMarkerProps } from '../BaseEventMarker';

export interface EventMarkerLineProps
  extends Omit<BaseEventMarkerProps, 'type'> {
  position: string | number;
}
