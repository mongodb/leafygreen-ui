import React, { forwardRef, useEffect } from 'react';
import isNull from 'lodash/isNull';

import {
  DateType,
  isDateObject,
  isInvalidDateObject,
  isValidDate,
} from '@leafygreen-ui/date-utils';

import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { useTimeSegmentsAndSelectUnit } from '../hooks/useTimeSegmentsAndSelectUnit/useTimeSegmentsAndSelectUnit';
import { TimeSegmentsState } from '../shared.types';
import { TimeFormField, TimeFormFieldInputContainer } from '../TimeFormField';
import { TimeInputBox } from '../TimeInputBox/TimeInputBox';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';
import {
  getFormatPartsValues,
  getNewUTCDateFromSegments,
  isEverySegmentFilled,
  isEverySegmentValueExplicit,
} from '../utils';

import { wrapperBaseStyles } from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';
import { isEqual } from 'lodash';

/**
 * @internal
 */
export const TimeInputInputs = forwardRef<HTMLDivElement, TimeInputInputsProps>(
  (_props: TimeInputInputsProps, forwardedRef) => {
    const { is12HourFormat, timeZone, locale, isDirty, setIsDirty } =
      useTimeInputDisplayContext();
    const { value, setValue } = useTimeInputContext();

    /** if the value is a `Date` the component is dirty, meaning the component has been interacted with */
    useEffect(() => {
      if (isDateObject(value) && !isDirty) {
        setIsDirty(true);
      }
    }, [isDirty, setIsDirty, value]);

    const handleSelectChange = (unit: UnitOption) => {
      // console.log(
      //   'TimeInputInputs > handleSelectChange 🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌',
      //   { unit },
      // );
      setSelectUnit(unit);
    };

    /**
     * Gets the time parts from the value
     */
    const { month, day, year } = getFormatPartsValues({
      locale: locale,
      timeZone: timeZone,
      value: value,
    });

    // console.log('TimeInputInputs 🥝🥝🥝', { timeParts });

    /**
     * Hook to manage the time segments and select unit
     */
    const { segments, setSegment, setSelectUnit, selectUnit } =
      useTimeSegmentsAndSelectUnit({
        date: value,
        locale,
        timeZone,
        is12HourFormat,
        options: {
          onUpdate: ({
            newSegments,
            prevSegments,
            newSelectUnit,
            prevSelectUnit,
          }) => {
            const hasAnySegmentChanged = !isEqual(newSegments, prevSegments);
            const hasSelectUnitChanged = !isEqual(
              newSelectUnit,
              prevSelectUnit,
            );

            console.log(
              'TimeInputInputs > useTimeSegments > onUpdate  🎉🎉🎉',
              {
                hasAnySegmentChanged,
                hasSelectUnitChanged,
              },
            );

            if (
              hasAnySegmentChanged ||
              (hasSelectUnitChanged && is12HourFormat)
            ) {
              const newDate = getNewUTCDateFromSegments({
                segments: newSegments,
                is12HourFormat,
                dateValues: {
                  day,
                  month,
                  year,
                },
                timeZone,
                dayPeriod: newSelectUnit.displayName,
              });

              const shouldSetNewValue = shouldSetValue(
                newDate,
                isDirty,
                newSegments,
                is12HourFormat,
              );

              console.log(
                '🌈🌈🌈TimeInputInputs > useTimeSegments > onUpdate > shouldSetValue 🌈🌈🌈',
                {
                  newDate,
                  newSegments,
                  shouldSetNewValue,
                  prevSegments,
                  newSelectUnit,
                  prevSelectUnit,
                },
              );

              if (shouldSetNewValue) {
                setValue(newDate);
              }
            }
          },
        },
      });

    // console.log('TimeInputInputs 🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉', {
    //   segments,
    //   selectUnit,
    // });

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

/**
 * Checks if the new date should be set.
 *
 * @param newDate - The new date to check
 * @param isDirty - Whether the component is dirty
 * @param segments - The segments to check
 * @param is12HourFormat - Whether the time is in 12 hour format
 * @returns Whether the new date should be set
 */
const shouldSetValue = (
  newDate: DateType,
  isDirty: boolean,
  segments: TimeSegmentsState,
  is12HourFormat: boolean,
): boolean => {
  // If the date is valid and all segments are explicit, then the value should be set.
  const isValidDateAndSegmentsAreExplicit =
    isValidDate(newDate) &&
    isEverySegmentValueExplicit({
      segments,
      is12HourFormat,
    });

  // If the date is invalid and the component is dirty, it means the user has interacted with the component and the value should be set.
  // If the date is invalid and every segment is filled, then the value should be set.
  const isInvalidDateObjectAndDirty =
    isInvalidDateObject(newDate) && (isDirty || isEverySegmentFilled(segments));

  const shouldSetValue =
    isNull(newDate) ||
    isValidDateAndSegmentsAreExplicit ||
    isInvalidDateObjectAndDirty;

  return shouldSetValue;
};

// TODO:
// add refs
// add onSegmentChange
// add tests!
