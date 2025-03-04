import { BaseEventMarkerPointProps } from '../BaseEventMarker';

export interface EventMarkerPointProps
  extends Omit<BaseEventMarkerPointProps, 'type'> {}
