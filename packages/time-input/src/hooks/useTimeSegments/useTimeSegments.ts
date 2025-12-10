import { useEffect, useReducer } from 'react';
import isEqual from 'lodash/isEqual';

import { DateType, isValidDate, LocaleString } from '@leafygreen-ui/date-utils';
import { usePrevious } from '@leafygreen-ui/hooks';

import { TimeSegment, TimeSegmentsState } from '../../shared.types';
import {
  getFormattedTimeSegmentsFromDate,
  isSameUTCDayAndTime,
} from '../../utils';

interface UseTimeSegmentsOptions {
  onUpdate: (
    newSegments: TimeSegmentsState,
    prevSegments?: TimeSegmentsState,
  ) => void;
}

const timeSegmentsReducer = (
  currentState: TimeSegmentsState,
  newState: Partial<TimeSegmentsState>,
) => {
  const state = {
    ...currentState,
    ...newState,
  };
  return state;
};

/**
 * Returns an object with all 3 time segments, and a setter function
 *
 * Returned segments are relative to the formatter time zone
 */
export const useTimeSegments = ({
  date = null,
  locale,
  timeZone,
  options: { onUpdate },
}: {
  date?: DateType;
  locale: LocaleString;
  timeZone: string;
  options: UseTimeSegmentsOptions;
}) => {
  const [segments, dispatch] = useReducer(timeSegmentsReducer, date, date =>
    getFormattedTimeSegmentsFromDate(date, locale, timeZone),
  );
  const prevDate = usePrevious(date);
  const prevLocale = usePrevious(locale);
  const prevTimeZone = usePrevious(timeZone);

  /**
   * The useEffect is only to check if the date has changed or if the segments have changed.
   *
   * If the date is different then we update the segments and call onUpdate.
   *
   * If the date is the same AND the timezone and locale have not changed then don't update the segments or call onUpdate. This could mean that the user has typed in a new ambiguous value.
   *
   * If the date is the same BUT the locale or timezone has changed then update the segments but don't call onUpdate because the time did not change. (instead on segmentChange should be called)
   *
   */
  useEffect(() => {
    const isDateValid = isValidDate(date);
    const hasDateAndTimeChanged = !isSameUTCDayAndTime(date, prevDate);
    const newSegments = getFormattedTimeSegmentsFromDate(
      date,
      locale,
      timeZone,
    );
    const hasLocaleChanged = prevLocale !== locale;
    const hasTimeZoneChanged = prevTimeZone !== timeZone;

    // If the segments were updated in setSegment then the newSegments should be the same as the segments in state.
    const haveSegmentsChanged = !isEqual(newSegments, segments);

    console.log('useTimeSegments > useEffect > 🦧🦧🦧🦧🦧🦧🦧🦧🦧', {
      date,
      prevDate,
      isDateValid,
      haveSegmentsChanged,
      segments,
      newSegments,
      hasDateAndTimeChanged,
    });

    // Checks if the date is valid and the segments have changed
    if (isDateValid && haveSegmentsChanged) {
      console.log('useTimeSegments > useEffect > newSegments ☎️🌼☎️🌼', {
        newSegments,
        segments,
      });

      // If the date is the same but the timezone or locale has changed then update the segments but don't call onUpdate because the date value did not change, only the presentation format changed. (instead on segmentChange should be called)
      if (!hasDateAndTimeChanged && (hasLocaleChanged || hasTimeZoneChanged)) {
        console.log(
          'useTimeSegments > useEffect > locale or timezone changed  🎃',
          {
            newSegments,
            segments,
          },
        );
        dispatch(newSegments);
      }

      // If the date has changed then update the segments and call `onUpdate`
      if (hasDateAndTimeChanged) {
        console.log('useTimeSegments > useEffect > hasDateAndTimeChanged  🐡', {
          newSegments,
          segments,
        });
        dispatch(newSegments);
        onUpdate?.(newSegments, { ...segments });
      }
    }
  }, [
    date,
    locale,
    timeZone,
    segments,
    onUpdate,
    prevDate,
    prevLocale,
    prevTimeZone,
  ]);

  /**
   * Sets a segment value. Is called when the user types in a new value.
   *
   * @param segment - The segment to set
   * @param value - The value to set
   */
  const setSegment = (segment: TimeSegment, value: string) => {
    console.log('useTimeSegments > setSegment 💬', { segment, value });
    const updateObject = { [segment]: value };
    // This returns a new state object with the updated segments
    const nextState = timeSegmentsReducer(segments, updateObject);
    // Pass the new state and a copy of the previous state to the callback
    onUpdate?.(nextState, { ...segments });

    // This internally invokes `timeSegmentsReducer` and passes `updateObject` as the second argument. `segments` is the first argument. This updates the internal state of the hook.
    dispatch(nextState);
  };

  return { segments, setSegment };
};
