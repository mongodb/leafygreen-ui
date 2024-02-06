import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  charsPerSegment,
  defaultMax,
  defaultMin,
  defaultPlaceholder,
} from '../../../constants';
import { useSharedDatePickerContext } from '../../../context';
import { getAutoComplete, getValueFormatter } from '../../../utils';

import { getNewSegmentValueFromArrowKeyPress } from './utils/getNewSegmentValueFromArrowKeyPress/getNewSegmentValueFromArrowKeyPress';
import {
  baseStyles,
  fontSizeStyles,
  segmentSizeStyles,
  segmentThemeStyles,
  segmentWidthStyles,
} from './DateInputSegment.styles';
import { DateInputSegmentProps } from './DateInputSegment.types';
import { getNewSegmentValueFromInputValue } from './utils';

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
    const {
      size,
      disabled,
      autoComplete: autoCompleteProp,
    } = useSharedDatePickerContext();
    const formatter = getValueFormatter(segment);
    const autoComplete = getAutoComplete(autoCompleteProp, segment);
    const pattern = `[0-9]{${charsPerSegment[segment]}}`;

    /**
     * Receives native input events,
     * determines whether the input value is valid and should change,
     * and fires a custom `DateInputSegmentChangeEvent`.
     */
    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
      const { target } = e;

      console.log('handleChange🥕');

      const newValue = getNewSegmentValueFromInputValue(
        segment,
        value,
        target.value,
      );

      const hasValueChanged = newValue !== value;

      if (hasValueChanged) {
        onChange({
          segment,
          value: newValue,
        });
      } else {
        // If the value has not changed, ensure the input value is reset
        target.value = value;
      }
    };

    /** Handle keydown presses that don't natively fire a change event */
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
      console.log('handleKeyDown🍊');
      const { key, target } = e as React.KeyboardEvent<HTMLInputElement> & {
        target: HTMLInputElement;
      };

      // if a number is pressed and the value length is equal to the charsPerSegment, reset the input
      if (Number(key) && key !== keyMap.Space) {
        if (target.value.length === charsPerSegment[segment]) {
          target.value = '';
        }
      }

      switch (key) {
        case keyMap.ArrowUp:
        case keyMap.ArrowDown: {
          e.preventDefault();

          const newValue = getNewSegmentValueFromArrowKeyPress({
            key,
            value,
            min,
            max,
            segment,
          });
          const valueString = formatter(newValue);

          /** Fire a custom change event when the up/down arrow keys are pressed */
          onChange({
            segment,
            value: valueString,
            meta: { key },
          });
          break;
        }

        case keyMap.Backspace: {
          // e.preventDefault();

          const preVal = target.value;

          // reset the input on backspace
          target.value = '';

          /** Fire a custom change event when the backspace key is pressed */
          onChange({
            segment,
            value: '',
            meta: { key },
          });

          // Prevent the onKeyDown handler inside DatePickerInput from firing. Because we reset the value on backspace, that will trigger the previous segment to focus but we want the focus to remain inside the current segment.
          if (preVal) {
            e.stopPropagation();
          }

          break;
        }

        // TODO: test space key
        case keyMap.Space: {
          e.preventDefault();

          // reset the input on space
          target.value = '';

          /** Fire a custom change event when the space key is pressed */
          onChange({
            segment,
            value: '',
            meta: { key },
          });

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
        autoComplete={autoComplete}
      />
    );
  },
);

DateInputSegment.displayName = 'DateInputSegment';
