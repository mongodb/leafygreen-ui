import React, { ChangeEvent } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useForwardedRef } from '@leafygreen-ui/hooks';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';

import { Arrows } from '../Arrows';
import { Direction, Size, State } from '../NumberInput/NumberInput.types';

import {
  iconBaseStyles,
  iconDisabledStyles,
  iconErrorDisabledStyles,
  iconErrorStyles,
  iconSizeStyles,
  iconThemeStyles,
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
      hasSelectOptions,
      state = State.None,
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
        <div
          className={cx(
            iconBaseStyles,
            iconThemeStyles[theme],
            iconSizeStyles[size],
            {
              [iconErrorStyles[size]]: renderErrorIcon,
              [iconErrorDisabledStyles[size]]: renderErrorIcon && !disabled,
              [iconDisabledStyles]: disabled,
            },
          )}
        >
          <WarningIcon aria-hidden="true" />
        </div>

        <Arrows disabled={disabled} handleValueChange={handleValueChange} />
      </div>
    );
  },
);

Input.displayName = 'Input';
