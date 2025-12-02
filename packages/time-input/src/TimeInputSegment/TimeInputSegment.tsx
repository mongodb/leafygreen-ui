import React from 'react';
import { TimeInputSegmentProps } from './TimeInputSegment.types';

import { InputSegment } from '@leafygreen-ui/input-box';
import {
  defaultMax,
  defaultMin,
  defaultPlaceholder,
  timeSegmentRules,
} from '../constants';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';

export const TimeInputSegment = React.forwardRef<
  HTMLInputElement,
  TimeInputSegmentProps
>(({ children, segment, ...rest }: TimeInputSegmentProps, fwdRef) => {
  return (
    <InputSegment
      {...rest}
      ref={fwdRef}
      segment={segment}
      minSegmentValue={defaultMin[segment]}
      maxSegmentValue={defaultMax[segment]}
      placeholder={defaultPlaceholder[segment]}
      // className={cx(segmentWidthStyles[segment])}
      // data-testid="lg-date_picker_input-segment"
      charsCount={timeSegmentRules[segment].maxChars}
      autoComplete="off"
    />
  );
});

TimeInputSegment.displayName = 'TimeInputSegment';
