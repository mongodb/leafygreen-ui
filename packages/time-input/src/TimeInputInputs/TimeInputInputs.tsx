import React, { forwardRef, useEffect } from 'react';

import {
  getDefaultMax,
  getDefaultMin,
  unitOptions,
  getTimeSegmentRules,
} from '../constants';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { useSelectUnit } from '../hooks';
import { TimeSegment, TimeSegmentsState } from '../shared.types';
import { TimeFormField, TimeFormFieldInputContainer } from '../TimeFormField';
import { TimeInputBox } from '../TimeInputBox/TimeInputBox';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';
import { getFormatPartsValues } from '../utils';

import { wrapperBaseStyles } from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';
import { useObjectDependency } from '@leafygreen-ui/hooks';
import {
  DateType,
  isDateObject,
  isInvalidDateObject,
  isValidDate,
  LocaleString,
} from '@leafygreen-ui/date-utils';
import { useTimeSegments } from '../hooks/useTimeSegments';

import { zonedTimeToUtc } from 'date-fns-tz';
import {
  createExplicitSegmentValidator,
  isValidValueForSegment,
} from '@leafygreen-ui/input-box';

import isNull from 'lodash/isNull';

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
          const convertedHour = convertHourTo24HourFormat(
            newSegments.hour,
            selectUnit.displayName,
          );
          // const newDate = new Date(
          //   Number(year),
          //   Number(month) - 1,
          //   Number(day),
          //   Number(convertedHour),
          //   Number(newSegments.minute),
          //   Number(newSegments.second),
          // );

          // TODO: need to check if all segments are explicit

          // const UtcTime = zonedTimeToUtc(newDate, timeZone);

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

          // TODO: need to check if all segments are explicit

          const isNullDateCheck = isNull(newDate);
          const isValidDateCheck = isValidDate(newDate);
          const isEverySegmentValueExplicitCheck = isEverySegmentValueExplicit(
            newSegments,
            is12HourFormat,
          );
          const isInvalidDateObjectCheck = isInvalidDateObject(newDate);
          const isEverySegmentFilledCheck = isEverySegmentFilled(newSegments);

          const shouldSetValue =
            isNullDateCheck ||
            (isValidDateCheck && isEverySegmentValueExplicitCheck) ||
            (isInvalidDateObjectCheck &&
              (isDirty || isEverySegmentFilledCheck));

          console.log(
            '🍎🍎🍎TimeInputInputs > useTimeSegments > onUpdate > shouldSetValue 🍎🍎🍎',
            {
              newDate,
              newSegments,
              shouldSetValue,
              isNullDateCheck,
              isValidDateCheck,
              isEverySegmentValueExplicitCheck,
              isInvalidDateObjectCheck,
              isEverySegmentFilledCheck,
            },
          );

          if (shouldSetValue) {
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
      timeZone,
      options: {
        onUpdate: (newSelectUnit, prevSelectUnit) => {
          const convertedHour = convertHourTo24HourFormat(
            segments.hour,
            newSelectUnit.displayName,
          );
          const newDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(convertedHour),
            Number(segments.minute),
            Number(segments.second),
          );
          const UtcTime = zonedTimeToUtc(newDate, timeZone);
          console.log('TimeInputInputs > useSelectUnit > onUpdate 🪼🪼🪼', {
            segments,
            newSelectUnit,
            prevSelectUnit,
            is12HourFormat,
            date: {
              day,
              month,
              year,
              hour: segments.hour,
              convertedHour,
              minute: segments.minute,
              second: segments.second,
              dayPeriod: newSelectUnit.displayName,
            },
            UtcTime,
            UtcTimeString: UtcTime.toUTCString(),
          });

          // TODO: also both useTimeSegments and useSelectUnit should not call onUpdate when that happens.
          setValue(UtcTime);
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
                // eslint-disable-next-line no-console
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

const convertHourTo24HourFormat = (hour: string, dayPeriod: string) => {
  // console.log('convertHourTo24HourFormat 🐸🐸🐸', { hour, dayPeriod });

  if (hour === '') return hour;

  // if dayPeriod is AM and hour is 12, return 0 since 12 AM is 00:00
  if (dayPeriod === 'AM') {
    if (hour === '12') {
      return '0';
    }
    // else return hour as-is
    return hour;
  }

  // if dayPeriod is PM and hour is 12, return 12 since 12 PM is 12:00
  if (hour === '12') {
    return '12';
  }
  // else return hour + 12
  return `${parseInt(hour) + 12}`;
};

const isEverySegmentFilled = (segments: TimeSegmentsState) => {
  const isEverySegmentFilled = Object.values(segments).every(segment => {
    const isEmpty = segment === '';
    console.log('isEverySegmentFilled > isEmpty 🌼🌼🌼', { segment, isEmpty });
    return !isEmpty;
  });
  // check if all segments are not empty
  return isEverySegmentFilled;
};

const doesSomeSegmentExist = (segments: TimeSegmentsState) => {
  // check if all segments are not empty
  return Object.values(segments).some(segment => segment !== '');
};

const isEverySegmentValid = (
  segments: TimeSegmentsState,
  is12HourFormat: boolean,
) => {
  const isValid = Object.entries(segments).every(([segment, value]) => {
    const isValid = isValidValueForSegment({
      segment: segment as TimeSegment,
      value: value as string,
      defaultMin: getDefaultMin({ is12HourFormat })[segment as TimeSegment],
      defaultMax: getDefaultMax({ is12HourFormat })[segment as TimeSegment],
      segmentEnum: TimeSegment,
    });

    console.log('isEverySegmentValid > isValid 🍎🍎🍎', {
      segment,
      value,
      isValid,
    });

    return isValid;
  });

  return isValid;
};

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

  const newDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  );

  const utcTime = zonedTimeToUtc(newDate, timeZone);

  if (
    isEverySegmentFilled(segments) &&
    isEverySegmentValid(segments, is12HourFormat)
  ) {
    console.log(
      'newDateFromSegments > isEverySegmentFilled && isEverySegmentValid  🍭🍭🍭',
      { utcTime },
    );
    return utcTime;
  }

  if (!doesSomeSegmentExist(segments)) {
    console.log('newDateFromSegments > !doesSomeSegmentExist  🍭🍭🍭');
    return null;
  }

  console.log('newDateFromSegments > new Date("invalid")  🍭🍭🍭');
  return new Date('invalid');
};

export const isExplicitSegmentValue = (is12HourFormat: boolean) =>
  createExplicitSegmentValidator({
    segmentEnum: TimeSegment,
    rules: getTimeSegmentRules({ is12HourFormat }),
  });

/**
 * Returns whether every segment's value is explicit and unambiguous
 * (see {@link isExplicitSegmentValue})
 */
export const isEverySegmentValueExplicit = (
  segments: TimeSegmentsState,
  is12HourFormat: boolean,
): boolean => {
  return Object.entries(segments).every(([segment, value]) => {
    const isExplicit = isExplicitSegmentValue(is12HourFormat)({
      segment: segment as TimeSegment,
      value,
      allowZero: segment === TimeSegment.Hour ? !is12HourFormat : true,
    });

    console.log('isEverySegmentValueExplicit > isExplicit 🍕🍕🍕', {
      segment,
      value,
      isExplicit,
    });

    return isExplicit;
  });
};
