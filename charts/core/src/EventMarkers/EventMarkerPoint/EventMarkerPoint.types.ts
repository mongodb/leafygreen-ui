import { BaseEventMarkerProps } from '../BaseEventMarker';

export interface EventMarkerPointProps
  extends Omit<BaseEventMarkerProps, 'type'> {
  position: [string | number, string | number];
}
