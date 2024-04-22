import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react';
import isUndefined from 'lodash/isUndefined';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';

import { Arrows } from '../Arrows';
import { Direction, Size, State } from '../NumberInput/NumberInput.types';

import {
  getWrapperDisabledStyles,
  getWrapperHoverStyles,
  getWrapperStateStyles,
  inputBaseStyles,
  inputSizeStyles,
  inputThemeStyles,
  selectBaseStyles,
  wrapperBaseStyles,
  wrapperClassName,
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
      onBlur,
      disabled = false,
      size = Size.Default,
      state = State.None,
      hasSelectOptions,
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

    const handleFocus = () => {
      isFocusedRef.current = true;
    };

    const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
      isFocusedRef.current = false;
      // If newly focused element is a child of the input container, we do not invoke onBlur
      const inputContainer = e.currentTarget as Node;
      const possibleChildOfInputContainer = e.relatedTarget as Node | null;
      if (inputContainer.contains(possibleChildOfInputContainer)) return;
      onBlur?.(e);
    };

    return (
      <div
        ref={containerRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cx(
          wrapperClassName,
          wrapperBaseStyles,
          wrapperThemeStyles[theme],
          getWrapperStateStyles(theme)[state],
          {
            [getWrapperHoverStyles(theme)[state]]: !disabled,
            [getWrapperDisabledStyles(theme)]: disabled,
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
          )}
          type="number"
          value={isControlled ? valueProp : value} // TODO: temp fix for useControlledValue hook. The hook was not returning the correct value when controlled. For example when typing 2e3 the hook would return 3 but it should return 2e3 like a native number input would.
          onChange={handleChange}
          aria-disabled={disabled}
          readOnly={disabled}
          {...rest}
        />
        <Arrows
          disabled={disabled}
          onClick={handleValueChange}
          onKeyDown={handleArrowKeyDown}
          size={size}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
