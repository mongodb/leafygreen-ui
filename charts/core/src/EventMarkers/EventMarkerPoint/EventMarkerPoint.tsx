import React from 'react';

import {
  BaseEventMarker,
  EventLevel,
  PointEventMarkerProps,
} from '../BaseEventMarker';

export function EventMarkerPoint({
  position,
  label,
  message,
  level = EventLevel.Warning,
}: Omit<PointEventMarkerProps, 'type'>) {
  return (
    <BaseEventMarker
      position={position}
      label={label}
      message={message}
      level={level}
      type="point"
    />
  );
}
