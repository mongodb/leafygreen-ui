import { useEffect, useRef, useState } from 'react';

import { Color, Type } from '../ProgressBar.types';
import { getPercentage } from '../ProgressBar.utils';

const announcementThresholds = [0, 50, 100];
const variantsAnnounced = [Color.Yellow, Color.Red] as Array<Color>;

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
}: UseScreenReaderAnnouncerProps): string {
  const thresholdIndexRef = useRef(-1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (type !== Type.Loader || value == undefined) {
      thresholdIndexRef.current = -1;
      setMessage('');
      return;
    }

    const percentage = maxValue ? getPercentage(value, maxValue) : value * 100;

    let newThresholdIndex = -1;

    for (let i = 0; i < announcementThresholds.length; i++) {
      if (percentage >= announcementThresholds[i]) {
        newThresholdIndex = i;
      }
    }

    if (newThresholdIndex === thresholdIndexRef.current) return;
    thresholdIndexRef.current = newThresholdIndex;

    const baseMessage = `Update: current progress is ${getPercentage(
      value,
      maxValue,
    )}% (${value} out of ${maxValue}).`;

    const newMessage =
      color && variantsAnnounced.includes(color)
        ? `${baseMessage} Status is ${color}.`
        : baseMessage;

    setMessage(newMessage);
  }, [type, value, maxValue, color]);

  return message;
}
