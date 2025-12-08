import { useEffect, useReducer } from 'react';
import { TimeSegment, TimeSegmentsState } from '../../shared.types';
import { DateType, isValidDate, LocaleString } from '@leafygreen-ui/date-utils';
import { getFormatPartsValues } from '../../utils/getFormatPartsValues/getFormatPartsValues';
import isEqual from 'lodash/isEqual';
import { getValueFormatter } from '@leafygreen-ui/input-box';
import { usePrevious } from '@leafygreen-ui/hooks';

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
  const hour = getValueFormatter({ charsCount: 2, allowZero: true })(
    segments.hour,
  );
  const minute = getValueFormatter({ charsCount: 2, allowZero: true })(
    segments.minute,
  );
  const second = getValueFormatter({ charsCount: 2, allowZero: true })(
    segments.second,
  );
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

export const isSameUTCDayAndTime = (
  day1?: DateType,
  day2?: DateType,
): boolean => {
  if (!isValidDate(day1) || !isValidDate(day2)) return false;

  return (
    day1.getUTCDate() === day2.getUTCDate() &&
    day1.getUTCMonth() === day2.getUTCMonth() &&
    day1.getUTCFullYear() === day2.getUTCFullYear() &&
    day1.getUTCHours() === day2.getUTCHours() &&
    day1.getUTCMinutes() === day2.getUTCMinutes() &&
    day1.getUTCSeconds() === day2.getUTCSeconds() &&
    day1.getUTCMilliseconds() === day2.getUTCMilliseconds()
  );
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

  const prevDate = usePrevious(date);
  const prevLocale = usePrevious(locale);
  const prevTimeZone = usePrevious(timeZone);

  // check if the date has changed because this is triggered whenever locale changes?
  // TODO: this need to account for the timezone and locale
  useEffect(() => {
    const isDateValid = isValidDate(date);
    const hasDateAndTimeChanged = !isSameUTCDayAndTime(date, prevDate);
    const newSegments = getTimeSegmentsFromDate(date, locale, timeZone); // TODO: this is being formatted to early?
    const haveSegmentsChanged = !isEqual(newSegments, segments);

    // console.log('useTimeSegments > useEffect > 🐡🐡🐡', {
    //   date,
    //   prevDate,
    //   isDateValid,
    //   haveSegmentsChanged,
    //   segments,
    //   newSegments,
    //   hasDateAndTimeChanged,
    // });

    // if (isDateValid && haveSegmentsChanged && hasDateAndTimeChanged) {
    if (isDateValid && haveSegmentsChanged) {
      // const newSegments = getTimeSegmentsFromDate(date, locale, timeZone);
      // console.log('useTimeSegments > useEffect > newSegments  🦄', {
      //   newSegments,
      //   segments,
      // });
      // onUpdate?.(newSegments, { ...segments });
      // This means that segments have changed because the timezone or locale has changed but the date is the same so don't call onUpdate.
      dispatch(newSegments);

      // This means that segments have changed because the date is different so we should call onUpdate.
      // TODO: what happens if the date is different but the segments are the same?
      if (hasDateAndTimeChanged) {
        onUpdate?.(newSegments, { ...segments });
      }
    }
  }, [date, locale, timeZone, segments, onUpdate]);

  const setSegment = (segment: TimeSegment, value: string) => {
    // console.log('useTimeSegments > setSegment 💬', { segment, value });
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
