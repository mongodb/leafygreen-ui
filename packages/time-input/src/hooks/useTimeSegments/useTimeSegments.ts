import { useEffect, useReducer } from 'react';
import { TimeSegment, TimeSegmentsState } from '../../shared.types';
import { DateType, isValidDate, LocaleString } from '@leafygreen-ui/date-utils';
import { getFormatPartsValues } from '../../utils/getFormatPartsValues/getFormatPartsValues';
import isEqual from 'lodash/isEqual';

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
const getTimeSegmentsFromDate = (
  date: DateType,
  locale: LocaleString,
  timeZone: string,
): TimeSegmentsState => {
  const { hour, minute, second } = getFormatPartsValues({
    locale,
    timeZone,
    value: date,
  });
  return { hour, minute, second };
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
      console.log('useEffect 🦄', { newSegments, segments });
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
