import React, { forwardRef, useEffect } from 'react';
import { isEqual } from 'lodash';

import { isDateObject } from '@leafygreen-ui/date-utils';

import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { useTimeSegmentsAndSelectUnit } from '../hooks/useTimeSegmentsAndSelectUnit/useTimeSegmentsAndSelectUnit';
import { OnUpdateCallback } from '../hooks/useTimeSegmentsAndSelectUnit/useTimeSegmentsAndSelectUnit.types';
import { TimeFormField, TimeFormFieldInputContainer } from '../TimeFormField';
import { TimeInputBox } from '../TimeInputBox/TimeInputBox';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';
import {
  getFormatPartsValues,
  getNewUTCDateFromSegments,
  shouldSetValue,
} from '../utils';

import { wrapperBaseStyles } from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';

/**
 * @internal
 * This component renders and updates the time segments and select unit.
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

    /**
     * Handles the change of the select unit.
     */
    const handleSelectChange = (unit: UnitOption) => {
      setSelectUnit(unit);
    };

    /**
     * Handles the update of the segments and select unit.
     *
     * @param newSegments - The new segments
     * @param prevSegments - The previous segments
     * @param newSelectUnit - The new select unit
     * @param prevSelectUnit - The previous select unit
     */
    const handleSegmentAndSelectUpdate: OnUpdateCallback = ({
      newSegments,
      prevSegments,
      newSelectUnit,
      prevSelectUnit,
    }) => {
      const hasAnySegmentChanged = !isEqual(newSegments, prevSegments);
      const hasSelectUnitChanged = !isEqual(newSelectUnit, prevSelectUnit);

      // If any segment has changed or the select unit has changed and the time is in 12 hour format, then we need to update the date
      // If the time is in 24h format we don't need to check for the select unit since it's not applicable.
      if (hasAnySegmentChanged || (hasSelectUnitChanged && is12HourFormat)) {
        //Gets the time parts from the value
        const { month, day, year } = getFormatPartsValues({
          locale: locale,
          timeZone: timeZone,
          value: value,
        });

        // Constructs a date object in UTC from day, month, year segments
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

        // Checks if the new date should be set
        const shouldSetNewValue = shouldSetValue({
          newDate,
          isDirty,
          segments: newSegments,
          is12HourFormat,
        });

        // TODO: There will be a few more checks added once validation is implemented
        if (shouldSetNewValue) setValue(newDate);
      }
    };

    /**
     * Hook to manage the time segments and select unit
     */
    const { segments, setSegment, setSelectUnit, selectUnit } =
      useTimeSegmentsAndSelectUnit({
        date: value,
        locale,
        timeZone,
        options: {
          onUpdate: handleSegmentAndSelectUpdate,
        },
      });

    return (
      <TimeFormField ref={forwardedRef}>
        <div className={wrapperBaseStyles}>
          <TimeFormFieldInputContainer>
            <TimeInputBox
              segments={segments}
              setSegment={(segment, value) => {
                setSegment(segment, value);
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
