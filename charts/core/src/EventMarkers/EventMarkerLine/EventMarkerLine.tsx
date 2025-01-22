import React from 'react';

import {
  BaseEventMarker,
  EventLevel,
  EventMarkerLineProps,
} from '../BaseEventMarker';

export function EventMarkerLine({
  position,
  label,
  message,
  level = EventLevel.Warning,
}: Omit<EventMarkerLineProps, 'type'>) {
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
