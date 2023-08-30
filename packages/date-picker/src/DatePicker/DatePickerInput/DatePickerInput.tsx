import React from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { DateInputBox, DateInputWrapper } from '../../DateInput';
import { useDatePickerContext } from '../../DatePickerContext';

import { DatePickerInputProps } from './DatePickerInput.types';

export function DatePickerInput({ value, setValue }: DatePickerInputProps) {
  const { label, dateFormat, timeZone } = useDatePickerContext();
  const labelId = useIdAllocator({ prefix: 'date-label' });
  const descriptionId = useIdAllocator({ prefix: 'date-description' });
  const errorId = useIdAllocator({ prefix: 'date-description' });
  const inputId = useIdAllocator({ prefix: 'date-input' });

  return (
    <DateInputWrapper
      label={label}
      description={dateFormat + ' ' + timeZone}
      inputId={inputId}
      labelId={labelId}
      descriptionId={descriptionId}
      errorId={errorId}
    >
      <DateInputBox
        value={value}
        setValue={setValue}
        id={inputId}
        labelledBy={labelId}
      />
    </DateInputWrapper>
  );
}

DatePickerInput.displayName = 'DatePickerInput';
