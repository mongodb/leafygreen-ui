import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { ChipProps, ComboboxSize } from './Combobox.types';
import Icon from '@leafygreen-ui/icon';
import { ComboboxContext } from './ComboboxContext';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { keyMap } from '@leafygreen-ui/lib';
import { chipClassName } from './Combobox.styles';
import { Mode, typeScales } from '@leafygreen-ui/tokens';
import { comboboxChipPadding } from './constants';

const chipWrapperBaseStyle = css`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
`;

const chipWrapperSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    height: 24px;
    font-size: ${typeScales.body1.fontSize + 1}px; // TODO: update this;
    line-height: ${typeScales.body1.lineHeight + 1}px; // TODO: update this
    border-radius: 4px;
  `,
  [ComboboxSize.Large]: css`
    height: 28px;
    font-size: ${typeScales.body2.fontSize + 1}px; // TODO: update this;
    line-height: ${typeScales.body2.lineHeight + 1}px; // TODO: update this
    border-radius: 4px;
  `,
};

const chipWrapperModeStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark3};
    background-color: ${uiColors.gray.light2};

    // TODO: - refine these styles
    &:focus-within {
      background-color: ${uiColors.blue.light2};
    }
  `,
  [Mode.Dark]: css``,
};

const chipText = css`
  padding-inline: ${comboboxChipPadding}px;
`;

const chipButtonStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 100ms ease-in-out;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
  }
`;

const chipButtonModeStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark2};

    &:before {
      background-color: ${uiColors.gray.light1};
    }

    &:hover {
      background-color: ${uiColors.gray.light1};
    }
  `,
  [Mode.Dark]: css``,
};

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ displayName, isFocused, onRemove, onFocus }: ChipProps, forwardedRef) => {
    const {
      darkMode,
      size,
      disabled,
      chipTruncationLocation = 'end',
      chipCharacterLimit = 12,
    } = useContext(ComboboxContext);
    const mode = darkMode ? Mode.Dark : Mode.Light;

    const isTruncated =
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
          chipWrapperModeStyle[mode],
          chipWrapperSizeStyle[size],
        )}
        onClick={handleChipClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <span className={chipText}>
          {truncatedName ? (
            <InlineDefinition definition={displayName} align="bottom">
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
          className={cx(chipButtonStyle, chipButtonModeStyle[mode])}
          onClick={handleButtonClick}
        >
          <Icon glyph="X" />
        </button>
      </span>
    );
  },
);
Chip.displayName = 'Chip';
