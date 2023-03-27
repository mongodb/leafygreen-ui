import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { Arrows } from '../Arrows';
import { ErrorIcon } from '../ErrorIcon';
import { Direction, Size, State } from '../NumberInput/NumberInput.types';

import {
  inputAnimateStyles,
  inputBaseStyles,
  inputErrorAnimateStyles,
  inputErrorPaddingTransitionStyles,
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
      className,
      ...rest
    }: InputProps,
    forwardRef,
  ) => {
    /**
     * Timeout for error icon transitions
     */
    let translateTimeout: NodeJS.Timeout;
    const [shouldErrorTransition, setShouldErrorTransition] =
      useState<boolean>(false);
    const inputRef = useForwardedRef<HTMLInputElement | null>(forwardRef, null);
    const { theme } = useDarkMode();

    useEffect(() => {
      return () => {
        clearTimeout(translateTimeout);
      };
    });

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

    /**
     * On hover(`onMouseEnter`) or focus(`onFocus`) of the wrapper we want to add a transition to the error icon so that it animates with the arrows. By default, the error icon will not have a transition when shown which is consistent with other LG inputs.
     *
     * Here we set state to true which conditionally adds the transition to the CSS.
     * We also clear the timeout that was created during `mouseLeave` or `onBlur` to prevent execution.
     *
     * The purpose of this is to only have the error icon animate when the arrows are visible.
     */
    const handleSetErrorTransition = () => {
      setShouldErrorTransition(true);
      clearTimeout(translateTimeout);
    };

    /**
     * When no longer hovering(`onMouseLeave`) or focused(`onBlur`) we want to remove the transition but we do it on a delay that matches the CSS transition duration. Without the delay the error icon would not animate with the arrows.
     *
     * We can't do this with CSS only because if we only have a transition on hover/focus the ease out animation will not execute when the wrapper is no longer hovered or in focus.
     */
    const handleRemoveErrorTransition = () => {
      translateTimeout = setTimeout(
        () => setShouldErrorTransition(false),
        transitionDuration.default,
      );
    };

    return (
      <div
        onMouseEnter={() => handleSetErrorTransition()}
        onMouseLeave={() => handleRemoveErrorTransition()}
        onMouseMove={() => handleSetErrorTransition()}
        onFocus={() => handleSetErrorTransition()}
        onBlur={() => handleRemoveErrorTransition()}
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
          className,
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
              [inputErrorPaddingTransitionStyles]: shouldErrorTransition,
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
          shouldErrorTransition={shouldErrorTransition}
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
