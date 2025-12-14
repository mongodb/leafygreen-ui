import React, {
  ChangeEvent,
  forwardRef,
  MouseEventHandler,
  useEffect,
} from 'react';
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
import { TimeInputSegmentChangeEventHandler } from '../TimeInputSegment/TimeInputSegment.types';
import { createSyntheticEvent } from '@leafygreen-ui/lib';
import { focusAndSelectSegment } from '@leafygreen-ui/input-box';

/**
 * @internal
 * This component renders and updates the time segments and select unit.
 */
export const TimeInputInputs = forwardRef<HTMLDivElement, TimeInputInputsProps>(
  (
    { onChange: onSegmentChange, onKeyDown, ...rest }: TimeInputInputsProps,
    forwardedRef,
  ) => {
    const {
      is12HourFormat,
      timeZone,
      locale,
      isDirty,
      setIsDirty,
      disabled,
      formatParts,
    } = useTimeInputDisplayContext();
    const {
      value,
      setValue,
      refs: { segmentRefs },
    } = useTimeInputContext();

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
    const handleSegmentUpdate: OnUpdateCallback = ({
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

    // TODO: need validation on blur

    /**
     * Hook to manage the time segments and select unit
     */
    const { segments, setSegment, setSelectUnit, selectUnit } =
      useTimeSegmentsAndSelectUnit({
        date: value,
        locale,
        timeZone,
        options: {
          onUpdate: handleSegmentUpdate,
        },
      });

    /**
     * Called when the input, or any of its children, is clicked.
     * Focuses the appropriate segment
     */
    const handleInputClick: MouseEventHandler<HTMLElement> = e => {
      if (!disabled) {
        const { target } = e;

        /**
         * Focus and select the appropriate segment.
         *
         * This is done here instead of `InputBox` because this component has padding that needs to be accounted for on click.
         */
        focusAndSelectSegment({
          target,
          formatParts,
          segmentRefs,
        });
      }
    };

    /**
     * Called when any individual segment changes
     */
    const handleSegmentChange: TimeInputSegmentChangeEventHandler =
      segmentChangeEvent => {
        const { segment, value } = segmentChangeEvent;

        //Fire a simulated `change` event
        const target = segmentRefs[segment].current;

        if (target) {
          // At this point, the target stored in segmentRefs has a stale value.
          // To fix this we update the value of the target with the up-to-date value from `segmentChangeEvent`.
          target.value = value;
          const changeEvent = new Event('change');
          const reactEvent = createSyntheticEvent<
            ChangeEvent<HTMLInputElement>
          >(changeEvent, target);
          onSegmentChange?.(reactEvent);
        }
      };

    return (
      <TimeFormField ref={forwardedRef} onClick={handleInputClick} {...rest}>
        <div className={wrapperBaseStyles}>
          {/* TODO: wrap this in a wrapper container */}
          <TimeFormFieldInputContainer>
            <TimeInputBox
              segments={segments}
              setSegment={(segment, value) => {
                setSegment(segment, value);
              }}
              onSegmentChange={handleSegmentChange}
              segmentRefs={segmentRefs}
              onKeyDown={onKeyDown}
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
          {/* TODO: Add 24 hour label */}
        </div>
      </TimeFormField>
    );
  },
);

TimeInputInputs.displayName = 'TimeInputInputs';
