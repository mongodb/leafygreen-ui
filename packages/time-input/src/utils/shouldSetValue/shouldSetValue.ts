import isNull from 'lodash/isNull';

import { DateType, isValidDate } from '@leafygreen-ui/date-utils';
import { isInvalidDateObject } from '@leafygreen-ui/date-utils';

import { TimeSegmentsState } from '../../shared.types';
import { isEverySegmentFilled } from '../isEverySegmentFilled/isEverySegmentFilled';
import { isEverySegmentValueExplicit } from '../isEverySegmentValueExplicit/isEverySegmentValueExplicit';

/**
 * Checks if the new date should be set.
 *
 * @param newDate - The new date to check
 * @param isDirty - Whether the component is dirty
 * @param segments - The segments to check
 * @param is12HourFormat - Whether the time is in 12 hour format
 * @returns Whether the new date should be set
 */
export const shouldSetValue = ({
  newDate,
  isDirty,
  segments,
  is12HourFormat,
}: {
  newDate: DateType;
  isDirty: boolean;
  segments: TimeSegmentsState;
  is12HourFormat: boolean;
}): boolean => {
  // If the date is valid and all segments are explicit, then the value should be set.
  const isValidDateAndSegmentsAreExplicit =
    isValidDate(newDate) &&
    isEverySegmentValueExplicit({
      segments,
      is12HourFormat,
    });

  // If the date is invalid and the component is dirty, it means the user has interacted with the component and the value should be set.
  // If the date is invalid and every segment is filled, then the value should be set.
  const isInvalidDateObjectAndDirty =
    isInvalidDateObject(newDate) && (isDirty || isEverySegmentFilled(segments));

  const shouldSetValue =
    isNull(newDate) ||
    isValidDateAndSegmentsAreExplicit ||
    isInvalidDateObjectAndDirty;

  return shouldSetValue;
};
