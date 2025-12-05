import { useEffect, useReducer } from 'react';
import { TimeSegment, TimeSegmentsState } from '../../shared.types';
import { DateType, isValidDate, LocaleString } from '@leafygreen-ui/date-utils';
import { getFormatPartsValues } from '../../utils/getFormatPartsValues/getFormatPartsValues';
import isEqual from 'lodash/isEqual';
import { getValueFormatter } from '@leafygreen-ui/input-box';

type UseTimeSegmentsOptions = {
  onUpdate: (
    newSegments: TimeSegmentsState,
    prevSegments?: TimeSegmentsState,
  ) => void;
};

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

// TODO: move this to a utils file
const getFormattedTimeSegments = (segments: TimeSegmentsState) => {
  const hour = getValueFormatter({ charsCount: 2 })(segments.hour);
  const minute = getValueFormatter({ charsCount: 2 })(segments.minute);
  const second = getValueFormatter({ charsCount: 2 })(segments.second);
  return { hour, minute, second };
};

const getTimeSegmentsFromDate = (
  date: DateType,
  locale: LocaleString,
  timeZone: string,
): TimeSegmentsState => {
  // TODO: format these so there is padding
  const { hour, minute, second } = getFormatPartsValues({
    locale,
    timeZone,
    value: date,
  });

  return getFormattedTimeSegments({ hour, minute, second });
};

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
    getTimeSegmentsFromDate(date, locale, timeZone),
  );

  useEffect(() => {
    const isDateValid = isValidDate(date);
    const newSegments = getTimeSegmentsFromDate(date, locale, timeZone);
    const haveSegmentsChanged = !isEqual(newSegments, segments);

    if (isDateValid && haveSegmentsChanged) {
      const newSegments = getTimeSegmentsFromDate(date, locale, timeZone);
      // console.log('useEffect 🦄', { newSegments, segments });
      onUpdate?.(newSegments, { ...segments });
      dispatch(newSegments);
    }
  }, [date, locale, timeZone, segments, onUpdate]);

  const setSegment = (segment: TimeSegment, value: string) => {
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
