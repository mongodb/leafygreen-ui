import React, {
  ChangeEventHandler,
  FocusEvent,
  ForwardedRef,
  KeyboardEventHandler,
} from 'react';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { useInputBoxContext } from '../InputBoxContext';
import {
  getNewSegmentValueFromArrowKeyPress,
  getNewSegmentValueFromInputValue,
  getValueFormatter,
} from '../utils';

import { getInputSegmentStyles } from './InputSegment.styles';
import {
  InputSegmentComponentType,
  InputSegmentProps,
} from './InputSegment.types';

/**
 * Generic controlled input segment component
 *
 * Renders a single input segment with configurable
 * character padding, validation, and formatting.
 *
 * @internal
 */
const InputSegmentWithRef = <Segment extends string>(
  {
    segment,
    onKeyDown,
    min, // minSegmentValue
    max, // maxSegmentValue
    className,
    onChange: onChangeProp,
    onBlur: onBlurProp,
    step = 1,
    shouldWrap = true,
    shouldSkipValidation = false,
    ...rest
  }: InputSegmentProps<Segment>,
  fwdRef: ForwardedRef<HTMLInputElement>,
) => {
  const { theme } = useDarkMode();
  const {
    onChange,
    onBlur,
    charsPerSegment: charsPerSegmentContext,
    segmentEnum,
    segmentRefs,
    segments,
    labelledBy,
    size,
    disabled,
  } = useInputBoxContext<Segment>();
  const baseFontSize = useUpdatedBaseFontSize();
  const charsPerSegment = charsPerSegmentContext[segment];
  const formatter = getValueFormatter({
    charsPerSegment,
    allowZero: min === 0,
  });
  const pattern = `[0-9]{${charsPerSegment}}`;

  const segmentRef = segmentRefs[segment];
  const mergedRef = useMergeRefs([fwdRef, segmentRef]);
  const value = segments[segment];

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
      charsPerSegment,
      defaultMin: min,
      defaultMax: max,
      segmentEnum,
      shouldSkipValidation,
    });

    const hasValueChanged = newValue !== value;

    if (hasValueChanged) {
      onChange({
        segment,
        value: newValue,
        meta: { min },
      });
    } else {
      // If the value has not changed, ensure the input value is reset
      target.value = value;
    }

    onChangeProp?.(e);
  };

  /** Handle keydown presses that don't natively fire a change event */
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    const { key, target } = e as React.KeyboardEvent<HTMLInputElement> & {
      target: HTMLInputElement;
    };

    // A key press can be an `arrow`, `enter`, `space`, etc so we check for number presses
    // We also check for `space` because Number(' ') returns true
    const isNumber = Number(key) && key !== keyMap.Space;

    if (isNumber) {
      // if the value length is equal to the maxLength, reset the input. This will clear the input and the number will be inserted into the input when onChange is called.

      if (target.value.length === charsPerSegment) {
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
          step,
          shouldWrap: shouldWrap,
        });
        const valueString = formatter(newValue);

        /** Fire a custom change event when the up/down arrow keys are pressed */
        onChange({
          segment,
          value: valueString,
          meta: { key, min },
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
            meta: { key, min },
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
            meta: { key, min },
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
    onBlurProp?.(e);
  };

  // Note: Using a text input with pattern attribute due to Firefox
  // stripping leading zeros on number inputs - Thanks @matt-d-rat
  // Number inputs also don't support the `selectionStart`/`End` API
  return (
    <>
      <input
        {...rest}
        aria-labelledby={labelledBy}
        aria-label={String(segment)}
        id={String(segment)}
        ref={mergedRef}
        type="text"
        pattern={pattern}
        role="spinbutton"
        value={value}
        min={min}
        max={max}
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

export const InputSegment = React.forwardRef(
  InputSegmentWithRef,
) as InputSegmentComponentType;

InputSegment.displayName = 'InputSegment';
