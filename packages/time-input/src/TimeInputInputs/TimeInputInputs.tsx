import React, { forwardRef, useMemo } from 'react';

import { unitOptions } from '../constants';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { useSelectUnit } from '../hooks';
import { TimeFormField, TimeFormFieldInputContainer } from '../TimeFormField';
import { TimeInputBox } from '../TimeInputBox/TimeInputBox';
import { TimeSegmentsState } from '../TimeInputSegment/TimeInputSegment.types';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';
import { getFormatPartsValues } from '../utils';

import { wrapperBaseStyles } from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';

/**
 * @internal
 */
export const TimeInputInputs = forwardRef<HTMLDivElement, TimeInputInputsProps>(
  (_props: TimeInputInputsProps, forwardedRef) => {
    const { shouldShowSelect, timeZone, locale } = useTimeInputDisplayContext();
    const { value } = useTimeInputContext();

    const handleSelectChange = (unit: UnitOption) => {
      setSelectUnit(unit);
    };

    const timeParts = getFormatPartsValues({
      locale: locale,
      timeZone: timeZone,
      value: value,
      hasDayPeriod: shouldShowSelect,
    });

    const { hour, minute, second } = timeParts;

    /**
     * Creates a memoized object of the time segments
     */
    const segmentObj: TimeSegmentsState = useMemo(
      () => ({
        hour,
        minute,
        second,
      }),
      [hour, minute, second],
    );

    /**
     * Hook to manage the select unit
     */
    const { selectUnit, setSelectUnit } = useSelectUnit({
      dayPeriod: timeParts.dayPeriod,
      value,
      unitOptions,
    });

    console.log('TimeInputInputs 🍉', {
      value: value?.toUTCString(),
      segmentObj,
    });

    return (
      <TimeFormField ref={forwardedRef}>
        <div className={wrapperBaseStyles}>
          <TimeFormFieldInputContainer>
            <TimeInputBox
              segments={segmentObj}
              setSegment={(segment, value) => {
                console.log({ segment, value });
              }}
            />
          </TimeFormFieldInputContainer>
          {shouldShowSelect && (
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
