import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import isUndefined from 'lodash/isUndefined';

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
  inputSizeStyles,
  inputThemeStyles,
  selectBaseStyles,
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
     * Timeout for error icon transitions, using a ref so its not recreated after each render.
     */
    const translateTimeout = useRef<NodeJS.Timeout>();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [shouldErrorTransition, setShouldErrorTransition] =
      useState<boolean>(false);
    const isFocusedRef = useRef<boolean>(false);
    const inputRef = useForwardedRef<HTMLInputElement | null>(forwardRef, null);
    const { theme } = useDarkMode();
    const isControlled = !isUndefined(valueProp);

    useEffect(() => {
      // On unmount, removes the timeout that is set on `onMouseLeave` and `'onBlur` of the wrapper container.
      return () => {
        if (translateTimeout.current) {
          clearTimeout(translateTimeout.current);
        }
      };
    }, []);

    const shouldRenderErrorIcon = state === State.Error;

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
      if (translateTimeout.current) {
        clearTimeout(translateTimeout.current);
      }
    };

    /**
     * When no longer hovering(`onMouseLeave`) or focused(`onBlur`) we want to remove the transition but we do it on a delay that matches the CSS transition duration. Without the delay the error icon would not animate with the arrows.
     *
     * We can't do this with CSS only because if we only have a transition on hover/focus the ease out animation will not execute when the wrapper is no longer hovered or in focus.
     */
    const handleRemoveErrorTransition = () => {
      if (containerRef.current) {
        // if the container is not focused then we can go ahead and remove the transition.
        // An example of this is if we are focused in the container but the mouse has moved outside of the container.
        if (!isFocusedRef.current) {
          translateTimeout.current = setTimeout(
            () => setShouldErrorTransition(false),
            transitionDuration.default,
          );
        }
      }
    };

    const handleOnFocus = () => {
      isFocusedRef.current = true;
      handleSetErrorTransition();
    };

    const handleOnBlur = () => {
      isFocusedRef.current = false;
      handleRemoveErrorTransition();
    };

    return (
      <div
        ref={containerRef}
        onMouseEnter={() => handleSetErrorTransition()}
        onMouseLeave={() => handleRemoveErrorTransition()}
        onFocus={() => handleOnFocus()}
        onBlur={() => handleOnBlur()}
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
            inputSizeStyles[size],
            {
              // padding without error icon
              [inputAnimateStyles]: !disabled,
              // padding with error icon
              [inputErrorAnimateStyles[size]]:
                shouldRenderErrorIcon && !disabled,
              [inputErrorPaddingTransitionStyles]: shouldErrorTransition,
            },
          )}
          type="number"
          value={isControlled ? valueProp : value} // TODO: temp fix for useControlledValue hook. The hook was not returning the correct value when controlled. For example when typing 2e3 the hook would return 3 but it should return 2e3 like a native number input would.
          onChange={handleChange}
          aria-disabled={disabled}
          readOnly={disabled}
          {...rest}
        />
        <ErrorIcon
          disabled={disabled}
          shouldRenderErrorIcon={shouldRenderErrorIcon}
          size={size}
          shouldErrorTransition={shouldErrorTransition}
        />

        <Arrows
          disabled={disabled}
          onClick={handleValueChange}
          onKeyDown={handleArrowKeyDown}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
