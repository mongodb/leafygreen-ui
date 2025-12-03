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

/**
 * @internal
 */
export const TimeInputInputs = forwardRef<HTMLDivElement, TimeInputInputsProps>(
  (_props: TimeInputInputsProps, forwardedRef) => {
    const { is12HourFormat, timeZone, locale } = useTimeInputDisplayContext();
    const { value } = useTimeInputContext();

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

    const { hour, minute, second } = timeParts;

    /**
     * Creates time segments object
     *
     * // TODO: these are temp
     */
    const segmentObj: TimeSegmentsState = {
      hour,
      minute,
      second,
    };

    /**
     * Hook to manage the select unit
     */
    const { selectUnit, setSelectUnit } = useSelectUnit({
      dayPeriod: timeParts.dayPeriod,
      value,
      unitOptions,
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
              segments={segmentObj}
              setSegment={(segment, value) => {
                // eslint-disable-next-line no-console
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
