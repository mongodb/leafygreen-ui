import { BaseEventMarkerLineProps } from '../BaseEventMarker';

export interface EventMarkerLineProps
  extends Omit<BaseEventMarkerLineProps, 'type'> {}
