import React, { ChangeEvent } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useForwardedRef } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';

import { Size, State } from '../NumberInput/NumberInput.types';

import {
  arrowBaseStyles,
  arrowDisabledStyles,
  arrowsAnimateStyles,
  arrowsBaseStyles,
  arrowThemeStyles,
  downArrowRotateStyles,
  errorInputStyles,
  iconBaseStyles,
  iconDisabledStyles,
  iconErrorStyles,
  iconSizeStyles,
  iconThemeStyles,
  inputAnimateStyles,
  inputBaseStyles,
  inputThemeStyles,
  selectBaseStyles,
  sizeInputStyles,
  warningIconClassName,
  wrapperBaseStyles,
  wrapperClassName,
  wrapperDisabledStyles,
  wrapperErrorStyles,
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
      disabled,
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

    const handleValueChange = (value: 'increment' | 'decrement') => {
      switch (value) {
        case 'increment': {
          inputRef.current?.stepUp();
          handleSyntheticEvent();
          break;
        }

        case 'decrement': {
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
    const handleArrowKeyDown = (e: React.KeyboardEvent) => {
      if (!disabled) {
        switch (e.key) {
          case 'ArrowUp': {
            e.preventDefault();
            handleValueChange('increment');
            break;
          }

          case 'ArrowDown': {
            e.preventDefault();
            handleValueChange('decrement');
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
            [wrapperErrorStyles]: renderErrorIcon && !disabled,
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
              [errorInputStyles[size]]: renderErrorIcon && !disabled,
              [inputAnimateStyles]: !disabled,
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
            warningIconClassName,
            iconBaseStyles,
            iconThemeStyles[theme],
            iconSizeStyles[size],
            {
              [iconErrorStyles[size]]: renderErrorIcon,
              [iconDisabledStyles]: disabled,
            },
          )}
        >
          <WarningIcon aria-hidden="true" />
        </div>

        <div
          className={cx(arrowsBaseStyles, {
            [arrowsAnimateStyles]: !disabled,
            [arrowDisabledStyles]: disabled,
          })}
        >
          <button
            aria-label="Increment number"
            onClick={() => handleValueChange('increment')}
            onKeyDown={handleArrowKeyDown}
            className={cx(arrowBaseStyles, arrowThemeStyles[theme])}
            type="button"
            tabIndex={-1} // Mimicking native behavior; you cannot focus on an arrow.
          >
            <Icon aria-hidden={true} glyph="CaretUp" size={16} />
          </button>
          <button
            aria-label="Decrement number"
            onClick={() => handleValueChange('decrement')}
            onKeyDown={handleArrowKeyDown}
            className={cx(arrowBaseStyles, arrowThemeStyles[theme])}
            type="button"
            tabIndex={-1}
          >
            <Icon
              className={downArrowRotateStyles}
              aria-hidden={true}
              // TODO: CaretUp and CaretDown icons do not align vertically
              glyph="CaretUp"
              size={16}
            />
          </button>
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
