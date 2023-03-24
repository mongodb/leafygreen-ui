import React, { ChangeEvent, KeyboardEvent } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';

import { Arrows } from '../Arrows';
import { ErrorIcon } from '../ErrorIcon';
import { Direction, Size, State } from '../NumberInput/NumberInput.types';

import {
  inputAnimateStyles,
  inputBaseStyles,
  inputErrorAnimateStyles,
  inputThemeStyles,
  selectBaseStyles,
  sizeInputStyles,
  wrapperBaseStyles,
  wrapperClassName,
  wrapperDisabledStyles,
  wrapperHoverStyles,
  wrapperStateStyles,
  wrapperThemeStyles,
} from './Input.styles';
import { InputProps } from './Input.types';

/**
 * @internal
 */

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value: valueProp,
      onChange: onChangeProp,
      disabled = false,
      size = Size.Default,
      state = State.None,
      hasSelectOptions,
      errorMessage,
      ...rest
    }: InputProps,
    forwardRef,
  ) => {
    const inputRef = useForwardedRef<HTMLInputElement | null>(forwardRef, null);
    const { theme } = useDarkMode();

    const renderErrorIcon = state === State.Error;

    const { value, handleChange } = useControlledValue(valueProp, onChangeProp);

    /**
     * Custom arrow buttons do not trigger a change event on the input.
     * Creating a synthetic event will trigger a new change event.
     */
    const handleSyntheticEvent = () => {
      const nativeEvent = new Event('change', { bubbles: true });
      const synthEvent = createSyntheticEvent(nativeEvent, inputRef.current!);
      handleChange?.(synthEvent as ChangeEvent<HTMLInputElement>);
    };

    /**
     * Callback when up/down arrows are clicked. Triggers handleChange callback.
     */
    const handleValueChange = (value: Direction) => {
      switch (value) {
        case Direction.Increment: {
          inputRef.current?.stepUp();
          handleSyntheticEvent();
          break;
        }

        case Direction.Decrement: {
          inputRef.current?.stepDown();
          handleSyntheticEvent();
          break;
        }
      }
    };

    /**
     * Edge case if the user clicks on an arrow button then switches to keyboard click.
     * By default if focus is in the input then the keyboard clicks will work automatically but since the buttons are custom and outside of the input we are mimicking native behavior.
     */
    const handleArrowKeyDown = (e: KeyboardEvent) => {
      if (!disabled) {
        switch (e.key) {
          case 'ArrowUp': {
            e.preventDefault();
            handleValueChange(Direction.Increment);
            break;
          }

          case 'ArrowDown': {
            e.preventDefault();
            handleValueChange(Direction.Decrement);
            break;
          }
        }
      }
    };

    return (
      <div
        aria-disabled={disabled}
        className={cx(
          wrapperClassName,
          wrapperBaseStyles,
          wrapperThemeStyles[theme],
          wrapperStateStyles[theme][state],
          {
            [wrapperHoverStyles[theme][state]]: !disabled,
            [wrapperDisabledStyles[theme]]: disabled,
            [selectBaseStyles]: hasSelectOptions,
          },
        )}
      >
        <input
          ref={inputRef}
          className={cx(
            inputBaseStyles,
            inputThemeStyles[theme],
            sizeInputStyles[size],
            {
              // padding without error icon
              [inputAnimateStyles]: !disabled,
              // padding with error icon
              [inputErrorAnimateStyles[size]]: renderErrorIcon && !disabled,
            },
          )}
          type="number"
          value={value}
          onChange={handleChange}
          aria-disabled={disabled}
          readOnly={disabled}
          {...rest}
        />
        <ErrorIcon
          disabled={disabled}
          renderErrorIcon={renderErrorIcon}
          size={size}
        />

        <Arrows
          disabled={disabled}
          handleClick={handleValueChange}
          handleArrowKeyDown={handleArrowKeyDown}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
