import { useMemo, useRef } from 'react';

import { isDefined } from '@leafygreen-ui/lib';

import { Color, Type } from '../ProgressBar.types';
import { getPercentage } from '../utils';

const announcementThresholds = [0, 50, 100];
const variantsAnnounced = [Color.Yellow, Color.Red] as Array<Color>; // TODO: will be refactored to variant names instead of colors

interface UseScreenReaderAnnouncerProps {
  type: Type;
  value?: number;
  maxValue?: number;
  color?: Color;
}

export function useScreenReaderAnnouncer({
  type,
  value,
  maxValue,
  color,
}: UseScreenReaderAnnouncerProps): string | undefined {
  const thresholdIndexRef = useRef(-1);

  const message = useMemo(() => {
    // no live region messages for non-loader types or if value is undefined
    if (type !== Type.Loader || !isDefined(value)) {
      thresholdIndexRef.current = -1;
      return;
    }

    const percentage = maxValue ? getPercentage(value, maxValue) : value * 100;

    // find largest threshold passed by current percentage
    let newThresholdIndex = -1;

    for (let i = 0; i < announcementThresholds.length; i++) {
      if (percentage >= announcementThresholds[i]) {
        newThresholdIndex = i;
      }
    }

    if (newThresholdIndex === thresholdIndexRef.current) {
      return;
    }

    // if new threshold was passed, update live region message
    thresholdIndexRef.current = newThresholdIndex;

    const baseMessage = `Update: current progress is ${getPercentage(
      value,
      maxValue,
    )}% (${value} out of ${maxValue}).`;

    const newMessage =
      color && variantsAnnounced.includes(color)
        ? `${baseMessage} Status is ${color}.`
        : baseMessage;

    return newMessage;
  }, [type, value, maxValue, color]);

  return message;
}
