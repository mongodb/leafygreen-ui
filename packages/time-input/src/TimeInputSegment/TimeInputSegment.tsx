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
  const { is12HourFormat } = useTimeInputDisplayContext();

  return (
    <InputSegment
      {...rest}
      ref={fwdRef}
      segment={segment}
      minSegmentValue={getDefaultMin({ is12HourFormat })[segment]}
      maxSegmentValue={getDefaultMax({ is12HourFormat })[segment]}
      placeholder={defaultPlaceholder[segment]}
      // TODO: className={cx(segmentWidthStyles[segment])}
      // TODO: data-lgid
      data-testid="lg-time_input_input-segment" // TODO: temp
      charsCount={getTimeSegmentRules({ is12HourFormat })[segment].maxChars}
      autoComplete="off"
    />
  );
});

TimeInputSegment.displayName = 'TimeInputSegment';
