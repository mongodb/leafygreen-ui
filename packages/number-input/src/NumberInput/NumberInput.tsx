import React, { ChangeEvent, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { InputBase } from '@leafygreen-ui/input-base';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { createSyntheticEvent } from '@leafygreen-ui/lib';
import { Description, Label } from '@leafygreen-ui/typography';

import { baseStyles } from './NumberInput.styles';
import { NumberInputProps } from './NumberInput.types';

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      darkMode: darkModeProp,
      className,
      disabled,
      label,
      id: idProp,
      value,
      description,
    }: NumberInputProps,
    forwardedRef,
  ) => {
    const prefix = 'lg-numberinput';
    const inputId = useIdAllocator({ prefix, id: idProp });
    const { darkMode } = useDarkMode(darkModeProp);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-console
      console.log(e.target.value);
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

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div ref={forwardedRef}>
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
          <div>
            <InputBase
              ref={inputRef}
              className={cx(baseStyles, className)}
              type="number"
              value={value}
              onChange={handleChange}
            />
            <div>
              <IconButton
                aria-label="Increment number"
                onClick={handleIncrementClick}
                className={cx()}
              >
                <Icon aria-hidden={true} glyph="CaretUp" />
              </IconButton>
              <IconButton
                aria-label="Increment number"
                onClick={handleDecrementClick}
                className={cx()}
              >
                <Icon aria-hidden={true} glyph="CaretDown" />
              </IconButton>
            </div>
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

NumberInput.displayName = 'NumberInput';
