import React from 'react';
import { TimeInputBoxProps } from './TimeInputBox.types';

import { InputBox } from '@leafygreen-ui/input-box';
import { TimeSegments } from '../TimeInputSegment/TimeInputSegment.types';
import { timeSegmentRules } from '../constants';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { TimeInputSegment } from '../TimeInputSegment/TimeInputSegment';

export const TimeInputBox = React.forwardRef<HTMLDivElement, TimeInputBoxProps>(
  ({ children, ...rest }: TimeInputBoxProps, fwdRef) => {
    const { disabled, formatParts, size } = useTimeInputDisplayContext();
    return (
      <InputBox
        ref={fwdRef}
        segmentEnum={TimeSegments}
        segmentRules={timeSegmentRules}
        disabled={disabled}
        segmentComponent={TimeInputSegment}
        size={size}
        formatParts={formatParts}
        {...rest}
      />
    );
  },
);

TimeInputBox.displayName = 'TimeInputBox';
