import React from 'react';

import { BaseEventMarker, EventLevel } from '../BaseEventMarker';

import { EventMarkerLineProps } from './EventMarkerLine.types';

export function EventMarkerLine({
  position,
  label,
  message,
  level = EventLevel.Warning,
}: EventMarkerLineProps) {
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
