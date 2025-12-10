import React, { forwardRef, useEffect } from 'react';
import { zonedTimeToUtc } from 'date-fns-tz';
import isNull from 'lodash/isNull';

import {
  DateType,
  isDateObject,
  isInvalidDateObject,
  isValidDate,
} from '@leafygreen-ui/date-utils';

import { unitOptions } from '../constants';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { useSelectUnit } from '../hooks';
import { useTimeSegments } from '../hooks/useTimeSegments';
import { TimeSegmentsState } from '../shared.types';
import { TimeFormField, TimeFormFieldInputContainer } from '../TimeFormField';
import { TimeInputBox } from '../TimeInputBox/TimeInputBox';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';
import {
  convert12hTo24h,
  doesSomeSegmentExist,
  getFormatPartsValues,
  isEverySegmentFilled,
  isEverySegmentValid,
  isEverySegmentValueExplicit,
} from '../utils';

import { wrapperBaseStyles } from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';

/**
 * @internal
 */
export const TimeInputInputs = forwardRef<HTMLDivElement, TimeInputInputsProps>(
  (_props: TimeInputInputsProps, forwardedRef) => {
    const { is12HourFormat, timeZone, locale, isDirty, setIsDirty } =
      useTimeInputDisplayContext();
    const { value, setValue } = useTimeInputContext();

    /** if the value is a `Date` the component is dirty */
    useEffect(() => {
      if (isDateObject(value) && !isDirty) {
        setIsDirty(true);
      }
    }, [isDirty, setIsDirty, value]);

    const handleSelectChange = (unit: UnitOption) => {
      setSelectUnit(unit);
    };

    /**
     * Gets the time parts from the value
     */
    const timeParts = getFormatPartsValues({
      locale: locale,
      timeZone: timeZone,
      value: value,
    });

    const { dayPeriod, month, day, year } = timeParts;

    // console.log('TimeInputInputs 🥝🥝🥝', { timeParts });

    const { segments, setSegment } = useTimeSegments({
      date: value,
      locale,
      timeZone,
      options: {
        onUpdate: (newSegments, prevSegments) => {
          const convertedHour = convert12hTo24h(
            newSegments.hour,
            selectUnit.displayName,
          );

          const newDate = newDateFromSegments({
            segments: newSegments,
            is12HourFormat,
            dateValues: {
              day,
              month,
              year,
              hour: convertedHour,
              minute: newSegments.minute,
              second: newSegments.second,
            },
            timeZone,
          });

          const shouldSetNewValue = shouldSetValue(
            newDate,
            isDirty,
            newSegments,
            is12HourFormat,
          );

          console.log(
            '🍎🍎🍎TimeInputInputs > useTimeSegments > onUpdate > shouldSetValue 🍎🍎🍎',
            {
              newDate,
              newSegments,
              shouldSetNewValue,
            },
          );

          if (shouldSetNewValue) {
            setValue(newDate);
          }
        },
      },
    });

    // console.log('TimeInputInputs 🍉', { segments });

    /**
     * Hook to manage the select unit
     */
    const { selectUnit, setSelectUnit } = useSelectUnit({
      dayPeriod,
      value,
      unitOptions,
      is12HourFormat,
      options: {
        onUpdate: (newSelectUnit, prevSelectUnit) => {
          const convertedHour = convert12hTo24h(
            segments.hour,
            newSelectUnit.displayName,
          );

          const newDate = newDateFromSegments({
            segments,
            is12HourFormat,
            dateValues: {
              day,
              month,
              year,
              hour: convertedHour,
              minute: segments.minute,
              second: segments.second,
            },
            timeZone,
          });

          // console.log('TimeInputInputs > useTimeSegments > onUpdate 🍉🍉🍉', {
          //   newSegments,
          //   prevSegments,
          //   selectUnit: selectUnit.displayName,
          //   is12HourFormat,
          //   date: {
          //     day,
          //     month,
          //     year,
          //     hour: newSegments.hour,
          //     convertedHour,
          //     minute: newSegments.minute,
          //     second: newSegments.second,
          //     dayPeriod: selectUnit.displayName,
          //   },
          //   newDate,
          //   utcString: newDate?.toUTCString() ?? '',
          // });

          const shouldSetNewValue = shouldSetValue(
            newDate,
            isDirty,
            segments,
            is12HourFormat,
          );

          console.log(
            '🥺🥺🥺 TimeInputInputs > useSelectUnit > onUpdate > shouldSetValue 🥺🥺🥺',
            {
              newDate,
              segments,
              shouldSetNewValue,
            },
          );

          if (shouldSetNewValue) {
            setValue(newDate);
          }
        },
      },
    });

    // // eslint-disable-next-line no-console
    // console.log('TimeInputInputs 🍉', {
    //   value: value?.toUTCString(),
    //   segmentObj,
    // });

    return (
      <TimeFormField ref={forwardedRef}>
        <div className={wrapperBaseStyles}>
          <TimeFormFieldInputContainer>
            <TimeInputBox
              segments={segments}
              setSegment={(segment, value) => {
                setSegment(segment, value);
                console.log({ segment, value });
              }}
            />
          </TimeFormFieldInputContainer>
          {is12HourFormat && (
            <TimeInputSelect
              unit={selectUnit.displayName}
              onChange={unit => {
                handleSelectChange(unit);
              }}
            />
          )}
        </div>
      </TimeFormField>
    );
  },
);

TimeInputInputs.displayName = 'TimeInputInputs';

const shouldSetValue = (
  newDate: DateType,
  isDirty: boolean,
  segments: TimeSegmentsState,
  is12HourFormat: boolean,
) => {
  const isNullDateCheck = isNull(newDate);
  const isValidDateCheck = isValidDate(newDate);
  const isEverySegmentValueExplicitCheck = isEverySegmentValueExplicit({
    segments,
    is12HourFormat,
  });
  const isInvalidDateObjectCheck = isInvalidDateObject(newDate);
  const isEverySegmentFilledCheck = isEverySegmentFilled(segments);

  const shouldSetValue =
    isNullDateCheck ||
    (isValidDateCheck && isEverySegmentValueExplicitCheck) ||
    (isInvalidDateObjectCheck && (isDirty || isEverySegmentFilledCheck));

  return shouldSetValue;
};

/**
 * Creates a new date object in UTC from the segments.
 *
 * @param segments - The segments to create the date from
 * @param is12HourFormat - Whether the time is in 12 hour format
 * @param dateValues - The date values to create the date from
 * @param timeZone - The time zone to create the date in
 * @returns The either a new date object in UTC, null, or an invalid date object
 */
const newDateFromSegments = ({
  segments,
  is12HourFormat,
  dateValues,
  timeZone,
}: {
  segments: TimeSegmentsState;
  is12HourFormat: boolean;
  timeZone: string;
  dateValues: {
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    second: string;
  };
}) => {
  const { day, month, year, hour, minute, second } = dateValues;

  /**
   * Check if all segments are filled and valid. If they are, return the UTC date.
   */
  if (
    isEverySegmentFilled(segments) &&
    isEverySegmentValid({ segments, is12HourFormat })
  ) {
    /**
     * Create a new local date object with the date values
     */
    const newDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    );

    /**
     * Convert the new date object to UTC.
     *
     * This takes the local date created above and converts it to UTC using the `zonedTimeToUtc` helper function.
     */
    const utcTime = zonedTimeToUtc(newDate, timeZone);
    console.log(
      'newDateFromSegments > isEverySegmentFilled && isEverySegmentValid  🍭🍭🍭',
      { utcTime },
    );

    return utcTime;
  }

  /**
   * Check if any segments are filled. If not, return null. This means all segments are empty.
   */
  if (!doesSomeSegmentExist(segments)) {
    // console.log('newDateFromSegments > !doesSomeSegmentExist  🍭🍭🍭');
    return null;
  }

  // console.log('newDateFromSegments > new Date("invalid")  🍭🍭🍭');
  /**
   * Return an invalid date object if some segments are empty or invalid.
   */
  return new Date('invalid');
};

// TODO:
// add refs
// add onSegmentChange
//
