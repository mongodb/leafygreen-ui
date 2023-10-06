import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { useDatePickerContext } from '../../DatePickerContext';
import { getValueFormatter } from '../../utils';

import { defaultMax, defaultMin, defaultPlaceholder } from './constants';
import {
  baseStyles,
  fontSizeStyles,
  segmentSizeStyles,
  segmentThemeStyles,
  segmentWidthStyles,
} from './DateInputSegment.styles';
import { DateInputSegmentProps } from './DateInputSegment.types';

/**
 * Renders a single date segment with the
 * appropriate character padding/truncation.
 *
 * Only fires a change handler when the input is blurred
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
      darkMode,
      ...rest
    }: DateInputSegmentProps,
    fwdRef,
  ) => {
    const min = minProp ?? defaultMin[segment];
    const max = maxProp ?? defaultMax[segment];

    const inputRef = useForwardedRef(fwdRef, null);

    const { theme } = useDarkMode(darkMode);
    const baseFontSize = useUpdatedBaseFontSize();
    const { size, disabled } = useDatePickerContext();

    const formatValue = useMemo(() => getValueFormatter(segment), [segment]);

    // internally, keep track of the input value
    const [internalValue, setInternalValue] = useState<string>(
      formatValue(value),
    );

    // If the value changes externally, update the internal value
    useEffect(() => {
      setInternalValue(formatValue(value));
    }, [formatValue, value]);

    // On input element change, we update the internal value
    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
      setInternalValue(e.target.value);
    };

    // When the user un-focuses the element, then we fire the change handler
    const handleBlur: FocusEventHandler<HTMLInputElement> = e => {
      const formattedValue = formatValue(internalValue);

      // If the value has changed, call the change handler
      if (formattedValue !== formatValue(value)) {
        onChange?.(formattedValue);
      }

      onBlur?.(e);
    };

    return (
      <input
        {...rest}
        aria-label={segment}
        id={segment}
        ref={inputRef}
        type="number"
        role="spinbutton"
        value={internalValue}
        min={min}
        max={max}
        placeholder={defaultPlaceholder[segment]}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
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
