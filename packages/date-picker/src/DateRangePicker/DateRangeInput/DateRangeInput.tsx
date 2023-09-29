import React, { forwardRef } from 'react';

import { DateFormField, DateInputBox } from '../../DateInput';
import { useDatePickerContext } from '../../DatePickerContext';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';

import { inputWrapperStyles } from './DateRangeInput.styles';
import { DateRangeInputProps } from './DateRangeInput.types';

const EN_DASH = '–';

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  (props: DateRangeInputProps) => {
    const { label, description, formatParts, disabled, setOpen, setIsDirty } =
      useDatePickerContext();

    const startSegmentRefs = useSegmentRefs();
    const endSegmentRefs = useSegmentRefs();

    return (
      <DateFormField label={label} description={description}>
        <div className={inputWrapperStyles}>
          <DateInputBox segmentRefs={startSegmentRefs} />
          <span>{EN_DASH}</span>
          <DateInputBox segmentRefs={endSegmentRefs} />
        </div>
      </DateFormField>
    );
  },
);

DateRangeInput.displayName = 'DateRangeInput';
