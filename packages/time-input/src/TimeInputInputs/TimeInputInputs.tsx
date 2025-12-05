import React, { forwardRef } from 'react';

import { unitOptions } from '../constants';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { useSelectUnit } from '../hooks';
import { TimeSegmentsState } from '../shared.types';
import { TimeFormField, TimeFormFieldInputContainer } from '../TimeFormField';
import { TimeInputBox } from '../TimeInputBox/TimeInputBox';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';
import { getFormatPartsValues } from '../utils';

import { wrapperBaseStyles } from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';
import { useObjectDependency } from '@leafygreen-ui/hooks';
import { DateType, LocaleString } from '@leafygreen-ui/date-utils';
import { useTimeSegments } from '../hooks/useTimeSegments';

import { zonedTimeToUtc } from 'date-fns-tz';

/**
 * @internal
 */
export const TimeInputInputs = forwardRef<HTMLDivElement, TimeInputInputsProps>(
  (_props: TimeInputInputsProps, forwardedRef) => {
    const { is12HourFormat, timeZone, locale } = useTimeInputDisplayContext();
    const { value, setValue } = useTimeInputContext();

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

    /**
     * Creates time segments object
     *
     * // TODO: these are temp
     */
    // const derivedSegments: TimeSegmentsState = {
    //   hour,
    //   minute,
    //   second,
    // };

    // const derivedSegmentsDependency = useObjectDependency(derivedSegments);

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
          const newDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(convertedHour),
            Number(newSegments.minute),
            Number(newSegments.second),
          );
          const UtcTime = zonedTimeToUtc(newDate, timeZone);
          console.log('TimeInputInputs 🍉🍉🍉', {
            newSegments,
            prevSegments,
            selectUnit: selectUnit.displayName,
            is12HourFormat,
            date: {
              day,
              month,
              year,
              hour: newSegments.hour,
              convertedHour,
              minute: newSegments.minute,
              second: newSegments.second,
              dayPeriod: selectUnit.displayName,
            },
            UtcTime,
            UtcTimeString: UtcTime.toUTCString(),
          });

          setValue(UtcTime);
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
        // TODO: when the locale changes, the segment values are stale in this hook. We should not call onUpdate when the locale changes.
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
          console.log('TimeInputInputs Select Unit 🪼🪼🪼', {
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
