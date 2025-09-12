import React, { useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { FormField, FormFieldInputContainer } from '@leafygreen-ui/form-field';

import { unitOptions } from '../constants';
import { TimeInputInput } from '../TimeInputInput';
import { TimeInputSelect } from '../TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';

import { wrapperBaseStyles } from './TimeInputContent.styles';
import { TimeInputContentProps } from './TimeInputContent.types';

/**
 * @internal
 */
export const TimeInputContent = ({ className }: TimeInputContentProps) => {
  const [selectUnit, setSelectUnit] = useState<UnitOption>(unitOptions[0]);

  const handleSelectChange = (unit: UnitOption) => {
    setSelectUnit(unit);
  };

  return (
    <div className={className}>
      <FormField aria-labelledby="temp" label="Time Input">
        <div className={cx(wrapperBaseStyles)}>
          <FormFieldInputContainer>
            <TimeInputInput />
          </FormFieldInputContainer>
          <TimeInputSelect
            unit={selectUnit.displayName}
            onChange={unit => {
              handleSelectChange(unit);
            }}
          />
        </div>
      </FormField>
    </div>
  );
};

TimeInputContent.displayName = 'TimeInputContent';
