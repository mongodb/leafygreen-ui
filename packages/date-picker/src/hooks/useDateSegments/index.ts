import { useEffect, useReducer } from 'react';
import { isSameDay } from 'date-fns';

import { usePrevious } from '@leafygreen-ui/hooks';

import {
  DateSegment,
  DateSegmentsState,
  DateSegmentValue,
} from '../../DateInput/DateInput.types';
import { getSegmentsFromDate } from '../../utils/getSegmentsFromDate';

type OnUpdateCallback = (value: DateSegmentsState) => void;

interface UseDateSegmentsOptions {
  /** A formatter used to separate the date value into segments */
  // timeZone: string;

  /** A callback fired when the segment values change */
  onUpdate?: OnUpdateCallback;
}

interface UseDateSegmentsReturnValue {
  segments: DateSegmentsState;
  setSegment: (segment: DateSegment, value: DateSegmentValue) => void;
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
  { onUpdate }: UseDateSegmentsOptions,
): UseDateSegmentsReturnValue => {
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
