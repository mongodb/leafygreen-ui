import React, { useContext, useEffect, useMemo, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';

import { ChipProps, Overflow } from '../Combobox.types';
import { chipClassName } from '../Combobox/Combobox.styles';
import { ComboboxContext } from '../ComboboxContext';

import {
  chipButtonBaseDisabledStyles,
  chipButtonDisabledStyle,
  chipButtonSizeStyle,
  chipButtonStyle,
  chipButtonThemeStyle,
  chipTextSizeStyle,
  chipWrapperBaseStyle,
  chipWrapperSizeStyle,
  chipWrapperThemeStyle,
  disabledBaseChipWrapperStyles,
  disabledChipWrapperStyle,
} from './Chip.styles';

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ displayName, isFocused, onRemove, onFocus }: ChipProps, forwardedRef) => {
    const { darkMode, theme } = useDarkMode();
    const {
      size,
      disabled,
      overflow,
      chipTruncationLocation = 'end',
      chipCharacterLimit = 12,
      popoverZIndex,
    } = useContext(ComboboxContext);

    const isTruncated =
      overflow !== Overflow.scrollX &&
      !!chipCharacterLimit &&
      !!chipTruncationLocation &&
      chipTruncationLocation !== 'none' &&
      displayName.length > chipCharacterLimit;

    const buttonRef = useRef<HTMLButtonElement>(null);

    const truncatedName = useMemo(() => {
      if (isTruncated) {
        const ellipsis = '…';
        const chars = chipCharacterLimit - 3; // ellipsis dots included in the char limit

        switch (chipTruncationLocation) {
          case 'start': {
            const end = displayName
              .substring(displayName.length - chars)
              .trim();
            return ellipsis + end;
          }

          case 'middle': {
            const start = displayName.substring(0, chars / 2).trim();
            const end = displayName
              .substring(displayName.length - chars / 2)
              .trim();
            return start + ellipsis + end;
          }

          case 'end': {
            const start = displayName.substring(0, chars).trim();
            return start + ellipsis;
          }

          default: {
            return displayName;
          }
        }
      }

      return false;
    }, [chipCharacterLimit, chipTruncationLocation, displayName, isTruncated]);

    useEffect(() => {
      if (isFocused && !disabled) {
        buttonRef?.current?.focus();
      }
    }, [disabled, forwardedRef, isFocused]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (
        !disabled &&
        (e.keyCode === keyMap.Delete ||
          e.keyCode === keyMap.Backspace ||
          e.keyCode === keyMap.Enter ||
          e.keyCode === keyMap.Space)
      ) {
        onRemove();
      }
    };

    const handleChipClick = (e: React.MouseEvent) => {
      // Did not click button
      if (!buttonRef.current?.contains(e.target as Node)) {
        onFocus();
      }
    };

    const handleButtonClick = () => {
      if (!disabled) {
        onRemove();
      }
    };

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <span
        role="option"
        aria-selected={isFocused}
        data-testid="lg-combobox-chip"
        ref={forwardedRef}
        className={cx(
          chipClassName,
          chipWrapperBaseStyle,
          chipWrapperThemeStyle[theme],
          chipWrapperSizeStyle(size),
          {
            [cx(
              disabledChipWrapperStyle[theme],
              disabledBaseChipWrapperStyles,
            )]: disabled,
          },
        )}
        onClick={handleChipClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <span className={cx(chipTextSizeStyle[size])}>
          {truncatedName ? (
            <InlineDefinition
              darkMode={darkMode}
              definition={displayName}
              align="bottom"
              popoverZIndex={popoverZIndex}
            >
              {truncatedName}
            </InlineDefinition>
          ) : (
            displayName
          )}
        </span>
        <button
          aria-label={`Deselect ${displayName}`}
          aria-disabled={disabled}
          disabled={disabled}
          ref={buttonRef}
          className={cx(
            chipButtonStyle,
            chipButtonThemeStyle[theme],
            chipButtonSizeStyle(size),
            {
              [cx(
                chipButtonDisabledStyle[theme],
                chipButtonBaseDisabledStyles,
              )]: disabled,
            },
          )}
          onClick={handleButtonClick}
        >
          <Icon glyph="X" />
        </button>
      </span>
    );
  },
);
Chip.displayName = 'Chip';
