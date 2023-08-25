import React from 'react';
import { padStart } from 'lodash';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { useDatePickerContext } from '../DatePickerContext/DatePickerContext';

import {
  charsPerSegment,
  defaultMax,
  defaultMin,
  defaultPlaceholder,
} from './constants';
import {
  baseStyles,
  fontSizeStyles,
  segmentSizeStyles,
  segmentThemeStyles,
  segmentWidthStyles,
} from './DateInputSegment.styles';
import { DateInputSegmentProps } from './DateInputSegment.types';

export const DateInputSegment = React.forwardRef<
  HTMLInputElement,
  DateInputSegmentProps
>(
  (
    {
      segment,
      value: controlledValue,
      min: minProp,
      max: maxProp,
      onChange,
      darkMode,
    }: DateInputSegmentProps,
    fwdRef, //: ForwardedRef<HTMLInputElement>,
  ) => {
    const min = minProp ?? defaultMin[segment];
    const max = maxProp ?? defaultMax[segment];

    const inputRef = useForwardedRef(fwdRef, null);

    const { value, handleChange } = useControlledValue(
      controlledValue?.toString(),
      onChange,
      '',
    );

    const { theme } = useDarkMode(darkMode);
    const baseFontSize = useUpdatedBaseFontSize();
    const { size } = useDatePickerContext();

    const formatValue = (val: string | undefined) =>
      val && ['', '0', '00'].includes(val)
        ? '' // If the value is any form of zero, we set it to an empty string
        : padStart(val?.toString(), charsPerSegment[segment], '0'); // otherwise, pad the string with 0s

    return (
      <input
        ref={inputRef}
        type="number"
        value={formatValue(value)}
        min={min}
        max={max}
        placeholder={defaultPlaceholder[segment]}
        onChange={handleChange}
        className={cx(
          baseStyles,
          fontSizeStyles[baseFontSize],
          segmentThemeStyles[theme],
          segmentSizeStyles[size ?? Size.Default],
          segmentWidthStyles[segment],
        )}
      />
    );
  },
);

DateInputSegment.displayName = 'DateInputSegment';
