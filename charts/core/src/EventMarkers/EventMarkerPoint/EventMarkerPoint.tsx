import React from 'react';

import {
  BaseEventMarker,
  EventLevel,
  EventMarkerPointProps,
} from '../BaseEventMarker';

export function EventMarkerPoint({
  position,
  label,
  message,
  level = EventLevel.Warning,
}: EventMarkerPointProps) {
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
