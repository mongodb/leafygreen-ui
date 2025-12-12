import React from 'react';

import { InputBox } from '@leafygreen-ui/input-box';

import { getTimeSegmentRules } from '../constants';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { TimeSegment } from '../shared.types';
import { TimeInputSegment } from '../TimeInputSegment/TimeInputSegment';

import { TimeInputBoxProps } from './TimeInputBox.types';

export const TimeInputBox = React.forwardRef<HTMLDivElement, TimeInputBoxProps>(
  ({ children, ...rest }: TimeInputBoxProps, fwdRef) => {
    const { disabled, formatParts, size, is12HourFormat } =
      useTimeInputDisplayContext();
    return (
      <InputBox
        ref={fwdRef}
        segmentEnum={TimeSegment}
        segmentRules={getTimeSegmentRules({ is12HourFormat })}
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
