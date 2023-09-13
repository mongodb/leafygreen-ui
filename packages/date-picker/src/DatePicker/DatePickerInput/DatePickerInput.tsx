import React, { forwardRef } from 'react';

import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';

import { DateInputBox, DateInputWrapper } from '../../DateInput';
import { useDatePickerContext } from '../../DatePickerContext';

import { DatePickerInputProps } from './DatePickerInput.types';

export const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  ({ value, setValue, onClick, ...rest }: DatePickerInputProps, fwdRef) => {
    const { label, dateFormat, timeZone } = useDatePickerContext();
    const labelId = useIdAllocator({ prefix: 'date-label' });
    const descriptionId = useIdAllocator({ prefix: 'date-description' });
    const errorId = useIdAllocator({ prefix: 'date-description' });
    const inputId = useIdAllocator({ prefix: 'date-input' });
    const ref = useForwardedRef(fwdRef, null);

    return (
      <DateInputWrapper
        label={label}
        description={'Current time: ' + new Date(Date.now()).toLocaleString()}
        inputId={inputId}
        labelId={labelId}
        descriptionId={descriptionId}
        errorId={errorId}
        ref={ref}
        onInputClick={onClick}
        {...rest}
      >
        <DateInputBox
          value={value}
          setValue={setValue}
          id={inputId}
          labelledBy={labelId}
        />
      </DateInputWrapper>
    );
  },
);

DatePickerInput.displayName = 'DatePickerInput';
