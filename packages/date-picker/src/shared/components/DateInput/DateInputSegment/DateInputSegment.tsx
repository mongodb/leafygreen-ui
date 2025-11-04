import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { InputSegment } from '@leafygreen-ui/input-box';

import { defaultMax, defaultMin, defaultPlaceholder } from '../../../constants';
import { useSharedDatePickerContext } from '../../../context';
import { DateSegment } from '../../../types';
import {
  getAutoComplete,
  getMaxSegmentValue,
  getMinSegmentValue,
} from '../../../utils';
import { useDateInputBoxContext } from '../DateInputBoxContext';

import { segmentWidthStyles } from './DateInputSegment.styles';
import { DateInputSegmentProps } from './DateInputSegment.types';

/**
 * Controlled component
 *
 * Renders a single date segment with the
 * appropriate character padding/truncation.
 *
 *
 * @internal
 */
export const DateInputSegment = React.forwardRef<
  HTMLInputElement,
  DateInputSegmentProps
>(({ segment, ...rest }: DateInputSegmentProps, fwdRef) => {
  const {
    autoComplete: autoCompleteProp,
    min: minContextProp,
    max: maxContextProp,
  } = useSharedDatePickerContext();

  const { value } = useDateInputBoxContext();
  const min =
    getMinSegmentValue(segment, { date: value, min: minContextProp }) ??
    defaultMin[segment];
  const max =
    getMaxSegmentValue(segment, { date: value, max: maxContextProp }) ??
    defaultMax[segment];

  const autoComplete = getAutoComplete(autoCompleteProp, segment);

  const shouldRollover = !([DateSegment.Year] as Array<DateSegment>).includes(
    segment,
  );

  const shouldSkipValidation = (
    [DateSegment.Year] as Array<DateSegment>
  ).includes(segment);

  return (
    <InputSegment
      {...rest}
      ref={fwdRef}
      segment={segment}
      min={min}
      max={max}
      placeholder={defaultPlaceholder[segment]}
      autoComplete={autoComplete}
      className={cx(segmentWidthStyles[segment])}
      data-testid="lg-date_picker_input-segment"
      shouldRollover={shouldRollover}
      shouldSkipValidation={shouldSkipValidation}
      step={1}
    />
  );
});

DateInputSegment.displayName = 'DateInputSegment';
