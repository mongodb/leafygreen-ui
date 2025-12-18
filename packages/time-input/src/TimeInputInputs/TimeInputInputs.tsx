import React, {
  ChangeEvent,
  forwardRef,
  MouseEventHandler,
  useEffect,
} from 'react';
import { isEqual } from 'lodash';

import { isDateObject } from '@leafygreen-ui/date-utils';
import { focusAndSelectSegment } from '@leafygreen-ui/input-box';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';
import { Overline } from '@leafygreen-ui/typography';

import { TWENTY_FOUR_HOURS_TEXT } from '../constants';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { OnUpdateCallback, useTimeSegmentsAndSelectUnit } from '../hooks';
import { TimeFormField, TimeFormFieldInputContainer } from '../TimeFormField';
import { TimeInputBox } from '../TimeInputBox/TimeInputBox';
import { TimeInputSegmentChangeEventHandler } from '../TimeInputSegment/TimeInputSegment.types';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import {
  getFormatPartsValues,
  getNewUTCDateFromSegments,
  shouldSetValue,
} from '../utils';

import {
  getTwentyFourHourStyles,
  getWrapperStyles,
} from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';
import { TimeSegmentsState } from '../shared.types';

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
      min,
      max,
    } = useTimeInputDisplayContext();
    const {
      value,
      setValue,
      refs: { segmentRefs },
      handleValidation,
    } = useTimeInputContext();
    const { theme } = useDarkMode();

    const is24HourFormat = !is12HourFormat;

    /**
     * If the value is a `Date` the component is dirty, meaning the component has been interacted with
     */
    useEffect(() => {
      if (isDateObject(value) && !isDirty) {
        setIsDirty(true);
      }
    }, [isDirty, setIsDirty, value]);

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

        // TODO: maybe these can be generated in the handleValidation function
        // const minSegments: TimeSegmentsState = {
        //   hour: min.getUTCHours().toString(),
        //   minute: min.getUTCMinutes().toString(),
        //   second: min.getUTCSeconds().toString(),
        // };

        // const newMinDate = getNewUTCDateFromSegments({
        //   segments: minSegments,
        //   is12HourFormat,
        //   dateValues: {
        //     day,
        //     month,
        //     year,
        //   },
        //   timeZone,
        //   dayPeriod: newSelectUnit.displayName,
        // });

        // const maxSegments: TimeSegmentsState = {
        //   hour: max.getUTCHours().toString(),
        //   minute: max.getUTCMinutes().toString(),
        //   second: max.getUTCSeconds().toString(),
        // };

        // const newMaxDate = getNewUTCDateFromSegments({
        //   segments: maxSegments,
        //   is12HourFormat,
        //   dateValues: {
        //     day,
        //     month,
        //     year,
        //   },
        //   timeZone,
        //   dayPeriod: newSelectUnit.displayName,
        // });

        // TODO: There will be a few more checks added once validation is implemented
        if (shouldSetNewValue) {
          setValue(newDate);
          handleValidation(newDate);
        }
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
          onUpdate: handleSegmentAndSelectUpdate,
        },
      });

    /**
     * Called when the input, or any of its children, is clicked.
     * Focuses the appropriate segment
     */
    const handleInputClick: MouseEventHandler<HTMLElement> = e => {
      if (!disabled) {
        const { target } = e;

        // Focus and select the appropriate segment.
        // This is done here instead of `InputBox` because this component has padding that needs to be accounted for on click.
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
        <div className={getWrapperStyles({ is12HourFormat })}>
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
                setSelectUnit(unit);
              }}
            />
          )}
          {is24HourFormat && (
            <Overline className={getTwentyFourHourStyles({ theme, disabled })}>
              {TWENTY_FOUR_HOURS_TEXT}
            </Overline>
          )}
        </div>
      </TimeFormField>
    );
  },
);

TimeInputInputs.displayName = 'TimeInputInputs';
