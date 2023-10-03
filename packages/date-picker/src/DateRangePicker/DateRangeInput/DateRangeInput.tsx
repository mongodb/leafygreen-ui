import React, { forwardRef } from 'react';

import { DateInputBox } from '../../DateInput';
import { DateFormField } from '../../DateInput/DateFormField';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';

import { inputWrapperStyles } from './DateRangeInput.styles';
import { DateRangeInputProps } from './DateRangeInput.types';

const EN_DASH = '–';

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  (_props: DateRangeInputProps, fwdRef) => {
    // const {
    //   label,
    //   description,
    //   isOpen,
    //   menuId,
    //   // formatParts, disabled, setOpen, setIsDirty
    // } = useDatePickerContext();

    const startSegmentRefs = useSegmentRefs();
    const endSegmentRefs = useSegmentRefs();

    return (
      <DateFormField ref={fwdRef}>
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
