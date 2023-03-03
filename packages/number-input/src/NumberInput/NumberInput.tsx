import React, { ChangeEvent, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';
import { Description, Label } from '@leafygreen-ui/typography';

import {
  arrowBaseStyles,
  arrowsBaseStyles,
  baseInputStyles,
  inputWrapperBaseStyles,
  sizeInputStyles,
  wrapperBaseStyles,
  wrapperSizeStyles,
} from './NumberInput.styles';
import { NumberInputProps, Size } from './NumberInput.types';

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      darkMode: darkModeProp,
      className,
      disabled,
      label,
      id: idProp,
      value: valueProp,
      description,
      onChange: onChangeProp,
      size = Size.Default,
      unit,
      unitOptions,
      onSelectChange,
      ...rest
    }: NumberInputProps,
    forwardedRef,
  ) => {
    const prefix = 'lg-numberinput';
    const inputId = useIdAllocator({ prefix, id: idProp });
    const { darkMode } = useDarkMode(darkModeProp);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { value, handleChange: handleChangeProp } = useControlledValue(
      valueProp,
      onChangeProp,
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-console
      console.log(e.target.value);
      handleChangeProp?.(e);
    };

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

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!disabled) {
        if (e.key === 'ArrowUp') handleIncrementClick();
        if (e.key === 'ArrowDown') handleDecrementClick();
      }
    };

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div ref={forwardedRef} className={className}>
          {label && (
            <Label className={cx()} htmlFor={inputId} disabled={disabled}>
              {label}
            </Label>
          )}
          {description && (
            <Description disabled={disabled} className={cx()}>
              {description}
            </Description>
          )}
          {/* TODO: separate component */}
          <div className={cx(wrapperBaseStyles, wrapperSizeStyles[size])}>
            <div className={cx(inputWrapperBaseStyles)}>
              <input
                ref={inputRef}
                className={cx(baseInputStyles, sizeInputStyles[size])}
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
                  className={cx(arrowBaseStyles)}
                  type="button"
                  tabIndex={-1} // Mimicking native behavior; you cannot focus on a button.
                >
                  <Icon aria-hidden={true} glyph="CaretUp" size={16} />
                </button>
                <button
                  aria-label="Increment number"
                  onClick={handleDecrementClick}
                  onKeyDown={handleKeyDown}
                  className={cx(arrowBaseStyles)}
                  type="button"
                  tabIndex={-1}
                >
                  <Icon aria-hidden={true} glyph="CaretDown" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

NumberInput.displayName = 'NumberInput';
