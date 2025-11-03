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
import {
  getAutoComplete,
  getMaxSegmentValue,
  getMinSegmentValue,
} from '../../../utils';

import { segmentWidthStyles } from './DateInputSegment.styles';
import { DateInputSegmentProps } from './DateInputSegment.types';
import { useDateInputBoxContext } from '../DateInputBox/DateInputBoxContext';

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
      // value, // TODO: will be read from date input boxcontext
      // min: minProp, // TODO: will be generated from context
      // max: maxProp, // TODO: will be generated from context
      // onChange, // TODO: will be read from context
      // onBlur, // TODO: will be read from context
      ...rest
    }: DateInputSegmentProps,
    fwdRef,
  ) => {
    const {
      size,
      disabled,
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
        // value={value} // TODO: will be read from context
        // onChange={onChange} // TODO: will be read from context
        // onBlur={onBlur} // TODO: will be read from context
        min={min}
        max={max}
        placeholder={defaultPlaceholder[segment]}
        // TODO: Type 'number | Size' is not assignable to type 'Size'. Unsure why the size is a number.
        // @ts-expect-error
        size={size}
        // charsPerSegment={charsPerSegment[segment]} // TODO: will be read from context
        autoComplete={autoComplete}
        className={cx(segmentWidthStyles[segment])}
        disabled={disabled}
        data-testid="lg-date_picker_input-segment"
        // segmentEnum={DateSegment} // TODO: will be read from context
        shouldRollover={!shouldNotRollover}
        shouldSkipValidation={shouldSkipValidation}
        {...rest}
      />
    );
  },
);

DateInputSegment.displayName = 'DateInputSegment';
