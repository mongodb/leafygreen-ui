import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { clone, isArray, isNull, isString } from 'lodash';
import { Description, Label } from '@leafygreen-ui/typography';
import Popover from '@leafygreen-ui/popover';
import {
  useDynamicRefs,
  useEventListener,
  useIdAllocator,
  usePrevious,
  useViewportSize,
} from '@leafygreen-ui/hooks';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
import {
  ComboboxProps,
  getNullSelection,
  onChangeType,
  SelectValueType,
} from './Combobox.types';
import { ComboboxContext } from './ComboboxContext';
import { InternalComboboxOption } from './ComboboxOption';
import { Chip } from './Chip';
import {
  clearButton,
  comboboxParentStyle,
  comboboxStyle,
  endIcon,
  errorMessageStyle,
  inputElementStyle,
  inputWrapperStyle,
  interactionRingColor,
  interactionRingStyle,
  loadingIconStyle,
  menuList,
  menuMessage,
  menuStyle,
  menuWrapperStyle,
} from './Combobox.styles';
import { InternalComboboxGroup } from './ComboboxGroup';
import { getNameAndValue } from './util';

// TODO - remove
const DEFAULT_OPEN = false;

/**
 * Component
 */
export default function Combobox<M extends boolean>({
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
  searchEmptyMessage = 'No results found',
  searchErrorMessage = 'Could not get results!',
  searchLoadingMessage = 'Loading results...',
  onFilter,
  clearable = true,
  onClear,
  overflow = 'expand-y',
  className,
  multiselect = false as M,
  initialValue,
  onChange,
  updateValue,
  chipTruncationLocation,
  chipCharacterLimit = 12,
  filter,
  ...rest
}: ComboboxProps<M>) {
  const getOptionRef = useDynamicRefs<HTMLLIElement>({ prefix: 'option' });
  const getChipRef = useDynamicRefs<HTMLSpanElement>({ prefix: 'chip' });

  const inputId = useIdAllocator({ prefix: 'combobox-input' });
  const labelId = useIdAllocator({ prefix: 'combobox-label' });
  const menuId = useIdAllocator({ prefix: 'combobox-menu' });

  const comboboxRef = useRef<HTMLDivElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setOpen] = useState(DEFAULT_OPEN);
  const [focusedOption, setFocusedOption] = useState<string | null>(null);
  const [selection, setSelection] = useState<SelectValueType<M> | null>(null);
  const prevSelection = usePrevious(selection);
  const [inputValue, setInputValue] = useState<string>('');
  const prevValue = usePrevious(inputValue);
  const [focusedChip, setFocusedChip] = useState<string | null>(null);

  const doesSelectionExist =
    !isNull(selection) &&
    ((isArray(selection) && selection.length > 0) || isString(selection));

  // Tells typescript that selection is multiselect
  const isMultiselect = useCallback(
    <T extends number | string>(test: Array<T> | T | null): test is Array<T> =>
      multiselect && isArray(test),
    [multiselect],
  );

  // Force focus of input box
  const setInputFocus = useCallback(() => {
    if (!disabled) {
      inputRef?.current?.focus();
    }
  }, [disabled]);

  // Update selection differently in mulit & single select
  const updateSelection = useCallback(
    (value: string | null) => {
      if (isString(value)) {
        let newSelection: SelectValueType<M>;

        // MULTISELECT
        if (isMultiselect(selection)) {
          newSelection = clone(selection);
          if (selection.includes(value)) {
            // remove from array
            newSelection.splice(newSelection.indexOf(value), 1);
          } else {
            // add to array
            newSelection.push(value);
            // clear text
            setInputValue('');
          }
        } else {
          // SINGLE SELECT
          newSelection = value as SelectValueType<M>;
        }
        setSelection(newSelection);
        setInputFocus();
      } else {
        const newSelection: SelectValueType<M> = getNullSelection(multiselect);
        setSelection(newSelection);
      }
    },
    [isMultiselect, multiselect, selection, setInputFocus],
  );

  // Scrolls the combobox to the far right
  // Used when `overflow == 'scroll-x'`
  const scrollToEnd = () => {
    if (inputWrapperRef.current) {
      inputWrapperRef.current.scrollTo({
        left: inputWrapperRef.current?.scrollWidth,
      });
    }
  };

  // Computes whether the option is visible based on the current input
  const isValueVisible = useCallback(
    (name: string): boolean => {
      switch (filter) {
        case 'starts-with':
          return name.toLowerCase().startsWith(inputValue.toLowerCase());

        case 'includes':
          return name.toLowerCase().includes(inputValue.toLowerCase());

        default:
          return true;
      }
    },
    [filter, inputValue],
  );

  const placeholderValue =
    multiselect && isArray(selection) && selection.length > 0
      ? undefined
      : placeholder;

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
  interface OptionObject {
    value: string;
    displayName: string;
    hasGlyph?: boolean;
  }

  const flattenChildren = useCallback(
    (_children: React.ReactNode): Array<OptionObject> => {
      // TS doesn't like .reduce
      // @ts-expect-error
      return React.Children.toArray(_children).reduce(
        // @ts-expect-error
        (
          acc: Array<OptionObject>,
          child: React.ReactNode,
        ): Array<OptionObject> | undefined => {
          if (isComponentType(child, 'ComboboxOption')) {
            const { value, displayName } = getNameAndValue(child.props);
            const { glyph } = child.props;

            return [
              ...acc,
              {
                value,
                displayName,
                hasGlyph: !!glyph,
              },
            ];
          } else if (isComponentType(child, 'ComboboxGroup')) {
            const { children } = child.props;

            if (children) {
              return [...acc, ...flattenChildren(children)];
            }
          }
        },
        [] as Array<OptionObject>,
      );
    },
    [],
  );

  const allOptions = useMemo(() => flattenChildren(children), [
    children,
    flattenChildren,
  ]);

  const filteredOptions = allOptions.filter(opt =>
    isValueVisible(opt.displayName),
  );

  const getDisplayNameForValue = useCallback(
    (value: string | null): string => {
      return value
        ? allOptions.find(opt => opt.value === value)?.displayName ?? ''
        : '';
    },
    [allOptions],
  );

  const valueExists = useCallback(
    (value: string): boolean => {
      return !!allOptions.find(opt => opt.value === value);
    },
    [allOptions],
  );

  const getValueAtIndex = useCallback(
    (index: number): string | undefined => {
      const value = filteredOptions[index]?.value;

      if (value) {
        return value;
      }
    },
    [filteredOptions],
  );

  /**
   *
   * Rendering
   *
   */
  const renderInternalOptions = useCallback(
    (_children: React.ReactNode) => {
      return React.Children.map(_children, child => {
        if (isComponentType(child, 'ComboboxOption')) {
          const { value, displayName } = getNameAndValue(child.props);

          if (isValueVisible(displayName)) {
            const { className, glyph } = child.props;
            const index = allOptions.findIndex(opt => opt.value === value);

            const isFocused = focusedOption === value;
            const isSelected = isMultiselect(selection)
              ? selection.includes(value)
              : selection === value;

            const setSelected = () => {
              setFocusedOption(value);
              updateSelection(value);
            };

            const optionRef = getOptionRef(value);

            return (
              <InternalComboboxOption
                value={value}
                displayName={displayName}
                isFocused={isFocused}
                isSelected={isSelected}
                setSelected={setSelected}
                glyph={glyph}
                className={className}
                index={index}
                ref={optionRef}
              />
            );
          }
        } else if (isComponentType(child, 'ComboboxGroup')) {
          const nestedChildren = renderInternalOptions(child.props.children);

          if (nestedChildren && nestedChildren?.length >= 0) {
            return (
              <InternalComboboxGroup
                label={child.props.label}
                className={child.props.className}
              >
                {renderInternalOptions(nestedChildren)}
              </InternalComboboxGroup>
            );
          }
        }
      });
    },
    [
      allOptions,
      focusedOption,
      getOptionRef,
      isMultiselect,
      isValueVisible,
      selection,
      updateSelection,
    ],
  );

  const renderedOptions = useMemo(() => renderInternalOptions(children), [
    children,
    renderInternalOptions,
  ]);

  const renderedChips = useMemo(() => {
    if (isMultiselect(selection) && renderedOptions) {
      return selection.map(value => {
        const displayName = getDisplayNameForValue(value);

        const onRemove = () => {
          console.log(`Removing ${value}`);
          updateSelection(value);
        };

        const isFocused = focusedChip === value;
        const chipRef = getChipRef(value);

        return (
          <Chip
            key={value}
            displayName={displayName}
            onRemove={onRemove}
            isFocused={isFocused}
            ref={chipRef}
          />
        );
      });
    }
  }, [
    isMultiselect,
    selection,
    renderedOptions,
    getDisplayNameForValue,
    focusedChip,
    getChipRef,
    updateSelection,
  ]);

  const renderedInputIcons = useMemo(() => {
    return (
      <>
        {clearable && doesSelectionExist && (
          <IconButton
            ref={clearButtonRef}
            onClick={() => updateSelection(null)}
            aria-label="Clear selection"
            onFocus={handleClearButtonFocus}
            className={clearButton}
          >
            <Icon glyph="XWithCircle" />
          </IconButton>
        )}
        {state === 'error' ? (
          <Icon glyph="Warning" color={uiColors.red.base} className={endIcon} />
        ) : (
          <Icon glyph="CaretDown" className={endIcon} />
        )}
      </>
    );
  }, [state, clearable, doesSelectionExist, updateSelection]);

  // Do any of the options have an icon?
  const withIcons = useMemo(() => allOptions.some(opt => opt.hasGlyph), [
    allOptions,
  ]);

  /**
   *
   * Focus Management
   *
   */
  type Direction = 'next' | 'prev' | 'first' | 'last';
  const updateFocusedOption = useCallback(
    (direction: Direction) => {
      const optionsCount = filteredOptions?.length ?? 0;
      const lastIndex = optionsCount - 1 > 0 ? optionsCount - 1 : 0;

      const indexOfFocus =
        filteredOptions?.findIndex(option => option.value === focusedOption) ??
        0;

      // Remove focus from chip
      if (direction) {
        setFocusedChip(null);
        setInputFocus();
      }

      switch (direction) {
        case 'next': {
          const newValue =
            indexOfFocus + 1 < optionsCount
              ? getValueAtIndex(indexOfFocus + 1)
              : getValueAtIndex(0);

          setFocusedOption(newValue ?? null);
          break;
        }

        case 'prev': {
          const newValue =
            indexOfFocus - 1 >= 0
              ? getValueAtIndex(indexOfFocus - 1)
              : getValueAtIndex(lastIndex);

          setFocusedOption(newValue ?? null);
          break;
        }

        case 'last': {
          const newValue = getValueAtIndex(lastIndex);
          setFocusedOption(newValue ?? null);
          break;
        }

        case 'first':
        default: {
          const newValue = getValueAtIndex(0);
          setFocusedOption(newValue ?? null);
        }
      }
    },
    [filteredOptions, focusedOption, getValueAtIndex, setInputFocus],
  );

  const updateFocusedChip = useCallback(
    (direction: Direction) => {
      const isFocusOnChip =
        isMultiselect(selection) &&
        selection.some(value =>
          getChipRef(value)?.current?.contains(document.activeElement),
        );
      const isFocusOnInput = inputRef.current?.contains(document.activeElement);
      const isFocusOnClearButton = clearButtonRef.current?.contains(
        document.activeElement,
      );
      const getActiveChipIndex = () =>
        isMultiselect(selection)
          ? selection.findIndex(value =>
              getChipRef(value)?.current?.contains(document.activeElement),
            )
          : -1;

      // Remove focus from menu
      if (direction) setFocusedOption(null);

      switch (direction) {
        case 'next':
          if (isFocusOnInput) {
            clearButtonRef.current?.focus();
          } else if (isFocusOnChip) {
            const activeChipIndex = getActiveChipIndex();

            if (activeChipIndex === selection?.length - 1) {
              // if focus is on last chip, go to input
              setInputFocus();
            } else {
              // if focus is on chip, go to next chip
              const nextChipValue = selection[activeChipIndex + 1];
              setFocusedChip(nextChipValue);
              break;
            }
          }
          setFocusedChip(null);
          break;

        case 'prev':
          if (isFocusOnClearButton) {
            // if focus is on clear button, go to input
            setInputFocus();
          } else if (
            isMultiselect(selection) &&
            (isFocusOnInput || isFocusOnChip)
          ) {
            const activeChipIndex = getActiveChipIndex();

            if (activeChipIndex > 0 || isFocusOnInput) {
              // if focus is on first chip, do nothing
              // if focus is on chip or input, go to prev chip
              const prevChipValue =
                activeChipIndex > 0
                  ? selection[activeChipIndex - 1]
                  : selection[selection.length - 1];
              setFocusedChip(prevChipValue);
              break;
            }
          }
          setFocusedChip(null);
          break;

        default:
          setFocusedChip(null);
          break;
      }
    },
    [getChipRef, isMultiselect, selection, setInputFocus],
  );

  // Update the focused option when the inputValue changes
  useEffect(() => {
    if (inputValue !== prevValue) {
      updateFocusedOption('first');
    }
  }, [inputValue, prevValue, updateFocusedOption]);

  // When the focused option chenges, update the menu scroll if necessary
  useEffect(() => {
    if (focusedOption) {
      const focusedElementRef = getOptionRef(focusedOption);

      if (focusedElementRef && focusedElementRef.current && menuRef.current) {
        const { offsetTop: optionTop } = focusedElementRef.current;
        const {
          scrollTop: menuScroll,
          offsetHeight: menuHeight,
        } = menuRef.current;

        if (optionTop > menuHeight || optionTop < menuScroll) {
          menuRef.current.scrollTo({ top: optionTop });
        }
      }
    }
  }, [focusedOption, getOptionRef]);

  /**
   *
   * Selection Management
   *
   */

  // Set initialValue
  useEffect(() => {
    if (initialValue) {
      if (isArray(initialValue)) {
        // Ensure the values we set are real options
        const filteredValue =
          initialValue.filter(value => valueExists(value)) ?? [];
        setSelection(filteredValue as SelectValueType<M>);
      } else {
        if (valueExists(initialValue)) {
          setSelection(initialValue);
        }
      }
    } else {
      setSelection(getNullSelection(multiselect));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // onSelect: When the selection changes...
  useEffect(() => {
    if (selection !== prevSelection) {
      if (doesSelectionExist) {
        if (isMultiselect(selection)) {
          // Scroll the wrapper to the end. No effect if not `overflow="scroll-x"`
          scrollToEnd();
          (onChange as onChangeType<true>)?.(selection);
        } else if (!isMultiselect(selection)) {
          // Update the text input
          setInputValue(getDisplayNameForValue(selection) ?? '');
          (onChange as onChangeType<false>)?.(selection);
          closeMenu();
        }
      } else {
        setInputValue('');
      }
    }
  }, [
    doesSelectionExist,
    getDisplayNameForValue,
    isMultiselect,
    onChange,
    prevSelection,
    selection,
  ]);

  // when the menu closes, update the value
  useEffect(() => {
    if (!isOpen && !isMultiselect(selection) && selection === prevSelection) {
      setInputValue(getDisplayNameForValue(selection) ?? '');
    }
  }, [getDisplayNameForValue, isMultiselect, isOpen, prevSelection, selection]);

  /**
   *
   * Menu management
   *
   */
  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);

  const [menuWidth, setMenuWidth] = useState(0);
  useEffect(() => {
    setMenuWidth(comboboxRef.current?.clientWidth ?? 0);
  }, [comboboxRef, isOpen, focusedOption, selection]);
  const handleTransitionEnd = () => {
    setMenuWidth(comboboxRef.current?.clientWidth ?? 0);
  };

  const renderedMenuContents = useMemo((): JSX.Element => {
    switch (searchState) {
      case 'loading': {
        return (
          <span className={menuMessage}>
            <Icon
              glyph="Refresh"
              color={uiColors.blue.base}
              className={loadingIconStyle}
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
          return <ul className={menuList}>{renderedOptions}</ul>;
        }

        return <span className={menuMessage}>{searchEmptyMessage}</span>;
      }
    }
  }, [
    renderedOptions,
    searchEmptyMessage,
    searchErrorMessage,
    searchLoadingMessage,
    searchState,
  ]);

  const viewportSize = useViewportSize();

  // Set the max height of the menu
  const maxHeight = useMemo(() => {
    // TODO - consolidate this hook with Select/ListMenu
    const maxMenuHeight = 274;
    const menuMargin = 8;

    if (viewportSize && comboboxRef.current && menuRef.current) {
      const {
        top: triggerTop,
        bottom: triggerBottom,
      } = comboboxRef.current.getBoundingClientRect();

      // Find out how much space is available above or below the trigger
      const safeSpace = Math.max(
        viewportSize.height - triggerBottom,
        triggerTop,
      );

      // if there's more than enough space, set to maxMenuHeight
      // otherwise fill the space available
      return Math.min(maxMenuHeight, safeSpace - menuMargin);
    }

    return maxMenuHeight;
  }, [viewportSize, comboboxRef, menuRef]);

  // Scroll the menu when the focus changes
  useEffect(() => {
    // get the focused option
  }, [focusedOption]);

  /**
   *
   * Event Handlers
   *
   */
  // Fired when the wrapper gains focus
  const handleInputFocus = () => {
    scrollToEnd();
    openMenu();
  };

  // Fired onChange
  const handleInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
    // fire any filter function passed in
    onFilter?.(value);
  };

  const handleClearButtonFocus = () => {
    setFocusedOption(null);
  };

  /**
   *
   * Global Event Handlers
   *
   */
  // Global backdrop click handler
  const handleBackdropClick = ({ target }: MouseEvent) => {
    const isChildFocused =
      menuRef.current?.contains(target as Node) ||
      comboboxRef.current?.contains(target as Node) ||
      false;
    setOpen(isChildFocused);
  };
  useEventListener('mousedown', handleBackdropClick);

  // Global keypress handler
  const handleKeyDown = (event: KeyboardEvent) => {
    const isFocusInMenu = menuRef.current?.contains(document.activeElement);
    const isFocusOnCombobox = comboboxRef.current?.contains(
      document.activeElement,
    );

    const isFocusInComponent = isFocusOnCombobox || isFocusInMenu;

    if (isFocusInComponent) {
      // No support for modifiers yet
      if (event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      switch (event.keyCode) {
        case keyMap.Tab:
        case keyMap.Escape: {
          closeMenu();
          updateFocusedOption('first');
          break;
        }

        case keyMap.Enter:
        case keyMap.Space: {
          // if (isOpen) {
          //   event.preventDefault();
          // }

          if (
            document.activeElement === inputRef.current &&
            !isNull(focusedOption)
          ) {
            updateSelection(focusedOption);
          } else if (document.activeElement === clearButtonRef.current) {
            updateSelection(null);
            setInputFocus();
          }
          break;
        }

        case keyMap.ArrowDown: {
          if (isOpen) {
            // Prevent the page from scrolling
            event.preventDefault();
          }

          updateFocusedOption('next');
          break;
        }

        case keyMap.ArrowUp: {
          if (isOpen) {
            // Prevent the page from scrolling
            event.preventDefault();
          }
          updateFocusedOption('prev');
          break;
        }

        case keyMap.ArrowRight: {
          updateFocusedChip('next');
          break;
        }

        case keyMap.ArrowLeft: {
          updateFocusedChip('prev');
          break;
        }
      }
    }
  };
  useEventListener('keydown', handleKeyDown);

  return (
    <ComboboxContext.Provider
      value={{
        multiselect,
        darkMode,
        size,
        withIcons,
        chipTruncationLocation,
        chipCharacterLimit,
        filter,
        inputValue,
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

        <InteractionRing
          className={interactionRingStyle}
          disabled={disabled}
          color={interactionRingColor({ state, darkMode })}
        >
          {/* Disable eslint: onClick sets focus. Key events would already have focus */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            ref={comboboxRef}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-owns={menuId}
            tabIndex={-1}
            className={comboboxStyle}
            onClick={setInputFocus}
            onFocus={handleInputFocus}
            onTransitionEnd={handleTransitionEnd}
            data-disabled={disabled}
            data-state={state}
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
                value={inputValue}
              />
            </div>
            {renderedInputIcons}
          </div>
        </InteractionRing>

        {state === 'error' && errorMessage && (
          <div className={errorMessageStyle}>{errorMessage}</div>
        )}

        {/******* /
          *  Menu  *
          / *******/}
        <Popover
          active={isOpen && !disabled}
          spacing={4}
          align="bottom"
          justify="start"
          refEl={comboboxRef}
          adjustOnMutation={true}
          className={menuWrapperStyle({ darkMode, size, width: menuWidth })}
        >
          <div
            role="listbox"
            aria-labelledby={labelId}
            aria-expanded={isOpen}
            id={menuId}
            ref={menuRef}
            className={menuStyle({ maxHeight })}
          >
            {renderedMenuContents}
          </div>
        </Popover>
      </div>
    </ComboboxContext.Provider>
  );
}
