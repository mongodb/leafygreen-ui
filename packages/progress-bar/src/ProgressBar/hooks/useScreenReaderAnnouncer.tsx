import { useMemo, useRef } from 'react';

import { isDefined } from '@leafygreen-ui/lib';

import { Role, Variant } from '../ProgressBar.types';
import { getPercentage } from '../utils';

const announcementThresholds = [0, 50, 100];
const variantsAnnounced = [Variant.Warning, Variant.Error] as Array<Variant>;

interface UseScreenReaderAnnouncerParams {
  /**
   * ARIA role of the component (e.g., progressbar, meter).
   * If the role is `meter`, no message is generated.
   */
  role: Role;
  /** Current progress value. No message is generated if this is `undefined`. */
  value?: number;
  /** Maximum progress value. */
  maxValue?: number;
  /** Variant of the progress bar (e.g., 'success', 'error'), which is included in the message if relevant. */
  variant?: Variant;
}

/**
 * Generates an accessible live region message for screen readers when progress bar updates cross defined thresholds.
 */
export const useScreenReaderAnnouncer = ({
  role,
  value,
  maxValue,
  variant,
}: UseScreenReaderAnnouncerParams): string | undefined => {
  const thresholdIndexRef = useRef(-1);

  const message = useMemo(() => {
    // no live region messages for non-loader types or if value is undefined
    if (role === Role.Meter || !isDefined(value)) {
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
      variant && variantsAnnounced.includes(variant)
        ? `${baseMessage} Status is ${variant}.`
        : baseMessage;

    return newMessage;
  }, [role, value, maxValue, variant]);

  return message;
};
