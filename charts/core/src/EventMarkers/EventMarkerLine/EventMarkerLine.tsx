import React from 'react';

import {
  BaseEventMarker,
  EventLevel,
  LineEventMarkerProps,
} from '../BaseEventMarker';

export function EventMarkerLine({
  position,
  label,
  message,
  level = EventLevel.Warning,
}: Omit<LineEventMarkerProps, 'type'>) {
  return (
    <BaseEventMarker
      position={position}
      label={label}
      message={message}
      level={level}
      type="line"
    />
  );
}
