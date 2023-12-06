import last from 'lodash/last';

import { truncateStart } from '@leafygreen-ui/lib';

import { charsPerSegment } from '../../../../constants';
import { DateSegment, DateSegmentValue } from '../../../../hooks';
import { getValueFormatter, isValidValueForSegment } from '../../../../utils';

/**
 * Calculates the new value for the segment given an incoming change
 */
export const calculateNewSegmentValue = (
  segmentName: DateSegment,
  incomingValue: DateSegmentValue,
): DateSegmentValue => {
  if (
    !isValidValueForSegment(segmentName, incomingValue) &&
    segmentName !== 'year'
  ) {
    const formatter = getValueFormatter(segmentName);
    const typedChar = last(incomingValue.split(''));
    const newValue = typedChar === '0' ? '0' : formatter(typedChar);
    return newValue;
  }

  return truncateStart(incomingValue, {
    length: charsPerSegment[segmentName],
  });
};
