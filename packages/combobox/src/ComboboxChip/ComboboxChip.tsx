import React, { useContext, useEffect } from 'react';

import { BaseFontSize, Chip, Variant } from '@leafygreen-ui/chip';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import {
  ComboboxChipProps,
  Overflow,
  TruncationLocation,
} from '../Combobox.types';
import { ComboboxContext } from '../ComboboxContext';

import { chipSizeStyles } from './ComboboxChip.styles';

export const ComboboxChip = React.forwardRef<
  HTMLSpanElement,
  ComboboxChipProps
>(
  (
    { displayName, isFocused, onRemove, onFocus }: ComboboxChipProps,
    forwardedRef,
  ) => {
    const {
      size,
      disabled,
      overflow,
      chipTruncationLocation = TruncationLocation.End,
      chipCharacterLimit = 12,
      popoverZIndex,
    } = useContext(ComboboxContext);

    const updatedChipTruncationLocation =
      overflow === Overflow.scrollX
        ? TruncationLocation.None
        : chipTruncationLocation;

    const chipRef = useForwardedRef(forwardedRef, null);
    const buttonRef = chipRef.current?.querySelector('button');

    useEffect(() => {
      if (isFocused && !disabled) {
        buttonRef?.focus();
      }
    }, [disabled, buttonRef, isFocused]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (
        !disabled &&
        (e.key === keyMap.Delete ||
          e.key === keyMap.Backspace ||
          e.key === keyMap.Enter ||
          e.key === keyMap.Space)
      ) {
        onRemove();
      }
    };

    const handleChipClick = (e: React.MouseEvent) => {
      // Did not click button
      if (!buttonRef?.contains(e.target as Node)) {
        onFocus();
      }
    };

    const handleButtonClick = () => {
      if (!disabled) {
        onRemove();
      }
    };

    return (
      <Chip
        label={displayName}
        className={chipSizeStyles[size]}
        role="option"
        aria-selected={isFocused}
        data-testid="lg-combobox-chip"
        onClick={handleChipClick}
        onKeyDown={handleKeyDown}
        onDismiss={handleButtonClick}
        baseFontSize={BaseFontSize.Body1}
        chipCharacterLimit={chipCharacterLimit}
        chipTruncationLocation={updatedChipTruncationLocation}
        popoverZIndex={popoverZIndex}
        variant={Variant.Gray}
        ref={chipRef}
        disabled={disabled}
        tabIndex={-1}
      />
    );
  },
);
ComboboxChip.displayName = 'ComboboxChip';
