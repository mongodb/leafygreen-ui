import React from 'react';

import { InputBox } from '@leafygreen-ui/input-box';

import { getTimeSegmentRules } from '../constants';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { TimeInputSegment } from '../TimeInputSegment/TimeInputSegment';
import { TimeSegments } from '../TimeInputSegment/TimeInputSegment.types';

import { TimeInputBoxProps } from './TimeInputBox.types';

export const TimeInputBox = React.forwardRef<HTMLDivElement, TimeInputBoxProps>(
  ({ children, ...rest }: TimeInputBoxProps, fwdRef) => {
    const { disabled, formatParts, size, shouldShowSelect } =
      useTimeInputDisplayContext();
    return (
      <InputBox
        ref={fwdRef}
        segmentEnum={TimeSegments}
        segmentRules={getTimeSegmentRules(shouldShowSelect)}
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
