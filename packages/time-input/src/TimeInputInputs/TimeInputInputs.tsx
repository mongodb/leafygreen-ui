import React, { forwardRef, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { FormField, FormFieldInputContainer } from '@leafygreen-ui/form-field';

import { unitOptions } from '../constants';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
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
    const { is12hFormat, formatParts, timeZone, locale } =
      useTimeInputDisplayContext();
    const [selectUnit, setSelectUnit] = useState<UnitOption>(unitOptions[0]);

    const { value } = useTimeInputContext();

    const handleSelectChange = (unit: UnitOption) => {
      setSelectUnit(unit);
    };

    const timeParts = getFormatPartsValues({
      locale: locale,
      timeZone: timeZone,
      value: value,
    });

    // TODO: break this out more
    return (
      <FormField aria-labelledby="temp" label="Time Input" ref={forwardedRef}>
        <div className={cx(wrapperBaseStyles)}>
          <FormFieldInputContainer>
            <div>TODO: Input segments go here</div>
          </FormFieldInputContainer>
          {is12hFormat && (
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
