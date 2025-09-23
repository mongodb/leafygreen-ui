import React, { useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { FormField, FormFieldInputContainer } from '@leafygreen-ui/form-field';

import { unitOptions } from '../constants';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';

import { wrapperBaseStyles } from './TimeInputInputs.styles';

/**
 * @internal
 */
export const TimeInputInputs = () => {
  const [selectUnit, setSelectUnit] = useState<UnitOption>(unitOptions[0]);

  const handleSelectChange = (unit: UnitOption) => {
    setSelectUnit(unit);
  };

  // TODO: break this out more
  return (
    <FormField aria-labelledby="temp" label="Time Input">
      <div className={cx(wrapperBaseStyles)}>
        <FormFieldInputContainer>
          <div>TODO: Input segments go here</div>
        </FormFieldInputContainer>
        <TimeInputSelect
          unit={selectUnit.displayName}
          onChange={unit => {
            handleSelectChange(unit);
          }}
        />
      </div>
    </FormField>
  );
};

TimeInputInputs.displayName = 'TimeInputInputs';
