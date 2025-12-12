import { useEffect, useReducer } from 'react';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

import { DateType, isValidDate, LocaleString } from '@leafygreen-ui/date-utils';
import { usePrevious } from '@leafygreen-ui/hooks';

import { unitOptions } from '../../constants';
import { TimeSegment } from '../../shared.types';
import { UnitOption } from '../../TimeInputSelect/TimeInputSelect.types';
import {
  findUnitOptionByDayPeriod,
  getFormatPartsValues,
  getFormattedTimeSegmentsFromDate,
  isSameUTCDayAndTime,
} from '../../utils';

import {
  Action,
  ActionKind,
  TimeSegmentsAndSelectUnitState,
  UseTimeSegmentsOptions,
} from './useTimeSegmentsAndSelectUnit.types';

/**
 * Reducer for the useTimeSegmentsAndSelect hook
 */
const timeSegmentsAndSelectUnitReducer = (
  currentState: TimeSegmentsAndSelectUnitState,
  action: Action,
): TimeSegmentsAndSelectUnitState => {
  switch (action.type) {
    case ActionKind.UPDATE_TIME_SEGMENTS:
      return {
        ...currentState,
        segments: {
          ...currentState.segments,
          ...action.payload,
        },
      };
    case ActionKind.UPDATE_SELECT_UNIT:
      return {
        ...currentState,
        selectUnit: action.payload,
      };
    case ActionKind.UPDATE_TIME_SEGMENTS_AND_SELECT_UNIT:
      return {
        ...currentState,
        segments: {
          ...currentState.segments,
          ...action.payload.segments,
        },
        selectUnit: action.payload.selectUnit,
      };
    default:
      return currentState;
  }
};

/**
 * Gets the initial state for the useTimeSegmentsAndSelect hook
 */
const getInitialState = (
  date: DateType,
  locale: LocaleString,
  timeZone: string,
): TimeSegmentsAndSelectUnitState => {
  const { dayPeriod } = getFormatPartsValues({
    locale,
    timeZone,
    value: date,
  });

  const initialSelectUnitOption = findUnitOptionByDayPeriod(
    dayPeriod,
    unitOptions,
  );

  return {
    segments: getFormattedTimeSegmentsFromDate(date, locale, timeZone),
    selectUnit: initialSelectUnitOption,
  };
};

/**
 * Returns an object with all 3 time segments, and a setter function
 *
 * Returned segments are relative to the formatter time zone
 */
export const useTimeSegmentsAndSelectUnit = ({
  date = null,
  locale,
  timeZone,
  is12HourFormat,
  options: { onUpdate },
}: {
  date?: DateType;
  locale: LocaleString;
  timeZone: string;
  is12HourFormat: boolean;
  options: UseTimeSegmentsOptions;
}) => {
  const [{ segments, selectUnit }, dispatch] = useReducer(
    timeSegmentsAndSelectUnitReducer,
    date,
    date => getInitialState(date, locale, timeZone),
  );
  const prevDate = usePrevious(date);
  const prevLocale = usePrevious(locale);
  const prevTimeZone = usePrevious(timeZone);
  const prevIs12HourFormat = usePrevious(is12HourFormat);

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

    // If the date has been set to null from a previously valid date
    const hasTimeBeenCleared =
      (isNull(date) || isUndefined(date)) && isValidDate(prevDate);

    // if the date is valid, date has been changed, or the time has been cleared then update the segments and call onUpdate and dispatch
    if ((isDateValid && hasDateAndTimeChanged) || hasTimeBeenCleared) {
      const { dayPeriod } = getFormatPartsValues({
        locale,
        timeZone,
        value: date,
      });

      dispatch({
        type: ActionKind.UPDATE_TIME_SEGMENTS_AND_SELECT_UNIT,
        payload: {
          segments: newSegments,
          selectUnit: findUnitOptionByDayPeriod(dayPeriod, unitOptions),
        },
      });

      onUpdate?.({
        newSegments,
        prevSegments: { ...segments },
        newSelectUnit: findUnitOptionByDayPeriod(dayPeriod, unitOptions),
        prevSelectUnit: selectUnit,
      });

      return;
    }

    // if the date is valid and the date has not changed but the segments are different then update the segments and only call dispatch
    if (
      isDateValid &&
      !hasDateAndTimeChanged &&
      haveSegmentsChanged &&
      (hasLocaleChanged || hasTimeZoneChanged)
    ) {
      dispatch({
        type: ActionKind.UPDATE_TIME_SEGMENTS,
        payload: newSegments,
      });
    }
  }, [
    date,
    locale,
    timeZone,
    segments,
    selectUnit,
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
    const updateObject = { [segment]: value };

    // We need a way to pass the updated segments to onUpdate and update the reducer state at the same time so we manually call the reducer to get the next state. This will not update the reducer state so we still need to dispatch the action to update the reducer state.
    const nextState = timeSegmentsAndSelectUnitReducer(
      { segments, selectUnit },
      {
        type: ActionKind.UPDATE_TIME_SEGMENTS,
        payload: updateObject,
      },
    );
    // Pass the new state and a copy of the previous state to the callback. This is to ensure that onUpdate gets the latest state.
    onUpdate?.({
      newSegments: nextState.segments,
      prevSegments: { ...segments },
      newSelectUnit: selectUnit,
      prevSelectUnit: selectUnit,
    });

    //This updates the internal state of the hook.
    dispatch({
      type: ActionKind.UPDATE_TIME_SEGMENTS,
      payload: nextState.segments,
    });
  };

  /**
   * Run this effect if the date is valid and the format is 12h. We don't call onUpdate because this change is most likely from the presentation format changing, not the date value changing.
   */
  useEffect(() => {
    const isDateValid = isValidDate(date);

    if (isDateValid && is12HourFormat) {
      const { dayPeriod } = getFormatPartsValues({
        locale,
        timeZone,
        value: date,
      });

      dispatch({
        type: ActionKind.UPDATE_SELECT_UNIT,
        payload: findUnitOptionByDayPeriod(dayPeriod, unitOptions),
      });
    }
  }, [date, locale, timeZone, prevIs12HourFormat, is12HourFormat]);

  /**
   * Set the select unit and call onUpdate callback if the select unit has changed.
   *
   * @param selectUnit - The select unit to set
   */
  const setSelectUnit = (newSelectUnit: UnitOption) => {
    dispatch({
      type: ActionKind.UPDATE_SELECT_UNIT,
      payload: newSelectUnit,
    });

    const hasSelectUnitChanged = selectUnit !== newSelectUnit;

    if (hasSelectUnitChanged) {
      onUpdate?.({
        newSelectUnit: newSelectUnit,
        prevSelectUnit: { ...selectUnit },
        newSegments: { ...segments },
        prevSegments: { ...segments },
      });
    }
  };

  return { segments, setSegment, setSelectUnit, selectUnit };
};
