import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { ChipProps, ComboboxSize } from './Combobox.types';
import Icon from '@leafygreen-ui/icon';
import { ComboboxContext } from './ComboboxContext';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { createDataProp, keyMap } from '@leafygreen-ui/lib';

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
      --lg-combobox-chip-text-color: ${uiColors.gray.dark3};
      --lg-combobox-chip-icon-color: ${uiColors.gray.dark2};
      --lg-combobox-chip-background-color: ${uiColors.gray.light2};
      --lg-combobox-chip-hover-color: ${uiColors.gray.light1};
      --lg-combobox-chip-focus-color: ${uiColors.blue.light2};
    `;
  }

  switch (size) {
    case 'default':
      chipSizeStyle = css`
        --lg-combobox-chip-height: 24px;
        --lg-combobox-chip-border-radius: 4px;
        --lg-combobox-chip-font-size: 14px;
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
        background-color: var(--lg-combobox-chip-focus-color);
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

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    background-color: var(--lg-combobox-chip-hover-color);
  }

  &:hover {
    background-color: var(--lg-combobox-chip-hover-color);
  }
`;

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ displayName, isFocused, onRemove }: ChipProps, forwardedRef) => {
    const {
      darkMode,
      size,
      chipTruncationLocation,
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
        const chars = chipCharacterLimit - 4;

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
      if (isFocused) {
        buttonRef?.current?.focus();
      }
    }, [forwardedRef, isFocused]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (
        e.keyCode === 8 || // Delete
        e.keyCode === keyMap.Enter ||
        e.keyCode === keyMap.Space
      ) {
        onRemove();
      }
    };

    const dataProp = createDataProp('combobox-chip');

    return (
      <span
        data-test-id="lg-combobox-chip"
        {...dataProp.prop}
        ref={forwardedRef}
        className={chipWrapperStyle({ darkMode, size })}
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
          ref={buttonRef}
          className={chipButton}
          onClick={onRemove}
          onKeyDown={handleKeyDown}
        >
          <Icon glyph="X" />
        </button>
      </span>
    );
  },
);
Chip.displayName = 'Chip';
