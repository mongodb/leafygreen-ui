import React, { ChangeEvent, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';

import { Size, State } from '../NumberInput/NumberInput.types';

import {
  arrowBaseStyles,
  arrowsBaseStyles,
  arrowThemeStyles,
  baseInputStyles,
  selectBaseStyles,
  sizeInputStyles,
  wrapperBaseStyles,
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
  size,
  hasSelectOptions,
  state,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { theme } = useDarkMode();

  const { value, handleChange: handleChangeProp } = useControlledValue(
    valueProp,
    onChangeProp,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
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
    inputRef.current?.stepUp();
    handleSyntheticEvent();
  };

  const handleDecrementClick = () => {
    inputRef.current?.stepDown();
    handleSyntheticEvent();
  };

  /**
   * Edge case if the user clicks on an arrow button then switches to keyboard click.
   * By default if focus is in the input then the keyboard clicks will work automatically but since the buttons are custom and outside of the input we are mimicking native behavior.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled) {
      e.preventDefault();
      // TODO: use vars for keys
      if (e.key === 'ArrowUp') handleIncrementClick();
      if (e.key === 'ArrowDown') handleDecrementClick();
    }
  };

  return (
    <div
      className={cx(
        wrapperBaseStyles,
        wrapperThemeStyles[theme],
        wrapperStateStyles[theme][state as State],
        {
          [selectBaseStyles]: hasSelectOptions,
        },
      )}
    >
      <input
        ref={inputRef}
        className={cx(baseInputStyles, sizeInputStyles[size as Size])}
        type="number"
        value={value}
        onChange={handleChange}
        aria-disabled={disabled}
        readOnly={disabled}
        // TODO: keyPress to remove letters
        {...rest}
      />
      <div className={cx(arrowsBaseStyles)}>
        {/* TODO: should not have focus styles. These should only appear on hover*/}
        {/* TODO: should have active styles */}
        <button
          aria-label="Increment number"
          onClick={handleIncrementClick}
          onKeyDown={handleKeyDown}
          className={cx(arrowBaseStyles, arrowThemeStyles[theme])}
          type="button"
          tabIndex={-1} // Mimicking native behavior; you cannot focus on an arrow.
        >
          <Icon aria-hidden={true} glyph="CaretUp" size={16} />
        </button>
        <button
          aria-label="Increment number"
          onClick={handleDecrementClick}
          onKeyDown={handleKeyDown}
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
