import { useEffect, useReducer } from 'react';

import { DateType, isSameUTCDay } from '@leafygreen-ui/date-utils';
import { usePrevious } from '@leafygreen-ui/hooks';

import { DateSegment, DateSegmentsState, DateSegmentValue } from '../../types';
import { getFormattedSegmentsFromDate } from '../../utils';

import {
  UseDateSegmentsOptions,
  UseDateSegmentsReturnValue,
} from './useDateSegments.types';

/** Merges old state & new state */
const dateSegmentsReducer = (
  currentState: DateSegmentsState,
  newState: Partial<DateSegmentsState>,
) => {
  const state = {
    ...currentState,
    ...newState,
  };
  return state;
};

/**
 * Returns an object with all 3 date segments, and a setter function
 *
 * Returned segments are relative to the formatter time zone
 */
export const useDateSegments = (
  /** Provided date is UTC */
  date: DateType = null,
  { onUpdate }: UseDateSegmentsOptions,
): UseDateSegmentsReturnValue => {
  //
  const [segments, dispatch] = useReducer(
    dateSegmentsReducer,
    date,
    getFormattedSegmentsFromDate,
  );
  const prevDate = usePrevious(date);

  // If `date` prop changes, update the segments
  useEffect(() => {
    if (!isSameUTCDay(date, prevDate)) {
      const newSegments = getFormattedSegmentsFromDate(date);
      onUpdate?.(newSegments, { ...segments });
      dispatch(newSegments);
    }
  }, [date, onUpdate, prevDate, segments]);

  /**
   * Custom dispatch that triggers the provided side effects, and updates state
   */
  const setSegment = (segment: DateSegment, value: DateSegmentValue) => {
    // Calculate next state
    // then, execute any side effects based on the new state
    // finally, commit the new state

    const updateObject = { [segment]: value };
    const nextState = dateSegmentsReducer(segments, updateObject);
    onUpdate?.(nextState, { ...segments }, segment);
    dispatch(updateObject);
  };

  return {
    segments,
    setSegment,
  };
};
