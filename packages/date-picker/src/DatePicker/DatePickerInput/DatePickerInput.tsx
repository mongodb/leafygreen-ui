import React, { forwardRef } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { DateFormField, DateInputBox } from '../../DateInput';
import { useDatePickerContext } from '../../DatePickerContext';

import { DatePickerInputProps } from './DatePickerInput.types';

export const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    { value, setValue, onClick, segmentRefs, ...rest }: DatePickerInputProps,
    fwdRef,
  ) => {
    const { label, timeZone } = useDatePickerContext();
    const labelId = useIdAllocator({ prefix: 'lg-date-label' });
    const descriptionId = useIdAllocator({ prefix: 'lg-date-description' });
    const errorId = useIdAllocator({ prefix: 'lg-date-description' });
    const inputId = useIdAllocator({ prefix: 'lg-date-input' });

    const handleInputClick = onClick;

    return (
      <DateFormField
        label={label}
        description={timeZone}
        inputId={inputId}
        labelId={labelId}
        descriptionId={descriptionId}
        errorId={errorId}
        ref={fwdRef}
        onInputClick={handleInputClick}
        {...rest}
      >
        <DateInputBox
          value={value}
          setValue={setValue}
          id={inputId}
          labelledBy={labelId}
          segmentRefs={segmentRefs}
        />
      </DateFormField>
    );
  },
);

DatePickerInput.displayName = 'DatePickerInput';
