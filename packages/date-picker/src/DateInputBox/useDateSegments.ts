import { useEffect, useReducer } from 'react';
import { getDate, getMonth, getYear, isSameDay } from 'date-fns';

import { usePrevious } from '@leafygreen-ui/hooks';

import type { DateSegment, DateSegmentValue } from '../DateInputSegment';

import { DateSegmentsState } from './DateInputBox.types';
import { toTimeZone } from './utils';

type OnUpdateCallback = (value: DateSegmentsState) => void;

interface UseDateSegmentsOptions {
  /** A formatter used to separate the date value into segments */
  timeZone: string;

  /** A callback fired when the segment values change */
  onUpdate?: OnUpdateCallback;
}

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
  date: Date | null,
  { timeZone, onUpdate }: UseDateSegmentsOptions,
) => {
  const [segments, dispatch] = useReducer(
    dateSegmentsReducer,
    date,
    getSegmentsFromDate,
  );
  const prevDate = usePrevious(date);

  // If `date` prop changes, update the segments
  useEffect(() => {
    if (date && !(prevDate && isSameDay(date, prevDate))) {
      const tzDate = toTimeZone(date, timeZone);
      const newSegments = getSegmentsFromDate(tzDate);
      onUpdate?.(newSegments);
      dispatch(newSegments);
    }
  }, [date, onUpdate, prevDate, timeZone]);

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

/** Returns a single object with day, month & year segments */
const getSegmentsFromDate = (date: Date | null): DateSegmentsState => {
  return {
    day: date ? getDate(date) : undefined,
    month: date ? getMonth(date) + 1 : undefined,
    year: date ? getYear(date) : undefined,
  } as DateSegmentsState;
};
