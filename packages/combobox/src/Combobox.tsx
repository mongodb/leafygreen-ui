import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Description, Label } from '@leafygreen-ui/typography';
import Popover from '@leafygreen-ui/popover';
import { useEventListener, useIdAllocator } from '@leafygreen-ui/hooks';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentType } from '@leafygreen-ui/lib';
import { isArray, isNull, isUndefined, kebabCase, startCase } from 'lodash';
import { ComboboxProps } from './Combobox.types';
import { ComboboxContext } from './ComboboxContext';
import { InternalComboboxOption } from './ComboboxOption';
import Chip from './Chip';
import {
  comboboxParentStyle,
  comboboxStyle,
  inputElementStyle,
  inputWrapperStyle,
  interactionRingStyle,
  menuList,
  menuMessage,
  menuStyle,
  menuWrapperStyle,
} from './Combobox.styles';

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
  overflow = 'expand-y',
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

  const scrollToEnd = () => {
    if (inputWrapperRef.current) {
      inputWrapperRef.current.scrollLeft = inputWrapperRef.current?.scrollWidth;
    }
  };

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

        const setSelected = () => {
          toggleSelection(index);
        };

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

  const getIndexOfOption = (value: string): number | undefined => {
    const index =
      renderedOptions?.findIndex(({ props }) => props.value === value) ?? -1;

    if (index >= 0) {
      return index;
    } else {
      // TODO - errorOnce
      console.error(
        `Error in Combobox: Could not find value "${value}" in options`,
      );
    }
  };

  // Set initialValue
  useEffect(() => {
    if (initialValue) {
      if (isArray(initialValue)) {
        const indexArray = initialValue
          .map(value => getIndexOfOption(value))
          .filter(index => !isUndefined(index));

        setSelection(indexArray as Array<number>);
      } else {
        const index = getIndexOfOption(initialValue);

        if (!isUndefined(index)) {
          setSelection(index);
        }
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
      scrollToEnd();
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

  // Fired when the wrapper gains focus
  const handleInputFocus = () => {
    scrollToEnd();
    openMenu();
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

    // TODO - if keydown is a character, (and input is not focused)
    // then set focus to the input and add that character

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
          {/* TODO - add error state message */}
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
            onFocus={handleInputFocus}
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

            {/* TODO - add `clearable` button */}
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
