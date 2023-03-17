import React, { ChangeEvent, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';

import { Size, State } from '../NumberInput/NumberInput.types';

import {
  arrowBaseStyles,
  arrowsAnimateStyles,
  arrowsBaseStyles,
  arrowThemeStyles,
  errorInputStyles,
  iconBaseStyles,
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

export function Input({
  value: valueProp,
  onChange: onChangeProp,
  disabled,
  size = Size.Default,
  hasSelectOptions,
  state = State.None,
  errorMessage,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { theme } = useDarkMode();

  const renderErrorIcon = state === State.Error && !!errorMessage;

  const { value, handleChange: handleChangeProp } = useControlledValue(
    valueProp,
    onChangeProp,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log('😈', e.target.value);
    handleChangeProp?.(e);
  };

  /**
   * Custom arrow buttons do not trigger a change event on the input.
   * Creating a synthetic event will trigger a new change event.
   */
  const handleSyntheticEvent = () => {
    const nativeEvent = new Event('change', { bubbles: true });
    const synthEvent = createSyntheticEvent(nativeEvent, inputRef.current!);
    handleChange?.(synthEvent as ChangeEvent<HTMLInputElement>);
  };

  const handleIncrementClick = () => {
    if (!disabled) {
      inputRef.current?.stepUp();
      handleSyntheticEvent();
    }
  };

  const handleDecrementClick = () => {
    if (!disabled) {
      inputRef.current?.stepDown();
      handleSyntheticEvent();
    }
  };

  /**
   * Edge case if the user clicks on an arrow button then switches to keyboard click.
   * By default if focus is in the input then the keyboard clicks will work automatically but since the buttons are custom and outside of the input we are mimicking native behavior.
   */
  const handleArrowKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleIncrementClick();
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleDecrementClick();
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
          [wrapperErrorStyles]: renderErrorIcon,
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
            [errorInputStyles[size]]: renderErrorIcon,
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
          },
        )}
      >
        <WarningIcon role="presentation" />
      </div>

      <div
        className={cx(arrowsBaseStyles, { [arrowsAnimateStyles]: !disabled })}
      >
        <button
          aria-label="Increment number"
          onClick={handleIncrementClick}
          onKeyDown={handleArrowKeyDown}
          className={cx(arrowBaseStyles, arrowThemeStyles[theme])}
          type="button"
          tabIndex={-1} // Mimicking native behavior; you cannot focus on an arrow.
        >
          <Icon aria-hidden={true} glyph="CaretUp" size={16} />
        </button>
        <button
          aria-label="Increment number"
          onClick={handleDecrementClick}
          onKeyDown={handleArrowKeyDown}
          className={cx(arrowBaseStyles, arrowThemeStyles[theme])}
          type="button"
          tabIndex={-1}
        >
          <Icon aria-hidden={true} glyph="CaretDown" size={16} />
        </button>
      </div>
    </div>
  );
}

Input.displayName = 'Input';
