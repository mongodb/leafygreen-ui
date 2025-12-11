import { useEffect, useReducer } from 'react';
import isEqual from 'lodash/isEqual';

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

    // console.log('useTimeSegments > useEffect > 🦧🦧🦧🦧🦧🦧🦧🦧🦧', {
    //   date,
    //   prevDate,
    //   isDateValid,
    //   haveSegmentsChanged,
    //   segments,
    //   newSegments,
    //   hasDateAndTimeChanged,
    // });

    // Checks if the date is valid and the segments have changed
    if (isDateValid && haveSegmentsChanged) {
      // console.log('useTimeSegments > useEffect > newSegments ☎️🌼☎️🌼', {
      //   newSegments,
      //   segments,
      // });

      // If the date is the same but the timezone or locale has changed then update the segments but don't call onUpdate because the date value did not change, only the presentation format changed. (instead on segmentChange should be called)
      if (!hasDateAndTimeChanged && (hasLocaleChanged || hasTimeZoneChanged)) {
        // console.log(
        //   'useTimeSegments > useEffect > locale or timezone changed  🎃',
        //   {
        //     newSegments,
        //     segments,
        //   },
        // );
        dispatch({
          type: ActionKind.UPDATE_TIME_SEGMENTS,
          payload: newSegments,
        });
      }

      // If the date has changed then update the segments and call `onUpdate`
      if (hasDateAndTimeChanged) {
        // console.log('useTimeSegments > useEffect > hasDateAndTimeChanged  🐡', {
        //   newSegments,
        //   segments,
        // });
        dispatch({
          type: ActionKind.UPDATE_TIME_SEGMENTS,
          payload: newSegments,
        });
        onUpdate?.({
          newSegments,
          prevSegments: { ...segments },
          newSelectUnit: selectUnit,
          prevSelectUnit: selectUnit,
        });
      }
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
    // console.log('useTimeSegments > setSegment 💬', { segment, value });
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
   * Updates the select unit if the format has changed from 12h to 24h or 24h to 12h OR if the date is valid and the format is 12h.
   */
  useEffect(() => {
    // console.log('useSelectUnit > useEffect 🧼🧼🧼', {
    //   prevIs12HourFormat,
    //   is12HourFormat,
    // });

    const hasFormatChanged = prevIs12HourFormat !== is12HourFormat;
    const isValueValid = isValidDate(date);

    /**
     * Run this effect if the format has changed from 12h to 24h or 24h to 12h OR if the date is valid and the format is 12h.
     *
     * If the format has changed, the value doesn't matter if the format is 24h. This should update the state but not call onUpdate since only the presentational format has changed.
     *
     * If the format has changed OR if the timeZone has changed then update the select unit.
     */
    if (hasFormatChanged || (isValueValid && is12HourFormat)) {
      // console.log('useSelectUnit > useEffect  🥺🍎🥺');
      const { dayPeriod } = getFormatPartsValues({
        locale,
        timeZone,
        value: date,
      });

      const selectUnitOption = findUnitOptionByDayPeriod(
        dayPeriod,
        unitOptions,
      );

      dispatch({
        type: ActionKind.UPDATE_SELECT_UNIT,
        payload: selectUnitOption,
      });
    }
  }, [date, locale, timeZone, prevIs12HourFormat, is12HourFormat]);

  /**
   * Set the select unit and call onUpdate callback if the select unit has changed.
   *
   * @param selectUnit - The select unit to set
   */
  const setSelectUnit = (newSelectUnit: UnitOption) => {
    // console.log('useSelectUnit > setSelectUnit 🥝🥝🥝', {
    //   newSelectUnit,
    //   selectUnit,
    // });

    dispatch({
      type: ActionKind.UPDATE_SELECT_UNIT,
      payload: newSelectUnit,
    });

    const hasSelectUnitChanged = selectUnit !== newSelectUnit;

    // console.log('useSelectUnit > setSelectUnit > hasSelectUnitChanged 💚💚💚', {
    //   hasSelectUnitChanged,
    //   oldSelectUnit: selectUnit,
    //   newSelectUnit: newSelectUnit,
    // });

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
