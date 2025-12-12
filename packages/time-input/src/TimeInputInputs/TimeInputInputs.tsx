import React, { forwardRef, useEffect } from 'react';
import { isEqual } from 'lodash';

import { isDateObject } from '@leafygreen-ui/date-utils';

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
  shouldSetValue,
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

    /** if the value is a `Date` the component is dirty, meaning the component has been interacted with */
    useEffect(() => {
      if (isDateObject(value) && !isDirty) {
        setIsDirty(true);
      }
    }, [isDirty, setIsDirty, value]);

    /**
     * Handles the change of the select unit.
     *
     * @param unit - The new select unit
     */
    const handleSelectChange = (unit: UnitOption) => {
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

    /**
     * Handles the update of the segments and select unit.
     *
     * @param newSegments - The new segments
     * @param prevSegments - The previous segments
     * @param newSelectUnit - The new select unit
     * @param prevSelectUnit - The previous select unit
     */
    const handleSegmentUpdate = ({
      newSegments,
      prevSegments,
      newSelectUnit,
      prevSelectUnit,
    }: {
      newSegments: TimeSegmentsState;
      prevSegments: TimeSegmentsState;
      newSelectUnit: UnitOption;
      prevSelectUnit: UnitOption;
    }) => {
      const hasAnySegmentChanged = !isEqual(newSegments, prevSegments);
      const hasSelectUnitChanged = !isEqual(newSelectUnit, prevSelectUnit);

      if (hasAnySegmentChanged || (hasSelectUnitChanged && is12HourFormat)) {
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

        const shouldSetNewValue = shouldSetValue({
          newDate,
          isDirty,
          segments: newSegments,
          is12HourFormat,
        });

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
        is12HourFormat,
        options: {
          onUpdate: handleSegmentUpdate,
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

// TODO:
// OPen up a few PRs
// ADD tests for this component
// Extend timeline
// add a new row for adding on segmentChange
// tell brooke

// add refs
// add onSegmentChange
