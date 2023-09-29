import React, { forwardRef } from 'react';

import { DateFormField, DateInputBox } from '../../DateInput';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';

import { DateRangeInputProps } from './DateRangeInput.types';

const EN_DASH = '–';

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  (props: DateRangeInputProps) => {
    const startSegmentRefs = useSegmentRefs();
    const endSegmentRefs = useSegmentRefs();

    return (
      <DateFormField>
        <DateInputBox segmentRefs={startSegmentRefs} />
        <span>{EN_DASH}</span>
        <DateInputBox segmentRefs={endSegmentRefs} />
      </DateFormField>
    );
  },
);

DateRangeInput.displayName = 'DateRangeInput';
