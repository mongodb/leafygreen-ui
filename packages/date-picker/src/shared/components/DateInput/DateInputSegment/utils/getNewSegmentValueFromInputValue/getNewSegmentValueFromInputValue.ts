import last from 'lodash/last';

import { truncateStart } from '@leafygreen-ui/lib';

import { charsPerSegment } from '../../../../../constants';
import { DateSegment, DateSegmentValue } from '../../../../../types';
import { isValidValueForSegment } from '../../../../../utils';

/**
 * Calculates the new value for the segment given an incoming change.
 *
 * Does not allow incoming values that
 * - are not valid numbers
 * - include a period
 * - would cause the segment to overflow
 */
export const getNewSegmentValueFromInputValue = (
  segmentName: DateSegment,
  currentValue: DateSegmentValue,
  incomingValue: DateSegmentValue,
): DateSegmentValue => {
  // If the incoming value is not a valid number
  const isIncomingValueNumber = !isNaN(Number(incomingValue));
  // macOS adds a period when pressing SPACE twice inside a text input.
  const doesIncomingValueContainPeriod = /\./.test(incomingValue);

  // if the current value is "full", do not allow any additional characters to be entered
  const wouldCauseOverflow =
    currentValue.length === charsPerSegment[segmentName] &&
    incomingValue.length > charsPerSegment[segmentName];

  if (
    !isIncomingValueNumber ||
    doesIncomingValueContainPeriod ||
    wouldCauseOverflow
  ) {
    return currentValue;
  }

  const isIncomingValueValid = isValidValueForSegment(
    segmentName,
    incomingValue,
  );

  if (isIncomingValueValid || segmentName === 'year') {
    const newValue = truncateStart(incomingValue, {
      length: charsPerSegment[segmentName],
    });

    return newValue;
  }

  const typedChar = last(incomingValue.split(''));
  const newValue = typedChar === '0' ? '0' : typedChar ?? '';
  return newValue;
};
