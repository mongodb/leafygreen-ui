import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { ChipProps, ComboboxSize } from './Combobox.types';
import Icon from '@leafygreen-ui/icon';
import { ComboboxContext } from './ComboboxContext';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { createDataProp } from '@leafygreen-ui/lib';
import { keyMap } from './util';
import { mix } from 'polished';

const chipWrapperStyle = ({
  darkMode,
  size,
}: {
  darkMode: boolean;
  size: ComboboxSize;
}) => {
  let chipModeStyle, chipSizeStyle;

  if (darkMode) {
    chipModeStyle = css``;
  } else {
    chipModeStyle = css`
      --lg-combobox-chip-text-color: ${palette.gray.dark3};
      --lg-combobox-chip-icon-color: ${palette.gray.dark2};
      --lg-combobox-chip-background-color: ${palette.gray.light2};
      --lg-combobox-chip-hover-bg-color: ${palette.gray.light1};
      --lg-combobox-chip-focus-bg-color: ${palette.blue.light2};
      --lg-combobox-chip-focus-hover-bg-color: ${mix(
        0.75,
        palette.blue.light2,
        palette.blue.light1,
      )};
    `;
  }

  switch (size) {
    case 'default':
      chipSizeStyle = css`
        --lg-combobox-chip-height: 24px;
        --lg-combobox-chip-border-radius: 6px;
        --lg-combobox-chip-font-size: 13px;
        --lg-combobox-chip-line-height: 20px;
        --lg-combobox-chip-padding-x: 6px;
      `;
      break;
  }

  return cx(
    chipModeStyle,
    chipSizeStyle,
    css`
      display: inline-flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      height: var(--lg-combobox-chip-height);
      font-size: var(--lg-combobox-chip-font-size);
      line-height: var(--lg-combobox-chip-line-height);
      border-radius: var(--lg-combobox-chip-border-radius);
      color: var(--lg-combobox-chip-text-color);
      background-color: var(--lg-combobox-chip-background-color);

      // TODO - refine these styles
      /* &:focus, */
      &:focus-within {
        background-color: var(--lg-combobox-chip-focus-bg-color);
      }
    `,
  );
};

const chipText = css`
  padding-inline: var(--lg-combobox-chip-padding-x);
`;

const chipButton = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  color: var(--lg-combobox-chip-icon-color);
  cursor: pointer;
  transition: background-color 100ms ease-in-out;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    background-color: var(--lg-combobox-chip-hover-bg-color);
  }

  &:hover {
    background-color: var(--lg-combobox-chip-hover-bg-color);
  }
`;

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ displayName, isFocused, onRemove, onFocus }: ChipProps, forwardedRef) => {
    const {
      darkMode,
      size,
      disabled,
      chipTruncationLocation = 'end',
      chipCharacterLimit = 12,
    } = useContext(ComboboxContext);

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

    const dataProp = createDataProp('combobox-chip');

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <span
        role="option"
        aria-selected={isFocused}
        data-test-id="lg-combobox-chip"
        {...dataProp.prop}
        ref={forwardedRef}
        className={chipWrapperStyle({ darkMode, size })}
        onClick={handleChipClick}
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
          className={cx(
            chipButton,
            css`
              ${dataProp.selector}:focus-within &:hover,
            ${dataProp.selector}:focus-within &:before {
                background-color: var(--lg-combobox-chip-focus-hover-bg-color);
              }
            `,
          )}
          onClick={handleButtonClick}
          onKeyDown={handleKeyDown}
        >
          <Icon glyph="X" />
        </button>
      </span>
    );
  },
);
Chip.displayName = 'Chip';
