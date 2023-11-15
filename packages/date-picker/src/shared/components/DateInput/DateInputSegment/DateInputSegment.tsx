import React, {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent, keyMap, rollover } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  charsPerSegment,
  defaultMax,
  defaultMin,
  defaultPlaceholder,
} from '../../../constants';
import { useDatePickerContext } from '../../DatePickerContext';

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
      onKeyDown,
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
    const pattern = `[0-9]{${charsPerSegment.year}}`;

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
      const { target } = e;
      const numericValue = Number(target.value);

      if (!isNaN(numericValue)) {
        onChange?.(e);
      }
    };

    /** Synthetically fire ChangeEvents when the up/down arrow keys are pressed */
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
      const { key, target, ...rest } =
        e as React.KeyboardEvent<HTMLInputElement> & {
          target: HTMLInputElement;
        };

      if (key === keyMap.ArrowUp || key === keyMap.ArrowDown) {
        e.preventDefault();
        const valueDiff = key === keyMap.ArrowUp ? 1 : -1;

        const initialValue = value
          ? Number(value)
          : key === keyMap.ArrowUp
          ? max
          : min;

        const newValue = rollover(initialValue + valueDiff, min, max);
        const valueString = newValue.toString();

        target.value = valueString;
        const nativeEvent = new Event('change', { ...rest });
        const changeEvent = createSyntheticEvent<ChangeEvent<HTMLInputElement>>(
          nativeEvent,
          target,
        );
        onChange?.(changeEvent);
      }

      onKeyDown?.(e);
    };

    // Note: Using a text input with pattern attribute due to Firefox
    // stripping leading zeros on number inputs - Thanks @matt-d-rat
    // Number inputs also don't support the `selectionStart`/`End` API
    return (
      <input
        {...rest}
        aria-label={segment}
        id={segment}
        ref={inputRef}
        type="text"
        pattern={pattern}
        role="spinbutton"
        value={value}
        min={min}
        max={max}
        placeholder={defaultPlaceholder[segment]}
        onChange={handleChange}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        data-testid="lg-date_picker_input-segment"
        data-segment={segment}
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
