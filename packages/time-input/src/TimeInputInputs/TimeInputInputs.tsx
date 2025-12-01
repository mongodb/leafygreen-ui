// @ts-nocheck
import React, { forwardRef, useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { FormField, FormFieldInputContainer } from '@leafygreen-ui/form-field';

import { unitOptions } from '../constants';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';

import { wrapperBaseStyles } from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { getFormatPartsValues } from '../utils';
import { isValidDate } from '@leafygreen-ui/date-utils';

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

    // const { selectUnit, setSelectUnit } = useSelectUnit(timeParts);

    // const useSelectUnit = (timeParts: Array<Intl.DateTimeFormatPart>) => {
    //   const [selectUnit, setSelectUnit] = useState<UnitOption>(unitOptions[0]);
    //   return { selectUnit, setSelectUnit };
    // };

    // get select unit from time parts
    const initialSelectUnitFromTimeParts = timeParts.dayPeriod;
    const selectUnitOption = unitOptions.find(
      option => option.displayName === initialSelectUnitFromTimeParts,
    );

    const [selectUnit, setSelectUnit] = useState<UnitOption>(selectUnitOption);

    useEffect(() => {
      if (isValidDate(value)) {
        const selectUnitFromTimeParts = timeParts.dayPeriod;
        const selectUnitOption = unitOptions.find(
          option => option.displayName === selectUnitFromTimeParts,
        );

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

    // TODO: break this out more
    return (
      <FormField aria-labelledby="temp" label="Time Input" ref={forwardedRef}>
        <div className={cx(wrapperBaseStyles)}>
          <FormFieldInputContainer>
            <div>TODO: Input segments go here</div>
          </FormFieldInputContainer>
          {shouldShowSelect && (
            <TimeInputSelect
              unit={selectUnit.displayName}
              onChange={unit => {
                handleSelectChange(unit);
              }}
            />
          )}
        </div>
      </FormField>
    );
  },
);

TimeInputInputs.displayName = 'TimeInputInputs';
