import { TimeSegment } from '../../shared.types';

/**
 * The rules for the time segments
 *
 * @param is12HourFormat - Whether the time input is in 12-hour format
 */
export const getTimeSegmentRules = ({
  is12HourFormat,
}: {
  is12HourFormat: boolean;
}) => {
  return {
    [TimeSegment.Hour]: {
      maxChars: 2,
      minExplicitValue: is12HourFormat ? 2 : 3,
    },
    [TimeSegment.Minute]: {
      maxChars: 2,
      minExplicitValue: 6,
    },
    [TimeSegment.Second]: {
      maxChars: 2,
      minExplicitValue: 6,
    },
  };
};
