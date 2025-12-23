import React from 'react';

import { InputBox } from '@leafygreen-ui/input-box';

import { useTimeInputDisplayContext } from '../Context';
import { TimeSegment } from '../shared.types';
import { TimeInputSegment } from '../TimeInputSegment/TimeInputSegment';
import { getTimeSegmentRules } from '../utils';

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
