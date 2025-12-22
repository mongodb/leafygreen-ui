import React from 'react';

import { InputSegment } from '@leafygreen-ui/input-box';

import { defaultPlaceholders } from '../constants';
import { useTimeInputDisplayContext } from '../Context';
import { getDefaultMax, getDefaultMin, getTimeSegmentRules } from '../utils';

import { TimeInputSegmentProps } from './TimeInputSegment.types';

export const TimeInputSegment = React.forwardRef<
  HTMLInputElement,
  TimeInputSegmentProps
>(({ children, segment, ...rest }: TimeInputSegmentProps, fwdRef) => {
  const { is12HourFormat, lgIds } = useTimeInputDisplayContext();

  return (
    <InputSegment
      {...rest}
      ref={fwdRef}
      segment={segment}
      minSegmentValue={getDefaultMin({ is12HourFormat })[segment]}
      maxSegmentValue={getDefaultMax({ is12HourFormat })[segment]}
      placeholder={defaultPlaceholders[segment]}
      // TODO: className={cx(segmentWidthStyles[segment])}
      data-lgid={lgIds.inputSegment}
      data-testid={lgIds.inputSegment}
      charsCount={getTimeSegmentRules({ is12HourFormat })[segment].maxChars}
      autoComplete="off"
    />
  );
});

TimeInputSegment.displayName = 'TimeInputSegment';
