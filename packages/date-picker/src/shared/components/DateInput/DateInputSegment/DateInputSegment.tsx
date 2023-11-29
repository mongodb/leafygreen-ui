import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap, rollover } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  charsPerSegment,
  defaultMax,
  defaultMin,
  defaultPlaceholder,
} from '../../../constants';
import { getSegmentMaxLength, getValueFormatter } from '../../../utils';
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
      ...rest
    }: DateInputSegmentProps,
    fwdRef,
  ) => {
    const min = minProp ?? defaultMin[segment];
    const max = maxProp ?? defaultMax[segment];

    const inputRef = useForwardedRef(fwdRef, null);

    const { theme } = useDarkMode();
    const baseFontSize = useUpdatedBaseFontSize();
    const { size, disabled } = useDatePickerContext();
    const formatter = getValueFormatter(segment);
    const pattern = `[0-9]{${charsPerSegment.year}}`;
    const maxLength = getSegmentMaxLength(segment);

    /** Prevent non-numeric values from triggering a change event */
    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
      const { target } = e;
      const numericValue = Number(target.value);

      if (!isNaN(numericValue)) {
        const stringValue = numericValue.toString();
        onChange?.({
          segment,
          value: stringValue,
        });
      }
    };

    /** Handle keydown presses that don't natively fire a change event */
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
      const { key } = e as React.KeyboardEvent<HTMLInputElement> & {
        target: HTMLInputElement;
      };

      switch (key) {
        case keyMap.ArrowUp:
        case keyMap.ArrowDown: {
          /** Fire a custom change event when the up/down arrow keys are pressed */

          e.preventDefault();
          const valueDiff = key === keyMap.ArrowUp ? 1 : -1;

          const initialValue = value
            ? Number(value)
            : key === keyMap.ArrowUp
            ? max
            : min;

          const newValue = rollover(initialValue + valueDiff, min, max);
          const valueString = formatter(newValue);

          onChange?.({
            segment,
            value: valueString,
            meta: { key },
          });
          break;
        }

        case keyMap.Backspace: {
          const numChars = value?.length;

          if (numChars === 1) {
            onChange?.({
              segment,
              value: '',
              meta: { key },
            });
          }
          break;
        }

        case keyMap.Space: {
          // TODO:
          break;
        }

        default: {
          break;
        }
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
        value={value ?? ''}
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
        // maxLength={maxLength}
      />
    );
  },
);

DateInputSegment.displayName = 'DateInputSegment';
