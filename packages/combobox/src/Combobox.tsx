import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Description, Label } from '@leafygreen-ui/typography';
import {
  ComboboxProps,
  ComboboxSizeType,
  OverflowType,
} from './Combobox.types';
import Popover from '@leafygreen-ui/popover';
import { useEventListener, useIdAllocator } from '@leafygreen-ui/hooks';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { ComboboxContext } from './ComboboxContext';
import { isComponentType } from '@leafygreen-ui/lib';
import { isArray, isNull, kebabCase, startCase } from 'lodash';
import { InternalComboboxOption } from './ComboboxOption';
import Chip from './Chip';

/**
 * Styles
 */

// const initialWidth = 384;

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

const comboboxSize = (size: ComboboxSizeType) => {
  switch (size) {
    case 'default':
      return css`
        --lg-combobox-padding: 5px 7px;
        --lg-combobox-height: 24px;
        --lg-combobox-line-height: 20px;
        --lg-combobox-border-radius: 3px;
        --lg-combobox-input-max-width: 12ch;
      `;
  }
};

const comboboxParentStyle = ({
  darkMode,
  size,
  overflow,
}: {
  darkMode: boolean;
  size: ComboboxSizeType;
  overflow: OverflowType;
}) => {
  return cx(
    comboboxMode(darkMode),
    comboboxSize(size),
    css`
      --lg-combobox-width: ${overflow === 'expand-x' ? 'unset' : '100%'};
      width: var(--lg-combobox-width);
    `,
  );
};

const comboboxStyle = css`
  /* display: flex; */
  /* gap: 4px; */
  padding: var(--lg-combobox-padding);
  color: var(--lg-combobox-text-color);
  background-color: var(--lg-combobox-background-color);
  box-shadow: var(--lg-combobox-shadow);
  border: 1px solid var(--lg-combobox-border-color);
  border-radius: var(--lg-combobox-border-radius);
  width: var(--lg-combobox-width);
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

const interactionRingStyle = css`
  width: var(--lg-combobox-width);
`;

const inputWrapperStyle = ({
  overflow,
  isOpen,
  selection,
}: {
  overflow: OverflowType;
  isOpen: boolean;
  selection: number | Array<number> | null;
}) => {
  const baseWrapperStyle = css`
    width: var(--lg-combobox-width);
  `;

  switch (overflow) {
    case 'scroll-x': {
      return css`
        ${baseWrapperStyle}
        height: var(--lg-combobox-height);
        white-space: nowrap;
        overflow-x: scroll;
        scroll-behavior: smooth;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }

        & > * {
          margin-inline: 4px;

          &:first-child {
            margin-inline-start: 0;
          }

          &:last-child {
            margin-inline-end: 0;
          }
        }
      `;
    }

    case 'expand-x': {
      return css`
        ${baseWrapperStyle}
        display: flex;
        gap: 4px;
        flex-wrap: nowrap;
        white-space: nowrap;
      `;
    }

    case 'expand-y': {
      return css`
        ${baseWrapperStyle}
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        overflow-x: visible;

        // The input should be hidden when there are elements selected in a multiselect
        // We don't set \`display: none\` since we need to be able to set .focus() on the element
        --lg-combobox-input-width: ${!isOpen &&
        isArray(selection) &&
        selection.length > 0
          ? '0'
          : 'var(--lg-combobox-input-max-width)'};
      `;
    }
  }
};

const inputElementStyle = css`
  border: none;
  cursor: inherit;
  background-color: inherit;
  box-sizing: content-box;
  padding-block: calc(
    (var(--lg-combobox-height) - var(--lg-combobox-line-height)) / 2
  );
  padding-inline: 0;
  height: var(--lg-combobox-line-height);

  width: var(
    --lg-combobox-input-width,
    var(--lg-combobox-input-max-width, auto)
  );

  &:focus {
    outline: none;
  }
`;

// Menu Styles
const menuWrapperStyle = ({
  darkMode,
  size,
  width = 384,
}: {
  darkMode: boolean;
  size: ComboboxSizeType;
  width?: number;
}) => {
  let menuModeStyle, menuSizeStyle;

  switch (darkMode) {
    case false:
      menuModeStyle = css`
        --lg-combobox-menu-color: ${uiColors.gray.dark3};
        --lg-combobox-menu-message-color: ${uiColors.gray.dark1};
        --lg-combobox-menu-background-color: ${uiColors.white};
        --lg-combobox-menu-shadow: 0px 3px 7px rgba(0, 0, 0, 0.25);
        --lg-combobox-item-hover-color: ${uiColors.gray.light2};
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
        --lg-combobox-menu-border-radius: 4px;
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
      border-radius: var(--lg-combobox-menu-border-radius);

      & > * {
        border-radius: inherit;
      }
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
  border-radius: inherit;
  overflow: hidden;
`;

const menuList = css`
  position: relative;
  margin: 0;
  padding: 0;
`;

const menuMessage = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--lg-combobox-item-font-size);
  color: var(--lg-combobox-menu-message-color);
  padding: var(--lg-combobox-item-padding-y) var(--lg-combobox-item-padding-x);

  & > svg {
    width: 1em;
    height: 1em;
  }
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
  initialValue,
  errorMessage,
  searchState = 'unset',
  searchEmptyMessage = 'No results found',
  searchErrorMessage = 'Could not get results!',
  searchLoadingMessage = 'Loading results...',
  multiselect = false,
  onChange,
  onFilter,
  clearable = true,
  onClear,
  updateValue,
  overflow = 'scroll-x',
  chipTruncationLocation,
  className,
  ...rest
}: ComboboxProps) {
  const inputId = useIdAllocator({ prefix: 'combobox-input' });
  const labelId = useIdAllocator({ prefix: 'combobox-label' });
  const menuId = useIdAllocator({ prefix: 'combobox-menu' });

  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [focusedOption, setFocusedOption] = useState<number | null>(null);
  const [selection, setSelection] = useState<number | Array<number> | null>(
    multiselect ? [] : null,
  );

  // Utility to force selection
  const setInputFocus = useCallback(() => {
    if (!disabled) {
      inputRef?.current?.focus();
    }
  }, [disabled]);

  // Utility function to handle mulit & single select
  const toggleSelection = useCallback(
    (key: number) => {
      // MULTISELECT
      if (multiselect && isArray(selection)) {
        if (selection.includes(key)) {
          // remove from array
          const newSelection = [...selection];
          newSelection.splice(newSelection.indexOf(key), 1);
          setSelection(newSelection);
        } else {
          // add to array
          setSelection([...selection, key]);
        }
      } else {
        // SINGLE SELECT
        setSelection(key);
        // TODO - update input value
      }
    },
    [multiselect, selection],
  );

  /**
   * We listen for when `isOpen` changes, and then set a new variable
   * that triggers the menu to re-render. We need this because
   * the width of `input` gets updated after the menu is opened.
   * This change doesn't get caught in the initial render of the menu,
   * leading to issues when this change pops `input` to a new line.
   * Note: useMemo is fired too early. Need to use useState & useEffect
   */
  const [hasMenuBeenOpened, setHasMenuBeenOpened] = useState(false);
  useEffect(() => setHasMenuBeenOpened(isOpen), [isOpen]);

  // TODO - handle internal filtering

  const renderedOptions = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      if (isComponentType(child, 'ComboboxOption')) {
        const {
          value: valueProp,
          displayName: nameProp,
          // children: childChildrenProp,
          className,
          glyph,
        } = child.props;

        const value = valueProp ?? kebabCase(nameProp);
        const displayName = nameProp ?? startCase(value);
        // const childChildren = childChildrenProp ?? nameProp ?? startCase(value);

        const isFocused = focusedOption === index;
        const isSelected =
          multiselect && isArray(selection)
            ? selection.includes(index)
            : selection === index;

        const setSelected = () => toggleSelection(index);
        return (
          <InternalComboboxOption
            value={value}
            displayName={displayName}
            isFocused={isFocused}
            isSelected={isSelected}
            setSelected={setSelected}
            glyph={glyph}
            className={className}
          />
        );
      } else if (isComponentType(child, 'ComboboxGroup')) {
        // TODO - handle nesting
      }
    });
  }, [children, focusedOption, multiselect, selection, toggleSelection]);

  const getIndexOfOption = (value: string) =>
    renderedOptions?.findIndex(({ props }) => props.value === value) ?? -1;

  // Set initialValue
  useEffect(() => {
    if (initialValue) {
      if (isArray(initialValue)) {
        setSelection(initialValue.map(value => getIndexOfOption(value)));
      } else {
        setSelection(getIndexOfOption(initialValue));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the selection changes...
  useEffect(() => {
    // Update the text input
    if (!multiselect && inputRef.current) {
      const selectedOption =
        renderedOptions && !isNull(selection) && !isArray(selection)
          ? renderedOptions[selection]
          : undefined;
      inputRef.current.value = selectedOption
        ? selectedOption.props.displayName
        : '';
    } else {
      // TODO - decide if we focus the text input here ?
      // setInputFocus()
      // Scroll the wrapper to the end
      if (inputWrapperRef.current) {
        inputWrapperRef.current.scrollLeft =
          inputWrapperRef.current?.scrollWidth;
      }
    }
  }, [multiselect, renderedOptions, selection, setInputFocus]);

  // Do any of the options have an icon?
  const withIcons = useMemo(
    () => renderedOptions?.some(child => !!child.props.glyph) ?? false,
    [renderedOptions],
  );

  // TODO - useMemo to render Chips
  const renderedChips = useMemo(() => {
    if (multiselect && isArray(selection) && renderedOptions) {
      return selection.map(index => {
        const { value, displayName } = renderedOptions[index].props;
        const onRemove = () => toggleSelection(index);
        return (
          <Chip
            key={value}
            value={value}
            displayName={displayName}
            onRemove={onRemove}
          />
        );
      });
    }
  }, [multiselect, renderedOptions, selection, toggleSelection]);

  /**
   * Menu management
   */
  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuWidth = useMemo(() => comboboxRef.current?.clientWidth, [
    comboboxRef,
    isOpen,
  ]);

  const renderedMenuContents = useMemo((): JSX.Element => {
    switch (searchState) {
      case 'loading': {
        return (
          <span className={menuMessage}>
            <Icon
              glyph="Refresh"
              color={uiColors.blue.base}
              className={css`
                animation: rotate 1.5s linear infinite;
                @keyframes rotate {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
              `}
            />
            {searchLoadingMessage}
          </span>
        );
      }

      case 'error': {
        return (
          <span className={menuMessage}>
            <Icon glyph="Warning" color={uiColors.red.base} />
            {searchErrorMessage}
          </span>
        );
      }

      case 'unset':
      default: {
        if (renderedOptions) {
          return (
            <ul role="listbox" aria-labelledby={labelId} className={menuList}>
              {renderedOptions}
            </ul>
          );
        }

        return <span className={menuMessage}>{searchEmptyMessage}</span>;
      }
    }
  }, [
    labelId,
    renderedOptions,
    searchEmptyMessage,
    searchErrorMessage,
    searchLoadingMessage,
    searchState,
  ]);

  /**
   * Focus Management
   */
  type Direction = 'next' | 'prev' | 'first' | 'last';
  const updateFocusedOption = (direction: Direction) => {
    const optionsCount = renderedOptions?.length ?? 0;
    const lastIndex = optionsCount - 1 > 0 ? optionsCount - 1 : 0;

    switch (direction) {
      case 'next': {
        if (!isNull(focusedOption) && focusedOption + 1 < optionsCount) {
          setFocusedOption(focusedOption + 1);
        } else {
          setFocusedOption(0);
        }
        break;
      }

      case 'prev': {
        if (!isNull(focusedOption) && focusedOption - 1 >= 0) {
          setFocusedOption(focusedOption - 1);
        } else {
          setFocusedOption(lastIndex);
        }
        break;
      }

      case 'last': {
        setFocusedOption(lastIndex);
        break;
      }

      case 'first':
      default: {
        setFocusedOption(0);
      }
    }
  };

  // Fired onChange
  const handleInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // adjust the size of the input
    // if (inputRef.current) {
    //   inputRef.current.setAttribute('style', `width: calc(${value.length}ch + 1px);`)
    // }

    // fire any filter function passed in
    onFilter?.(value);
  };

  // Global backdrop click handler
  const handleBackdropClick = ({ target }: MouseEvent) => {
    const isChildFocused =
      menuRef.current?.contains(target as Node) ||
      comboboxRef.current?.contains(target as Node) ||
      false;
    setOpen(isChildFocused);
    setFocusedOption(null);
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
        setFocusedOption(null);
        break;
      }

      case 'Enter':
      case 'Space': {
        if (isOpen) {
          event.preventDefault();
        }

        if (!isNull(focusedOption)) {
          toggleSelection(focusedOption);
        }
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

  const placeholderValue =
    multiselect && isArray(selection) && selection.length > 0
      ? undefined
      : placeholder;

  return (
    <ComboboxContext.Provider
      value={{
        multiselect,
        darkMode,
        size,
        withIcons,
      }}
    >
      <div
        className={cx(
          comboboxParentStyle({ darkMode, size, overflow }),
          className,
        )}
        {...rest}
      >
        <div>
          {label && (
            <Label id={labelId} htmlFor={inputId}>
              {label}
            </Label>
          )}
          {description && <Description>{description}</Description>}
        </div>

        <InteractionRing className={interactionRingStyle} disabled={disabled}>
          {/* Disable eslint: onClick sets focus. Key events would already have focus */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            ref={comboboxRef}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-owns={menuId}
            tabIndex={-1}
            className={cx(comboboxStyle)}
            onClick={setInputFocus}
            onFocus={openMenu}
            data-disabled={disabled}
            data-multiselect={multiselect}
            // Add/remove this attribute to force the menu to rerender
            data-is-open={hasMenuBeenOpened || undefined}
          >
            <div
              ref={inputWrapperRef}
              className={inputWrapperStyle({ overflow, isOpen, selection })}
            >
              {renderedChips}
              <input
                aria-label={ariaLabel ?? label}
                aria-autocomplete="list"
                aria-controls={menuId}
                aria-labelledby={labelId}
                ref={inputRef}
                id={inputId}
                className={inputElementStyle}
                placeholder={placeholderValue}
                disabled={disabled ?? undefined}
                onChange={handleInputChange}
              />
            </div>
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
          refEl={comboboxRef}
          adjustOnMutation={true}
          className={menuWrapperStyle({ darkMode, size, width: menuWidth })}
        >
          <div id={menuId} ref={menuRef} className={menuStyle}>
            {renderedMenuContents}
          </div>
        </Popover>
      </div>
    </ComboboxContext.Provider>
  );
}
