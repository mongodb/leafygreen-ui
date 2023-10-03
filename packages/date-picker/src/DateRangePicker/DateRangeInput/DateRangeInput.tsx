import React, { forwardRef, MouseEventHandler } from 'react';

import { DateInputBox } from '../../DateInput';
import { DateFormField } from '../../DateInput/DateFormField';
import { useDatePickerContext } from '../../DatePickerContext';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';
import { getRangeSegmentToFocus } from '../utils/getRangeSegmentToFocus';

import { inputWrapperStyles } from './DateRangeInput.styles';
import { DateRangeInputProps } from './DateRangeInput.types';

const EN_DASH = '–';

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  (_props: DateRangeInputProps, fwdRef) => {
    const { disabled, formatParts, setOpen } = useDatePickerContext();

    const startSegmentRefs = useSegmentRefs();
    const endSegmentRefs = useSegmentRefs();

    /** Called when the input, or any of its children, is clicked */
    const handleInputClick: MouseEventHandler<HTMLElement> = ({ target }) => {
      if (!disabled) {
        setOpen(true);
      }

      const segmentToFocus = getRangeSegmentToFocus({
        target,
        formatParts,
        segmentRefs: [startSegmentRefs, endSegmentRefs],
      });

      segmentToFocus?.focus();
    };

    return (
      <DateFormField ref={fwdRef} onInputClick={handleInputClick}>
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
