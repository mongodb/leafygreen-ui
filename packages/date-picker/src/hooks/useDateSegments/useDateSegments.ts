import { useEffect, useReducer } from 'react';
import { isSameDay } from 'date-fns';

import { usePrevious } from '@leafygreen-ui/hooks';

import { DateType } from '../../types';
import { getSegmentsFromDate } from '../../utils';

import {
  DateSegment,
  DateSegmentsState,
  DateSegmentValue,
  UseDateSegmentsOptions,
  UseDateSegmentsReturnValue,
} from './DateSegments.types';

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
  /** Provided date is relative to the client's time zone */
  date: DateType,
  { onUpdate }: UseDateSegmentsOptions,
): UseDateSegmentsReturnValue => {
  //
  const [segments, dispatch] = useReducer(
    dateSegmentsReducer,
    date,
    getSegmentsFromDate,
  );
  const prevDate = usePrevious(date);

  // If `date` prop changes, update the segments
  useEffect(() => {
    if (date && !(prevDate && isSameDay(date, prevDate))) {
      const newSegments = getSegmentsFromDate(date);
      onUpdate?.(newSegments);
      dispatch(newSegments);
    }
  }, [date, onUpdate, prevDate]);

  /**
   * Custom dispatch that triggers the provided side effects, and updates state
   */
  const setSegment = (segment: DateSegment, value: DateSegmentValue) => {
    // Calculate next state
    // then, execute any side effects based on the new state
    // finally, commit the new state
    const nextState = dateSegmentsReducer(segments, { [segment]: value });
    onUpdate?.(nextState);
    dispatch({ [segment]: value });
  };

  return {
    segments,
    setSegment,
  };
};
