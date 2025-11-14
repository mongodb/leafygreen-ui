import React, {
  ChangeEventHandler,
  FocusEvent,
  ForwardedRef,
  KeyboardEventHandler,
} from 'react';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import { Size } from '../shared.types';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  getNewSegmentValueFromArrowKeyPress,
  getNewSegmentValueFromInputValue,
  getValueFormatter,
  isSingleDigit,
} from '../utils';

import { getInputSegmentStyles } from './InputSegment.styles';
import {
  InputSegmentComponentType,
  InputSegmentProps,
} from './InputSegment.types';

const InputSegmentWithRef = <Segment extends string>(
  {
    segment,
    onKeyDown,
    minSegmentValue,
    maxSegmentValue,
    className,
    onChange,
    onBlur,
    segmentEnum,
    disabled,
    value,
    charsCount,
    size = Size.Default,
    step = 1,
    shouldWrap = true,
    shouldValidate = true,
    ...rest
  }: InputSegmentProps<Segment>,
  fwdRef: ForwardedRef<HTMLInputElement>,
) => {
  const { theme } = useDarkMode();
  const baseFontSize = useUpdatedBaseFontSize();
  const formatter = getValueFormatter({
    charsPerSegment: charsCount,
    allowZero: minSegmentValue === 0,
  });
  const pattern = `[0-9]{${charsCount}}`;

  /**
   * Receives native input events,
   * determines whether the input value is valid and should change,
   * and fires a custom `InputSegmentChangeEvent`.
   */
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { target } = e;

    const newValue = getNewSegmentValueFromInputValue({
      segmentName: segment,
      currentValue: value,
      incomingValue: target.value,
      charsPerSegment: charsCount,
      defaultMin: minSegmentValue,
      defaultMax: maxSegmentValue,
      segmentEnum,
      shouldValidate,
    });

    const hasValueChanged = newValue !== value;

    if (hasValueChanged) {
      onChange({
        segment,
        value: newValue,
        meta: { min: minSegmentValue },
      });
    } else {
      // If the value has not changed, ensure the input value is reset
      target.value = value;
    }
  };

  /** Handle keydown presses that don't natively fire a change event */
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    const { key, target } = e as React.KeyboardEvent<HTMLInputElement> & {
      target: HTMLInputElement;
    };

    // If the value is a single digit, we check if the input is full and reset it if it is. The digit will be inserted into the input when onChange is called.
    // This is to handle the case where the user tries to type a single digit when the input is already full. Usually this happens when the focus is moved to the next segment or a segment is clicked
    if (isSingleDigit(key)) {
      if (target.value.length === charsCount) {
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
          min: minSegmentValue,
          max: maxSegmentValue,
          step,
          shouldWrap,
        });
        const valueString = formatter(newValue);

        /** Fire a custom change event when the up/down arrow keys are pressed */
        onChange({
          segment,
          value: valueString,
          meta: { key, min: minSegmentValue },
        });
        break;
      }

      // On backspace the value is reset
      case keyMap.Backspace: {
        // Don't fire change event if the input is initially empty
        if (value) {
          // Stop propagation to prevent parent handlers from firing
          e.stopPropagation();

          /** Fire a custom change event when the backspace key is pressed */
          onChange({
            segment,
            value: '',
            meta: { key, min: minSegmentValue },
          });
        }

        break;
      }

      // On space the value is reset
      case keyMap.Space: {
        e.preventDefault();

        // Don't fire change event if the input is initially empty
        if (value) {
          /** Fire a custom change event when the space key is pressed */
          onChange({
            segment,
            value: '',
            meta: { key, min: minSegmentValue },
          });
        }

        break;
      }

      default: {
        break;
      }
    }

    onKeyDown?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  // Note: Using a text input with pattern attribute due to Firefox
  // stripping leading zeros on number inputs - Thanks @matt-d-rat
  // Number inputs also don't support the `selectionStart`/`End` API
  return (
    <>
      <input
        {...rest}
        aria-label={String(segment)}
        id={String(segment)}
        ref={fwdRef}
        type="text"
        pattern={pattern}
        role="spinbutton"
        value={value}
        min={minSegmentValue}
        max={maxSegmentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        data-segment={String(segment)}
        disabled={disabled}
        className={getInputSegmentStyles({
          className,
          baseFontSize,
          theme,
          size,
        })}
      />
      <VisuallyHidden aria-live="polite" aria-atomic="true">
        {value && `${segment} ${value}`}
      </VisuallyHidden>
    </>
  );
};

/**
 * Generic controlled input segment component to be used within the InputBox component.
 *
 * This component renders a single input segment from an array of format parts (typically `Intl.DateTimeFormatPart`)
 * passed to the InputBox component. It is designed primarily for date and time input segments, where each segment
 * represents a distinct part of the date/time format (e.g., month, day, year, hour, minute).
 *
 * Each segment is configurable with character padding, validation, and formatting rules.
 *
 * @example
 * // Used internally by InputBox to render segments from formatParts:
 *
 * // Date format:
 * // [
 * //   { type: 'month', value: '02' },
 * //   { type: 'literal', value: '-' },
 * //   { type: 'day', value: '02' },
 * //   { type: 'literal', value: '-' },
 * //   { type: 'year', value: '2025' },
 * // ]
 *
 * // Time format:
 * // [
 * //   { type: 'hour', value: '14' },
 * //   { type: 'literal', value: ':' },
 * //   { type: 'minute', value: '30' },
 * //   { type: 'literal', value: ':' },
 * //   { type: 'second', value: '45' },
 * // ]
 */
export const InputSegment = React.forwardRef(
  InputSegmentWithRef,
) as InputSegmentComponentType;

InputSegment.displayName = 'InputSegment';
