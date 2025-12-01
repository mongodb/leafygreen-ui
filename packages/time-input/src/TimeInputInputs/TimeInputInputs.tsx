import React, { forwardRef, useEffect, useState } from 'react';

import { unitOptions } from '../constants';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';

import { wrapperBaseStyles } from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { getFormatPartsValues } from '../utils';
import { isValidDate } from '@leafygreen-ui/date-utils';
import { TimeFormField, TimeFormFieldInputContainer } from '../TimeFormField';

/**
 * @internal
 */
export const TimeInputInputs = forwardRef<HTMLDivElement, TimeInputInputsProps>(
  (_props: TimeInputInputsProps, forwardedRef) => {
    const { shouldShowSelect, formatParts, timeZone, locale } =
      useTimeInputDisplayContext();

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

    // TODO: temporary fix for select unit
    // get select unit from time parts
    const initialSelectUnitFromTimeParts = timeParts.dayPeriod;
    const selectUnitOption = unitOptions.find(
      option => option.displayName === initialSelectUnitFromTimeParts,
    ) as UnitOption;

    const [selectUnit, setSelectUnit] = useState<UnitOption>(selectUnitOption);

    // TODO: temporary fix for select unit
    useEffect(() => {
      if (isValidDate(value)) {
        const selectUnitFromTimeParts = timeParts.dayPeriod;
        const selectUnitOption = unitOptions.find(
          option => option.displayName === selectUnitFromTimeParts,
        ) as UnitOption;

        setSelectUnit(selectUnitOption);
      }
    }, [value, selectUnitOption]);

    console.log('TimeInputInputs 🍉', {
      shouldShowSelect,
      formatParts,
      timeZone,
      value: value?.toUTCString(),
      timeParts,
      locale,
    });

    return (
      <TimeFormField ref={forwardedRef}>
        <div className={wrapperBaseStyles}>
          <TimeFormFieldInputContainer>
            <div>TODO: Input segments go here</div>
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
