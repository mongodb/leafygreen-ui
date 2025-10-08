import React, {
  ChangeEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
} from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  baseStyles,
  fontSizeStyles,
  segmentSizeStyles,
  segmentThemeStyles,
} from './InputSegment.styles';
import {
  InputSegmentComponentType,
  InputSegmentProps,
} from './InputSegment.types';
import { getValueFormatter } from '../../utils';
import {
  getNewSegmentValueFromInputValue,
  getNewSegmentValueFromArrowKeyPress,
} from './utils';

/**
 * Generic controlled input segment component
 *
 * Renders a single input segment with configurable
 * character padding, validation, and formatting.
 *
 * @internal
 */
// export const InputSegment = React.forwardRef<
//   HTMLInputElement,
//   InputSegmentProps<any> //TODO: fix this </any>. This is a generic forwardRef
// >(
//   (
//     {
//       segment,
//       value,
//       onChange,
//       onBlur,
//       onKeyDown,
//       size: sizeProp,
//       charsPerSegment,
//       min,
//       max,
//       size,
//       className,
//       ...rest
//     }: InputSegmentProps<any>,
//     fwdRef,
//   ) => {
//     const { theme } = useDarkMode();
//     const baseFontSize = useUpdatedBaseFontSize();
//     const formatter = getValueFormatter(segment, charsPerSegment);
//     const pattern = `[0-9]{${charsPerSegment[segment]}}`;

//     /**
//      * Receives native input events,
//      * determines whether the input value is valid and should change,
//      * and fires a custom `InputSegmentChangeEvent`.
//      */
//     const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
//       const { target } = e;

//       const newValue = getNewSegmentValueFromInputValue(
//         segment,
//         value,
//         target.value,
//       );

//       const hasValueChanged = newValue !== value;

//       if (hasValueChanged) {
//         onChange({
//           segment,
//           value: newValue,
//         });
//       } else {
//         // If the value has not changed, ensure the input value is reset
//         target.value = value;
//       }
//     };

//     /** Handle keydown presses that don't natively fire a change event */
//     const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
//       const { key, target } = e as React.KeyboardEvent<HTMLInputElement> & {
//         target: HTMLInputElement;
//       };

//       // A key press can be an `arrow`, `enter`, `space`, etc so we check for number presses
//       // We also check for `space` because Number(' ') returns true
//       const isNumber = Number(key) && key !== keyMap.Space;

//       if (isNumber) {
//         // if the value length is equal to the maxLength, reset the input
//         if (target.value.length === charsPerSegment[segment]) {
//           target.value = '';
//         }
//       }

//       switch (key) {
//         case keyMap.ArrowUp:
//         case keyMap.ArrowDown: {
//           e.preventDefault();

//           const newValue = getNewSegmentValueFromArrowKeyPress({
//             key,
//             value,
//             min,
//             max,
//             segment,
//           });
//           const valueString = formatter(newValue);

//           /** Fire a custom change event when the up/down arrow keys are pressed */
//           onChange({
//             segment,
//             value: valueString,
//             meta: { key },
//           });
//           break;
//         }

//         // On backspace the value is reset
//         case keyMap.Backspace: {
//           // Don't fire change event if the input is initially empty
//           if (value) {
//             // Stop propagation to prevent parent handlers from firing
//             e.stopPropagation();

//             /** Fire a custom change event when the backspace key is pressed */
//             onChange({
//               segment,
//               value: '',
//               meta: { key },
//             });
//           }

//           break;
//         }

//         // On space the value is reset
//         case keyMap.Space: {
//           e.preventDefault();

//           // Don't fire change event if the input is initially empty
//           if (value) {
//             /** Fire a custom change event when the space key is pressed */
//             onChange({
//               segment,
//               value: '',
//               meta: { key },
//             });
//           }

//           break;
//         }

//         default: {
//           break;
//         }
//       }

//       onKeyDown?.(e);
//     };

//     // Note: Using a text input with pattern attribute due to Firefox
//     // stripping leading zeros on number inputs - Thanks @matt-d-rat
//     // Number inputs also don't support the `selectionStart`/`End` API
//     return (
//       <input
//         {...rest}
//         aria-label={String(segment)}
//         id={String(segment)}
//         ref={fwdRef}
//         type="text"
//         pattern={pattern}
//         role="spinbutton"
//         value={value}
//         min={min}
//         max={max}
//         onChange={handleChange}
//         onBlur={onBlur}
//         onKeyDown={handleKeyDown}
//         data-segment={String(segment)}
//         className={cx(
//           baseStyles,
//           fontSizeStyles[baseFontSize],
//           segmentThemeStyles[theme],
//           segmentSizeStyles[size],
//           className,
//         )}
//       />
//     );
//   },
// );

const InputSegmentWithRef = <T extends string, V extends string>(
  {
    segment,
    value,
    onChange,
    onBlur,
    onKeyDown,
    size: sizeProp,
    charsPerSegment,
    min,
    max,
    size,
    className,
    segmentObj,
    defaultMin,
    defaultMax,
    ...rest
  }: InputSegmentProps<T, V>,
  fwdRef: ForwardedRef<HTMLInputElement>,
) => {
  const { theme } = useDarkMode();
  const baseFontSize = useUpdatedBaseFontSize();
  const formatter = getValueFormatter(segment, charsPerSegment);
  const pattern = `[0-9]{${charsPerSegment[segment]}}`;

  /**
   * Receives native input events,
   * determines whether the input value is valid and should change,
   * and fires a custom `InputSegmentChangeEvent`.
   */
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { target } = e;

    const newValue = getNewSegmentValueFromInputValue(
      segment,
      value,
      target.value,
      charsPerSegment,
      defaultMin,
      defaultMax,
      segmentObj,
    );

    const hasValueChanged = newValue !== value;

    if (hasValueChanged) {
      onChange({
        segment,
        value: newValue as V,
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

    // A key press can be an `arrow`, `enter`, `space`, etc so we check for number presses
    // We also check for `space` because Number(' ') returns true
    const isNumber = Number(key) && key !== keyMap.Space;

    if (isNumber) {
      // if the value length is equal to the maxLength, reset the input
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
          value: valueString as V,
          meta: { key },
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
            value: '' as V,
            meta: { key },
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
            value: '' as V,
            meta: { key },
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

  // Note: Using a text input with pattern attribute due to Firefox
  // stripping leading zeros on number inputs - Thanks @matt-d-rat
  // Number inputs also don't support the `selectionStart`/`End` API
  return (
    <input
      {...rest}
      aria-label={String(segment)}
      id={String(segment)}
      ref={fwdRef}
      type="text"
      pattern={pattern}
      role="spinbutton"
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      data-segment={String(segment)}
      className={cx(
        baseStyles,
        fontSizeStyles[baseFontSize],
        segmentThemeStyles[theme],
        segmentSizeStyles[size],
        className,
      )}
    />
  );
};

export const InputSegment = React.forwardRef(
  InputSegmentWithRef,
) as InputSegmentComponentType;

InputSegment.displayName = 'InputSegment';
