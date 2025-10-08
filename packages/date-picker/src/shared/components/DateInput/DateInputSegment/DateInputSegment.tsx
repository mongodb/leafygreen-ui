import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import {
  charsPerSegment,
  defaultMax,
  defaultMin,
  defaultPlaceholder,
} from '../../../constants';
import { useSharedDatePickerContext } from '../../../context';
import { getAutoComplete } from '../../../utils';

import { segmentWidthStyles } from './DateInputSegment.styles';
import { DateInputSegmentProps } from './DateInputSegment.types';
import { InputSegment } from '../../InputSegment/InputSegment';
import { InputSegmentChangeEvent } from '../../InputSegment/InputSegment.types';
import { DateSegment, DateSegmentValue } from '../../../types';
import { Size } from '@leafygreen-ui/tokens';

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

    // const inputRef = useForwardedRef(fwdRef, null); // TODO: do we need this?

    // const { theme } = useDarkMode();
    // const baseFontSize = useUpdatedBaseFontSize();
    const {
      size,
      disabled,
      autoComplete: autoCompleteProp,
    } = useSharedDatePickerContext();
    // const formatter = getValueFormatter(segment, charsPerSegment);
    const autoComplete = getAutoComplete(autoCompleteProp, segment);
    // const pattern = `[0-9]{${charsPerSegment[segment]}}`;

    const handleChange = (
      inputSegmentChangeEvent: InputSegmentChangeEvent<
        DateSegment,
        DateSegmentValue
      >,
    ) => {
      onChange(inputSegmentChangeEvent);
    };

    // /**
    //  * Receives native input events,
    //  * determines whether the input value is valid and should change,
    //  * and fires a custom `DateInputSegmentChangeEvent`.
    //  */
    // const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    //   const { target } = e;

    //   const newValue = getNewSegmentValueFromInputValue(
    //     segment,
    //     value,
    //     target.value,
    //     // TODO: pass pattern here
    //   );

    //   const hasValueChanged = newValue !== value;

    //   if (hasValueChanged) {
    //     onChange({
    //       segment,
    //       value: newValue,
    //     });
    //   } else {
    //     // If the value has not changed, ensure the input value is reset
    //     target.value = value;
    //   }
    // };

    // /** Handle keydown presses that don't natively fire a change event */
    // const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    //   const { key, target } = e as React.KeyboardEvent<HTMLInputElement> & {
    //     target: HTMLInputElement;
    //   };

    //   // A key press can be an `arrow`, `enter`, `space`, etc so we check for number presses
    //   // We also check for `space` because Number(' ') returns true
    //   const isNumber = Number(key) && key !== keyMap.Space;

    //   if (isNumber) {
    //     // if the value length is equal to the charsPerSegment, reset the input
    //     if (target.value.length === charsPerSegment[segment]) {
    //       target.value = '';
    //     }
    //   }

    //   switch (key) {
    //     case keyMap.ArrowUp:
    //     case keyMap.ArrowDown: {
    //       e.preventDefault();

    //       const newValue = getNewSegmentValueFromArrowKeyPress({
    //         key,
    //         value,
    //         min,
    //         max,
    //         segment,
    //       });
    //       const valueString = formatter(newValue);

    //       /** Fire a custom change event when the up/down arrow keys are pressed */
    //       onChange({
    //         segment,
    //         value: valueString,
    //         meta: { key },
    //       });
    //       break;
    //     }

    //     // On backspace the value is reset
    //     case keyMap.Backspace: {
    //       // Don't fire change event if the input is initially empty
    //       if (value) {
    //         // Prevent the onKeyDown handler inside `DatePickerInput` from firing. Because we reset the value on backspace, that will trigger the previous segment to focus but we want the focus to remain inside the current segment.
    //         e.stopPropagation();

    //         /** Fire a custom change event when the backspace key is pressed */
    //         onChange({
    //           segment,
    //           value: '',
    //           meta: { key },
    //         });
    //       }

    //       break;
    //     }

    //     // On space the value is reset
    //     case keyMap.Space: {
    //       e.preventDefault();

    //       // Don't fire change event if the input is initially empty
    //       if (value) {
    //         /** Fire a custom change event when the space key is pressed */
    //         onChange({
    //           segment,
    //           value: '',
    //           meta: { key },
    //         });
    //       }

    //       break;
    //     }

    //     default: {
    //       break;
    //     }
    //   }

    //   onKeyDown?.(e);
    // };

    // Note: Using a text input with pattern attribute due to Firefox
    // stripping leading zeros on number inputs - Thanks @matt-d-rat
    // Number inputs also don't support the `selectionStart`/`End` API
    // return (
    //   <input
    //     {...rest}
    //     aria-label={segment}
    //     id={segment}
    //     ref={inputRef}
    //     type="text"
    //     pattern={pattern}
    //     role="spinbutton"
    //     value={value}
    //     min={min}
    //     max={max}
    //     placeholder={defaultPlaceholder[segment]}
    //     onChange={handleChange}
    //     onBlur={onBlur}
    //     onKeyDown={handleKeyDown}
    //     disabled={disabled}
    //     data-testid="lg-date_picker_input-segment"
    //     data-segment={segment}
    //     className={cx(
    //       baseStyles,
    //       fontSizeStyles[baseFontSize],
    //       segmentThemeStyles[theme],
    //       segmentSizeStyles[size ?? Size.Default],
    //       segmentWidthStyles[segment],
    //     )}
    //     autoComplete={autoComplete}
    //   />
    // );

    return (
      <InputSegment<DateSegment, DateSegmentValue>
        ref={fwdRef}
        segment={segment}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        min={min}
        max={max}
        placeholder={defaultPlaceholder[segment]}
        size={size}
        charsPerSegment={charsPerSegment}
        autoComplete={autoComplete}
        className={cx(segmentWidthStyles[segment])}
        disabled={disabled}
        data-testid="lg-date_picker_input-segment"
        defaultMin={defaultMin}
        defaultMax={defaultMax}
        segmentObj={DateSegment}
        {...rest}
      />
    );
  },
);

DateInputSegment.displayName = 'DateInputSegment';
