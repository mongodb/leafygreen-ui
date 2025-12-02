import React from 'react';

import { InputSegment } from '@leafygreen-ui/input-box';

import {
  defaultMax,
  defaultPlaceholder,
  getDefaultMin,
  getTimeSegmentRules,
} from '../constants';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';

import { TimeInputSegmentProps } from './TimeInputSegment.types';

export const TimeInputSegment = React.forwardRef<
  HTMLInputElement,
  TimeInputSegmentProps
>(({ children, segment, ...rest }: TimeInputSegmentProps, fwdRef) => {
  const { shouldShowSelect } = useTimeInputDisplayContext();
  return (
    <InputSegment
      {...rest}
      ref={fwdRef}
      segment={segment}
      minSegmentValue={getDefaultMin(shouldShowSelect)[segment]}
      maxSegmentValue={defaultMax[segment]}
      placeholder={defaultPlaceholder[segment]}
      // className={cx(segmentWidthStyles[segment])}
      // data-testid="lg-date_picker_input-segment"
      charsCount={getTimeSegmentRules(shouldShowSelect)[segment].maxChars}
      autoComplete="off"
    />
  );
});

TimeInputSegment.displayName = 'TimeInputSegment';
