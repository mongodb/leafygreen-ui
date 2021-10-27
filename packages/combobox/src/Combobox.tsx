import React, { useMemo, useRef, useState } from 'react';
import { Description, Label } from '@leafygreen-ui/typography';
import { ComboboxProps, ComboboxSize } from './Combobox.types';
import Popover from '@leafygreen-ui/popover';
import { useEventListener, useIdAllocator } from '@leafygreen-ui/hooks';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { ComboboxContext } from './ComboboxContext';
import { isComponentType } from '@leafygreen-ui/lib';
import { isNull } from 'lodash';

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
  width = 175,
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
        --lg-combobox-item-active-color: ${uiColors.blue.light3};
        --lg-combobox-item-wedge-color: ${uiColors.blue.base};
      `;
      break;
    case true:
      menuModeStyle = css``;
      break;
  }

  switch (size) {
    case 'default':
      menuSizeStyle = css`
        --lg-combobox-item-height: 36px;
        --lg-combobox-item-padding-y: 8px;
        --lg-combobox-item-padding-x: 12px;
        --lg-combobox-item-font-size: 14px;
        --lg-combobox-item-line-height: 20px;

        --lg-combobox-item-wedge-height: 22px;
      `;
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
  padding: 0;
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
  multiselect = false,
  onChange,
  onFilter,
  clearable = true,
  onClear,
  updateValue,
  overflow,
  chipTruncationLocation,
  className,
}: ComboboxProps) {
  const inputId = useIdAllocator({ prefix: 'combobox-input' });
  const labelId = useIdAllocator({ prefix: 'combobox-label' });
  const menuId = useIdAllocator({ prefix: 'combobox-menu' });

  const inputRef = useRef<HTMLInputElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // TODO - handle internal filtering
  const options = useMemo<Array<string>>(() => {
    return (
      React.Children.map(children, child => {
        if (isComponentType(child, 'ComboboxOption')) {
          return child.props.value;
        } else if (isComponentType(child, 'ComboboxGroup')) {
          // TODO - handle nesting
          return '';
        }
      }) ?? []
    );
  }, [children]);

  /**
   * Menu management
   */
  const [isOpen, setOpen] = useState(true);
  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuWidth = useMemo(() => comboboxRef.current?.clientWidth, [
    comboboxRef,
    isOpen,
  ]);

  /**
   * Focus Management
   */
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null,
  );
  type Direction = 'next' | 'prev' | 'first' | 'last';
  const updateFocusedOption = (direction: Direction) => {
    switch (direction) {
      case 'next': {
        if (
          !isNull(focusedOptionIndex) &&
          focusedOptionIndex + 1 < options.length
        ) {
          setFocusedOptionIndex(focusedOptionIndex + 1);
        } else {
          setFocusedOptionIndex(0);
        }
        break;
      }

      case 'prev': {
        if (!isNull(focusedOptionIndex) && focusedOptionIndex - 1 >= 0) {
          setFocusedOptionIndex(focusedOptionIndex - 1);
        } else {
          setFocusedOptionIndex(options.length - 1);
        }
        break;
      }

      case 'last': {
        setFocusedOptionIndex(options.length - 1);
        break;
      }

      case 'first':
      default: {
        setFocusedOptionIndex(0);
      }
    }
  };

  // We force focus onto the input in several cases
  const setInputFocus = () => {
    if (!disabled) {
      inputRef?.current?.focus();
    }
  };

  // Fired onChange
  const handleInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    onFilter?.(value);
  };

  // Global backdrop click handler
  const handleBackdropClick = ({ target }: MouseEvent) => {
    const isChildFocused =
      menuRef.current?.contains(target as Node) ||
      comboboxRef.current?.contains(target as Node) ||
      false;
    setOpen(isChildFocused);
    setFocusedOptionIndex(null);
  };
  useEventListener('mousedown', handleBackdropClick);

  // Global keypress handler
  const handleKeyDown = (event: KeyboardEvent) => {
    // No support for modifiers yet
    if (event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    switch (event.key) {
      case 'Tab':
      case 'Escape': {
        closeMenu();
        setFocusedOptionIndex(null);
        break;
      }

      case 'Enter':
      case 'Space': {
        if (isOpen) {
          event.preventDefault();
        }
        // TODO - set selected option
        break;
      }

      case 'ArrowDown': {
        if (isOpen) {
          // Prevent the page from scrolling
          event.preventDefault();
        }

        updateFocusedOption('next');
        break;
      }

      case 'ArrowUp': {
        if (isOpen) {
          // Prevent the page from scrolling
          event.preventDefault();
        }
        updateFocusedOption('prev');
        break;
      }
    }
  };
  useEventListener('keydown', handleKeyDown);

  return (
    <ComboboxContext.Provider
      value={{
        multiselect,
        focusedOption: !isNull(focusedOptionIndex)
          ? options[focusedOptionIndex]
          : undefined,
        // TODO - figure out typing here
        selected: '',
      }}
    >
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
            onFocus={openMenu}
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
              onChange={handleInputChange}
            />
          </div>
        </InteractionRing>

        {/**
         * Menu
         */}
        <Popover
          active={isOpen && !disabled}
          spacing={4}
          align="bottom"
          justify="middle"
          // TODO - set maxHeight
          className={menuWrapperStyle({ darkMode, size, width: menuWidth })}
        >
          <ul
            role="listbox"
            aria-labelledby={labelId}
            id={menuId}
            ref={menuRef}
            className={menuStyle}
          >
            {children}
          </ul>
        </Popover>
      </div>
    </ComboboxContext.Provider>
  );
}
