import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { InputSegment } from '@leafygreen-ui/input-box';

import {
  charsPerSegment,
  defaultMax,
  defaultMin,
  defaultPlaceholder,
} from '../../../constants';
import { useSharedDatePickerContext } from '../../../context';
import { DateSegment } from '../../../types';
import { getAutoComplete } from '../../../utils';

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
>(
  (
    {
      segment,
      value,
      min: minProp,
      max: maxProp,
      onChange,
      onBlur,
      onKeyDown,
      ...rest
    }: DateInputSegmentProps,
    fwdRef,
  ) => {
    const min = minProp ?? defaultMin[segment];
    const max = maxProp ?? defaultMax[segment];

    const {
      size,
      disabled,
      autoComplete: autoCompleteProp,
    } = useSharedDatePickerContext();

    const autoComplete = getAutoComplete(autoCompleteProp, segment);

    const shouldNotRollover = (
      [DateSegment.Year] as Array<DateSegment>
    ).includes(segment);

    const shouldSkipValidation = (
      [DateSegment.Year] as Array<DateSegment>
    ).includes(segment);

    return (
      <InputSegment
        ref={fwdRef}
        segment={segment}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        min={min}
        max={max}
        placeholder={defaultPlaceholder[segment]}
        // TODO:
        // @ts-expect-error
        size={size}
        charsPerSegment={charsPerSegment[segment]}
        autoComplete={autoComplete}
        className={cx(segmentWidthStyles[segment])}
        disabled={disabled}
        data-testid="lg-date_picker_input-segment"
        segmentObj={DateSegment}
        shouldNotRollover={shouldNotRollover}
        shouldSkipValidation={shouldSkipValidation}
        {...rest}
      />
    );
  },
);

DateInputSegment.displayName = 'DateInputSegment';
