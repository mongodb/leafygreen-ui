import React, { useMemo, useRef, useState } from 'react';
import { Description, Label } from '@leafygreen-ui/typography';
import { ComboboxProps, ComboboxSize } from './Combobox.types';
import Popover from '@leafygreen-ui/popover';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';

/**
 * Styles
 */

const comboboxMode = (darkMode: boolean) => {
  switch (darkMode) {
    case false:
      return css`
        --lg-combobox-text-color: ${uiColors.gray.dark3};
        --lg-combobox-text-color-disabled: ${uiColors.gray.dark1};

        --lg-combobox-background-color: ${uiColors.gray.light3};
        --lg-combobox-background-color-focus: ${uiColors.white};
        --lg-combobox-background-color-disabled: ${uiColors.gray.light2};

        --lg-combobox-border-color: ${uiColors.gray.base};
        --lg-combobox-border-color-disabled: ${uiColors.gray.light1};

        --lg-combobox-shadow: 0px 1px 2px rgba(6, 22, 33, 0.3);
        --lg-combobox-shadow-focus: 0px 4px 4px rgba(6, 22, 33, 0.3);
      `;
    case true:
      return css``;
  }
};

const comboboxSize = (size: ComboboxSize) => {
  switch (size) {
    case 'default':
      return css`
        --lg-combobox-padding: 9px 12px;
        --lg-combobox-border-radius: 3px;

        --lg-combobox-menu-border-radius: 4px;
      `;
  }
};

const comboboxStyle = ({
  darkMode,
  size,
}: {
  darkMode: boolean;
  size: ComboboxSize;
}) => {
  return cx(comboboxMode(darkMode), comboboxSize(size), css``);
};

const inputWrapper = css`
  display: flex;
  color: var(--lg-combobox-text-color);
  padding: var(--lg-combobox-padding);
  background-color: var(--lg-combobox-background-color);
  box-shadow: var(--lg-combobox-shadow);
  border: 1px solid var(--lg-combobox-border-color);
  border-radius: var(--lg-combobox-border-radius);
  cursor: text;
  transition: 150ms ease-in-out;
  transition-property: background-color, box-shadow;

  &:focus-within {
    background-color: var(--lg-combobox-background-color-focus);
    box-shadow: var(--lg-combobox-shadow-focus);
  }

  &[data-disabled='true'] {
    color: var(--lg-combobox-text-color-disabled);
    background-color: var(--lg-combobox-background-color-disabled);
    border-color: var(--lg-combobox-border-color-disabled);
    box-shadow: unset;
    cursor: not-allowed;
  }
`;

const selectInputElement = css`
  background-color: inherit;
  border: none;
  cursor: inherit;

  &:focus {
    outline: none;
  }
`;

// Menu Styles

const menuWrapperStyle = ({
  darkMode,
  size,
  width = 0,
}: {
  darkMode: boolean;
  size: ComboboxSize;
  width?: number;
}) => {
  let menuModeStyle, menuSizeStyle;

  switch (darkMode) {
    case false:
      menuModeStyle = css`
        --lg-combobox-menu-color: ${uiColors.gray.dark3};
        --lg-combobox-menu-background-color: ${uiColors.white};
        --lg-combobox-menu-shadow: 0px 3px 7px rgba(0, 0, 0, 0.25);
      `;
      break;
    case true:
      menuModeStyle = css``;
      break;
  }

  switch (size) {
    case 'default':
      menuSizeStyle = css``;
  }

  return cx(
    menuModeStyle,
    menuSizeStyle,
    css`
      width: ${width}px;
    `,
  );
};

const menuStyle = css`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 8px;
  font-family: ${fontFamilies.default};
  color: var(--lg-combobox-menu-color);
  background-color: var(--lg-combobox-menu-background-color);
  box-shadow: var(--lg-combobox-menu-shadow);
  border-radius: var(--lg-combobox-menu-border-radius);
`;

/**
 * Component
 */
export default function Combobox({
  children,
  label,
  description,
  placeholder = 'Select',
  'aria-label': ariaLabel,
  disabled = false,
  size = 'default',
  darkMode = false,
  state = 'none',
  errorMessage,
  searchState = 'unset',
  searchErrorMessage,
  searchLoadingMessage,
  multiselect,
  onChange,
  onFilter,
  clearable = true,
  onClear,
  updateValue,
  overflow,
  chipTruncationLocation,
  className,
}: ComboboxProps) {
  const labelId = useIdAllocator({ prefix: 'combobox-label' });

  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useIdAllocator({ prefix: 'combobox' });

  const comboboxRef = useRef<HTMLDivElement>(null);

  const setInputFocus = () => {
    if (!disabled) {
      inputRef?.current?.focus();
    }
  };

  /**
   * Menu management
   */

  const [isOpen, setOpen] = useState(false);
  const menuId = useIdAllocator({ prefix: 'combobox-menu' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuWidth = useMemo(() => comboboxRef.current?.clientWidth, [
    comboboxRef,
    isOpen,
  ]);

  return (
    <div className={cx(comboboxStyle({ darkMode, size }), className)}>
      <div>
        {label && (
          <Label id={labelId} htmlFor={inputId}>
            {label}
          </Label>
        )}
        {description && <Description>{description}</Description>}
      </div>

      <InteractionRing disabled={disabled}>
        {/* Disable eslint: onClick sets focus. Key events would already have focus */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          ref={comboboxRef}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-owns={menuId}
          tabIndex={-1}
          className={inputWrapper}
          onClick={setInputFocus}
          data-disabled={disabled}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          <input
            aria-label={ariaLabel}
            aria-autocomplete="list"
            aria-controls={menuId}
            ref={inputRef}
            id={inputId}
            className={selectInputElement}
            placeholder={placeholder}
            disabled={disabled ?? undefined}
          />
        </div>
      </InteractionRing>

      <Popover
        active={isOpen && !disabled}
        spacing={4}
        align="bottom"
        justify="middle"
        className={menuWrapperStyle({ darkMode, size, width: menuWidth })}
      >
        <ul
          role="listbox"
          aria-labelledby={labelId}
          id={menuId}
          className={menuStyle}
        >
          {children}
        </ul>
      </Popover>
    </div>
  );
}
