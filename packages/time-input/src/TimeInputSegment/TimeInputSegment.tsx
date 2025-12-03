import React from 'react';

import { InputSegment } from '@leafygreen-ui/input-box';

import {
  defaultPlaceholder,
  getDefaultMax,
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
      maxSegmentValue={getDefaultMax(shouldShowSelect)[segment]}
      placeholder={defaultPlaceholder[segment]}
      // className={cx(segmentWidthStyles[segment])}
      // data-lgid
      data-testid="lg-time_input_input-segment" // TODO: temp
      charsCount={getTimeSegmentRules(shouldShowSelect)[segment].maxChars}
      autoComplete="off"
    />
  );
});

TimeInputSegment.displayName = 'TimeInputSegment';
