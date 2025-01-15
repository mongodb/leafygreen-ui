import React, {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  TransitionEventHandler,
  UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import clone from 'lodash/clone';
import debounce from 'lodash/debounce';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';

import { cx } from '@leafygreen-ui/emotion';
import { DEFAULT_MESSAGES, FormFieldFeedback } from '@leafygreen-ui/form-field';
import {
  useAutoScroll,
  useBackdropClick,
  useDynamicRefs,
  useIdAllocator,
  usePrevious,
} from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  PopoverPropsProvider,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce, isComponentType, keyMap } from '@leafygreen-ui/lib';
import {
  DismissMode,
  getPopoverRenderModeProps,
  RenderMode,
} from '@leafygreen-ui/popover';
import { Description, Label } from '@leafygreen-ui/typography';

import { ComboboxChip } from '../ComboboxChip';
import { ComboboxContext } from '../ComboboxContext';
import { InternalComboboxGroup } from '../ComboboxGroup';
import { ComboboxMenu } from '../ComboboxMenu';
import { OptionObject } from '../ComboboxOption';
import { InternalComboboxOption } from '../ComboboxOption';
import {
  ComboboxElement,
  ComboboxSize,
  DiffObject,
  getNullSelection,
  onChangeType,
  Overflow,
  SelectValueType,
} from '../types';
import {
  checkScrollPosition,
  flattenChildren,
  getDisplayNameForValue,
  getNameAndValue,
  getOptionObjectFromValue,
  getValueForDisplayName,
} from '../utils';
import { doesSelectionExist } from '../utils/doesSelectionExist';

import { isValueCurrentSelection } from './utils/isValueCurrentSelection';
import {
  baseComboboxStyles,
  baseInputElementStyle,
  clearButtonStyle,
  comboboxFocusStyle,
  comboboxOverflowShadowStyles,
  comboboxParentStyle,
  comboboxSizeStyles,
  comboboxThemeStyles,
  getCaretIconDisabledFill,
  getCaretIconFill,
  getComboboxDisabledStyles,
  getComboboxStateStyles,
  iconStyle,
  iconsWrapperBaseStyles,
  iconsWrapperSizeStyles,
  inputElementDisabledThemeStyle,
  inputElementSizeStyle,
  inputElementThemeStyle,
  inputElementTransitionStyles,
  inputWrapperStyle,
  labelDescriptionContainerStyle,
  labelDescriptionLargeStyles,
  multiselectInputElementStyle,
} from './Combobox.styles';
import { ComboboxProps } from './Combobox.types';

/**
 * Combobox is a combination of a Select and TextInput,
 * allowing the user to either type a value directly or select a value from the list.
 * Can be configured to select a single or multiple options.
 */
export function Combobox<M extends boolean>({
  children,
  label,
  description,
  placeholder = 'Select',
  'aria-label': ariaLabel,
  disabled = false,
  size = ComboboxSize.Default,
  darkMode: darkModeProp,
  state = 'none',
  errorMessage = DEFAULT_MESSAGES.error,
  successMessage = DEFAULT_MESSAGES.success,
  searchState = 'unset',
  searchEmptyMessage = 'No results found',
  searchErrorMessage = 'Could not get results!',
  searchLoadingMessage = 'Loading results...',
  filteredOptions,
  onFilter,
  clearable = true,
  onClear,
  overflow = Overflow.expandY,
  multiselect = false as M,
  initialValue,
  inputValue: inputValueProp,
  onInputChange,
  onChange,
  value,
  chipTruncationLocation,
  chipCharacterLimit = 12,
  className,
  renderMode = RenderMode.TopLayer,
  portalClassName,
  portalContainer,
  portalRef,
  scrollContainer,
  popoverZIndex,
  ...rest
}: ComboboxProps<M>) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
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

  const [isOpen, setOpen] = useState(false);
  const wasOpen = usePrevious(isOpen);
  const [highlightedOption, setHighlightedOption] = useState<string | null>(
    null,
  );
  const [selection, setSelection] = useState<SelectValueType<M> | null>(null);
  const prevSelection = usePrevious(selection);
  const [inputValue, setInputValue] = useState<string>(inputValueProp ?? '');

  useEffect(() => {
    if (!isUndefined(inputValueProp)) {
      setInputValue(inputValueProp);
    }
  }, [inputValueProp]);

  const updateInputValue = (newInputVal: string) => {
    setInputValue(newInputVal);
  };

  const prevValue = usePrevious(inputValue);
  const [focusedChip, setFocusedChip] = useState<string | null>(null);
  const [shouldShowOverflowShadow, setShouldShowOverflowShadow] =
    useState<boolean>(false);

  const placeholderValue =
    multiselect && isArray(selection) && selection.length > 0
      ? undefined
      : placeholder;

  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);

  /**
   * Array of all of the options objects
   */
  const allOptions: Array<OptionObject> = useMemo(
    () => flattenChildren(children),
    [children],
  );

  /**
   * Utility function that tells Typescript whether selection is multiselect
   */
  const isMultiselect = useCallback(
    <T extends string>(val?: Array<T> | T | null): val is Array<T> => {
      if (multiselect && (typeof val == 'string' || typeof val == 'number')) {
        consoleOnce.error(
          `Error in Combobox: multiselect is set to \`true\`, but received a ${typeof val} value: "${val}"`,
        );
      } else if (!multiselect && isArray(val)) {
        consoleOnce.error(
          'Error in Combobox: multiselect is set to `false`, but received an Array value',
        );
      }

      return multiselect && isArray(val);
    },
    [multiselect],
  );

  /**
   * Forces focus of input box
   * @param cursorPos index the cursor should be set to
   */
  const setInputFocus = useCallback(
    (cursorPos?: number) => {
      if (!disabled && inputRef && inputRef.current) {
        inputRef.current.focus();
        if (!isUndefined(cursorPos)) {
          inputRef.current.setSelectionRange(cursorPos, cursorPos);
        }
      }
    },
    [disabled],
  );

  /**
   * Update selection.
   * This behaves differently in multi. vs single select.
   * @param value option value the selection should be set to
   */
  const updateSelection = useCallback(
    (value: string | null) => {
      if (isMultiselect(selection)) {
        // We know M is true here
        const newSelection: SelectValueType<true> = clone(selection);
        const multiselectOnChange = onChange as onChangeType<true>;
        const diff: DiffObject = {
          diffType: 'delete',
          value: value ?? selection,
        };

        if (isNull(value)) {
          newSelection.length = 0;
        } else {
          if (selection.includes(value)) {
            // remove from array
            newSelection.splice(newSelection.indexOf(value), 1);
          } else {
            // add to array
            newSelection.push(value);
            diff.diffType = 'insert';
            // clear text
            updateInputValue('');
          }
        }
        setSelection(newSelection as SelectValueType<M>);
        multiselectOnChange?.(newSelection, diff);
      } else {
        const newSelection: SelectValueType<false> = value;
        const singleSelectOnChange = onChange as onChangeType<false>;
        setSelection(newSelection as SelectValueType<M>);
        singleSelectOnChange?.(newSelection);
      }
    },
    [isMultiselect, onChange, selection],
  );

  /**
   * Returns whether given text is included in, or equal to, the current selection.
   * Similar to `isValueCurrentSelection`, but assumes the text argument is the `displayName` for the selection
   * @param text the text to check
   */
  const isTextCurrentSelection = useCallback(
    (text: string): boolean => {
      const value = getValueForDisplayName(text, allOptions);
      return isValueCurrentSelection(value, selection);
    },
    [allOptions, selection],
  );

  /**
   * Returns whether the provided option is disabled
   * @param option the option value or OptionObject to check
   */
  const isOptionDisabled = (option: string | OptionObject): boolean => {
    if (typeof option === 'string') {
      const optionObj = getOptionObjectFromValue(option, allOptions);
      return !!optionObj?.isDisabled;
    } else {
      return !!option.isDisabled;
    }
  };

  /**
   * Computes whether the option is visible based on the current input
   * @param option the option value or OptionObject to compute
   */
  const shouldOptionBeVisible = useCallback(
    (option: string | OptionObject): boolean => {
      const value = typeof option === 'string' ? option : option.value;

      // If filtered options are provided
      if (filteredOptions && filteredOptions.length > 0) {
        return filteredOptions.includes(value);
      }

      // If the text input value is the current selection
      // (or included in the selection)
      // then all options should be visible
      if (isTextCurrentSelection(inputValue)) {
        return true;
      }

      // otherwise, we do our own filtering
      const displayName =
        typeof option === 'string'
          ? getDisplayNameForValue(value, allOptions)
          : option.displayName;

      const isValueInDisplayName = displayName
        .toLowerCase()
        .includes(inputValue.toLowerCase());

      return isValueInDisplayName;
    },
    [filteredOptions, isTextCurrentSelection, inputValue, allOptions],
  );

  /**
   * The array of visible options objects
   */
  const visibleOptions: Array<OptionObject> = useMemo(
    () => allOptions.filter(shouldOptionBeVisible),
    [allOptions, shouldOptionBeVisible],
  );

  /**
   * Returns whether the given value is in the options array
   * @param value the value to check
   */
  const isValueValid = useCallback(
    (value: string | null): boolean => {
      return value ? !!allOptions.find(opt => opt.value === value) : false;
    },
    [allOptions],
  );

  /**
   * Returns the index of a given value in the array of visible (filtered) options
   * @param value the option value to get the index of
   */
  const getIndexOfValue = useCallback(
    (value: string | null): number => {
      return visibleOptions
        ? visibleOptions.findIndex(option => option.value === value)
        : -1;
    },
    [visibleOptions],
  );

  /**
   * Returns the option value of a given index in the array of visible (filtered) options
   * @param index the option index to get the value of
   */
  const getValueAtIndex = useCallback(
    (index: number): string | undefined => {
      if (visibleOptions && visibleOptions.length >= index) {
        const option = visibleOptions[index];
        return option ? option.value : undefined;
      }
    },
    [visibleOptions],
  );

  /**
   * Returns the index of the active chip in the selection array
   */
  const getActiveChipIndex = useCallback(
    () =>
      isMultiselect(selection)
        ? selection.findIndex(value =>
            getChipRef(value)?.current?.contains(document.activeElement),
          )
        : -1,
    [getChipRef, isMultiselect, selection],
  );

  /**
   *
   * Focus Management
   *
   */

  const [focusedElementName, trackFocusedElement] = useState<
    ComboboxElement | undefined
  >();
  const isElementFocused = (elementName: ComboboxElement) =>
    elementName === focusedElementName;

  type Direction = 'next' | 'prev' | 'first' | 'last';

  /**
   * Updates the highlighted menu option based on the provided direction
   * @param direction the direction to move the focus. `'next' | 'prev' | 'first' | 'last'`
   */
  const updateHighlightedOption = useCallback(
    (direction: Direction) => {
      const optionsCount = visibleOptions?.length ?? 0;
      const lastIndex = optionsCount - 1 > 0 ? optionsCount - 1 : 0;
      const indexOfHighlight = getIndexOfValue(highlightedOption);

      // Remove focus from chip
      if (direction && isOpen) {
        setFocusedChip(null);
        setInputFocus();
      }

      switch (direction) {
        case 'next': {
          const newValue =
            indexOfHighlight + 1 < optionsCount
              ? getValueAtIndex(indexOfHighlight + 1)
              : getValueAtIndex(0);

          setHighlightedOption(newValue ?? null);
          break;
        }

        case 'prev': {
          const newValue =
            indexOfHighlight - 1 >= 0
              ? getValueAtIndex(indexOfHighlight - 1)
              : getValueAtIndex(lastIndex);

          setHighlightedOption(newValue ?? null);
          break;
        }

        case 'last': {
          const newValue = getValueAtIndex(lastIndex);
          setHighlightedOption(newValue ?? null);
          break;
        }

        case 'first':
        default: {
          const newValue = getValueAtIndex(0);
          setHighlightedOption(newValue ?? null);
        }
      }
    },
    [
      highlightedOption,
      getIndexOfValue,
      getValueAtIndex,
      isOpen,
      setInputFocus,
      visibleOptions?.length,
    ],
  );

  /**
   * Updates the focused chip based on the provided direction
   * @param direction the direction to move the focus. `'next' | 'prev' | 'first' | 'last'`
   * @param relativeToIndex the chip index to move focus relative to
   */
  const updateFocusedChip = useCallback(
    (direction: Direction | null, relativeToIndex?: number) => {
      if (isMultiselect(selection)) {
        switch (direction) {
          case 'next': {
            const referenceChipIndex = relativeToIndex ?? getActiveChipIndex();
            const nextChipIndex =
              referenceChipIndex + 1 < selection.length
                ? referenceChipIndex + 1
                : selection.length - 1;
            const nextChipValue = selection[nextChipIndex];
            setFocusedChip(nextChipValue);
            break;
          }

          case 'prev': {
            const referenceChipIndex = relativeToIndex ?? getActiveChipIndex();
            const prevChipIndex =
              referenceChipIndex > 0
                ? referenceChipIndex - 1
                : referenceChipIndex < 0
                ? selection.length - 1
                : 0;
            const prevChipValue = selection[prevChipIndex];
            setFocusedChip(prevChipValue);
            break;
          }

          case 'first': {
            const firstChipValue = selection[0];
            setFocusedChip(firstChipValue);
            break;
          }

          case 'last': {
            const lastChipValue = selection[selection.length - 1];
            setFocusedChip(lastChipValue);
            break;
          }

          default:
            setFocusedChip(null);
            break;
        }
      }
    },
    [getActiveChipIndex, isMultiselect, selection],
  );

  /**
   * Handles an arrow key press
   */
  const handleArrowKey = useCallback(
    (direction: 'left' | 'right', event: React.KeyboardEvent<Element>) => {
      // Remove focus from menu
      if (direction) setHighlightedOption(null);

      switch (direction) {
        case 'right':
          switch (focusedElementName) {
            case ComboboxElement.Input: {
              // If cursor is at the end of the input
              if (
                inputRef.current?.selectionEnd ===
                inputRef.current?.value.length
              ) {
                clearButtonRef.current?.focus();
              }
              break;
            }

            case ComboboxElement.FirstChip:
            case ComboboxElement.MiddleChip:
            case ComboboxElement.LastChip: {
              if (
                focusedElementName === ComboboxElement.LastChip ||
                // the first chip is also the last chip (i.e. only one)
                selection?.length === 1
              ) {
                // if focus is on last chip, go to input
                setInputFocus(0);
                updateFocusedChip(null);
                event.preventDefault();
                break;
              }
              // First/middle chips
              updateFocusedChip('next');
              break;
            }

            case ComboboxElement.ClearButton:
            default:
              break;
          }
          break;

        case 'left':
          switch (focusedElementName) {
            case ComboboxElement.ClearButton: {
              event.preventDefault();
              setInputFocus(inputRef?.current?.value.length);
              break;
            }

            case ComboboxElement.Input:
            case ComboboxElement.MiddleChip:
            case ComboboxElement.LastChip: {
              if (isMultiselect(selection)) {
                // Break if cursor is not at the start of the input
                if (
                  focusedElementName === ComboboxElement.Input &&
                  inputRef.current?.selectionStart !== 0
                ) {
                  break;
                }

                updateFocusedChip('prev');
              }
              break;
            }

            case ComboboxElement.FirstChip:
            default:
              break;
          }
          break;
        default:
          updateFocusedChip(null);
          break;
      }
    },
    [
      focusedElementName,
      isMultiselect,
      selection,
      setInputFocus,
      updateFocusedChip,
    ],
  );

  // When the input value changes (or when the menu opens)
  // Update the focused option
  useEffect(() => {
    if (inputValue !== prevValue) {
      updateHighlightedOption('first');
    }
  }, [inputValue, isOpen, prevValue, updateHighlightedOption]);

  // When the focused option changes, update the menu scroll if necessary
  useAutoScroll(
    highlightedOption ? getOptionRef(highlightedOption) : undefined,
    menuRef,
  );

  /**
   * Rendering
   */

  /**
   * Callback to render a child as an <InternalComboboxOption> element
   */
  const renderOption = useCallback(
    (child: React.ReactNode) => {
      if (isComponentType(child, 'ComboboxOption')) {
        const { value, displayName } = getNameAndValue(child.props);

        if (shouldOptionBeVisible(value)) {
          const { className, glyph, disabled, ...rest } = child.props;
          const index = allOptions.findIndex(opt => opt.value === value);

          const isFocused = highlightedOption === value;
          const isSelected = isMultiselect(selection)
            ? selection.includes(value)
            : selection === value;

          const setSelected = () => {
            setHighlightedOption(value);
            updateSelection(value);
            setInputFocus();

            if (value === selection) {
              closeMenu();
            }
          };

          const optionRef = getOptionRef(value);

          return (
            <InternalComboboxOption
              {...rest}
              value={value}
              displayName={displayName}
              isFocused={isFocused}
              isSelected={isSelected}
              disabled={disabled}
              setSelected={setSelected}
              glyph={glyph}
              className={className}
              index={index}
              ref={optionRef}
            />
          );
        }
      } else if (isComponentType(child, 'ComboboxGroup')) {
        const nestedChildren = React.Children.map(
          child.props.children,
          renderOption,
        );

        if (nestedChildren && nestedChildren?.length > 0) {
          return (
            <InternalComboboxGroup
              label={child.props.label}
              className={child.props.className}
            >
              {React.Children.map(nestedChildren, renderOption)}
            </InternalComboboxGroup>
          );
        }
      }
    },
    [
      allOptions,
      getOptionRef,
      highlightedOption,
      isMultiselect,
      selection,
      setInputFocus,
      shouldOptionBeVisible,
      updateSelection,
    ],
  );

  /**
   * The rendered JSX elements for the options
   */
  const renderedOptionsJSX = useMemo(
    () => React.Children.map(children, renderOption),
    [children, renderOption],
  );

  /**
   * The rendered JSX for the selection Chips
   */
  const renderedChips = useMemo(() => {
    if (isMultiselect(selection)) {
      return selection.filter(isValueValid).map((value, index) => {
        const displayName = getDisplayNameForValue(value, allOptions);
        const isFocused = focusedChip === value;
        const chipRef = getChipRef(value);
        const isLastChip = index >= selection.length - 1;

        const onRemove = () => {
          if (isLastChip) {
            // Focus the input if this is the last chip in the set
            setInputFocus();
            updateFocusedChip(null);
          } else {
            updateFocusedChip('next', index);
          }
          updateSelection(value);
        };

        const onFocus = () => {
          setFocusedChip(value);
        };

        return (
          <ComboboxChip
            key={value}
            displayName={displayName}
            isFocused={isFocused}
            onRemove={onRemove}
            onFocus={onFocus}
            ref={chipRef}
          />
        );
      });
    }
  }, [
    isMultiselect,
    selection,
    isValueValid,
    allOptions,
    focusedChip,
    getChipRef,
    updateSelection,
    setInputFocus,
    updateFocusedChip,
  ]);

  /**
   * Flag to determine whether the rendered options have icons
   */
  const withIcons = useMemo(
    () => allOptions.some(opt => opt.hasGlyph),
    [allOptions],
  );

  /**
   *`
   * Selection Management
   *
   */

  const onCloseMenu = useCallback(() => {
    const exactMatchedOption = visibleOptions.find(
      option =>
        option.displayName === inputValue || option.value === inputValue,
    );

    // check if inputValue is matches a valid option
    // Set the selection to that value if the component is not controlled
    if (!value && exactMatchedOption) {
      updateSelection(exactMatchedOption.value);
    } else {
      if (!isMultiselect(selection)) {
        // Revert the value to the previous selection
        const displayName =
          getDisplayNameForValue(
            selection as SelectValueType<false>,
            allOptions,
          ) ?? prevSelection;
        updateInputValue(displayName);
      }
    }
  }, [
    allOptions,
    inputValue,
    isMultiselect,
    prevSelection,
    selection,
    updateSelection,
    value,
    visibleOptions,
  ]);

  /**
   * Side effects to run when the selection changes
   */
  const onSelect = useCallback(() => {
    if (doesSelectionExist(selection)) {
      if (isMultiselect(selection)) {
        scrollInputToEnd(overflow);
      } else if (!isMultiselect(selection)) {
        // Update the text input
        const displayName =
          getDisplayNameForValue(
            selection as SelectValueType<false>,
            allOptions,
          ) ?? '';
        updateInputValue(displayName);
        closeMenu();
      }
    } else {
      updateInputValue('');
    }
  }, [allOptions, isMultiselect, selection, overflow]);

  // Set the initialValue
  useEffect(() => {
    if (initialValue) {
      if (isArray(initialValue)) {
        // Ensure the values we set are real options
        const filteredValue =
          initialValue.filter(value => isValueValid(value)) ?? [];
        setSelection(filteredValue as SelectValueType<M>);
      } else {
        if (isValueValid(initialValue as string)) {
          setSelection(initialValue);
        }
      }
    } else {
      setSelection(getNullSelection(multiselect));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When controlled value changes, update the selection
  // TODO: use useControlledValue
  useEffect(() => {
    if (!isUndefined(value) && value !== prevValue) {
      if (isNull(value)) {
        setSelection(null);
      } else if (isMultiselect(value)) {
        // Ensure the value(s) passed in are valid options
        const newSelection = value.filter(isValueValid) as SelectValueType<M>;
        setSelection(newSelection);
      } else {
        setSelection(
          isValueValid(value as SelectValueType<false>) ? value : null,
        );
      }
    }
  }, [isMultiselect, isValueValid, prevValue, value]);

  // onSelect
  // Side effects to run when the selection changes
  useEffect(() => {
    const hasSelectionChanged =
      !isUndefined(prevSelection) &&
      ((isArray(selection) && !isNull(prevSelection)) ||
        isString(selection) ||
        isNull(selection)) &&
      !isEqual(selection, prevSelection);

    if (hasSelectionChanged) {
      onSelect();
    }
  }, [onSelect, prevSelection, selection]);

  // when the menu closes, update the value if needed
  useEffect(() => {
    if (!isOpen && wasOpen) {
      onCloseMenu();
    }
  }, [isOpen, wasOpen, onCloseMenu]);

  /**
   *
   * Menu management
   *
   */

  const [menuWidth, setMenuWidth] = useState(0);

  // When the menu opens, or the selection changes, or the focused option changes
  // update the menu width
  useEffect(() => {
    setMenuWidth(comboboxRef.current?.clientWidth ?? 0);
  }, [comboboxRef, isOpen, highlightedOption, selection]);

  /**
   *
   * Event Handlers
   *
   */

  // Handler fired when the menu has finished transitioning in/out
  const handleTransitionEnd: TransitionEventHandler<HTMLDivElement> = () => {
    setMenuWidth(comboboxRef.current?.clientWidth ?? 0);
  };

  // Prevent combobox from gaining focus by default
  const handleInputWrapperMousedown: MouseEventHandler<HTMLDivElement> = e => {
    if (disabled) {
      e.preventDefault();
    }
  };

  // Set focus to the input element on click
  const handleComboboxClick: MouseEventHandler<HTMLDivElement> = e => {
    // If we clicked the wrapper, not the input itself.
    // (Focus is set automatically if the click is on the input)
    if (e.target !== inputRef.current) {
      let cursorPos = 0;

      if (inputRef.current) {
        const mouseX = e.nativeEvent.offsetX;
        const inputRight =
          inputRef.current.offsetLeft + inputRef.current.clientWidth;
        cursorPos = mouseX > inputRight ? inputValue.length : 0;
      }

      setInputFocus(cursorPos);
    }

    // Only open the menu in response to a click
    openMenu();
  };

  // Fired whenever the wrapper gains focus,
  // and any time the focus within changes
  const handleComboboxFocus: FocusEventHandler<HTMLDivElement> = e => {
    scrollInputToEnd(overflow);
    trackFocusedElement(getNameFromElement(e.target));
  };

  // Fired onChange
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateInputValue(e.target.value);
    // fire any filter function passed in
    onFilter?.(e.target.value);
    onInputChange?.(e);
  };

  const handleClearButtonFocus: FocusEventHandler<HTMLButtonElement> = () => {
    setHighlightedOption(null);
  };

  const handleClearButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (!disabled) {
      // Prevents triggering the setOpen function called by clicking anywhere within the input wrapper.
      e.stopPropagation();
      updateSelection(null);
      onClear?.(e);
      onFilter?.('');
      setInputFocus();
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
    const isFocusInMenu = menuRef.current?.contains(document.activeElement);
    const isFocusOnCombobox = comboboxRef.current?.contains(
      document.activeElement,
    );

    const isFocusInComponent = isFocusOnCombobox || isFocusInMenu;

    // Only run if the focus is in the component
    if (isFocusInComponent) {
      // No support for modifiers yet
      // TODO - Handle support for multiple chip selection
      if (event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      switch (event.key) {
        case keyMap.Tab: {
          switch (focusedElementName) {
            case 'Input': {
              if (!doesSelectionExist(selection)) {
                closeMenu();
                updateHighlightedOption('first');
                updateFocusedChip(null);
              }
              // else use default behavior
              break;
            }

            case 'LastChip': {
              // use default behavior
              updateFocusedChip(null);
              break;
            }

            case 'FirstChip':
            case 'MiddleChip': {
              // use default behavior
              break;
            }

            case 'ClearButton':
            default:
              break;
          }

          break;
        }

        case keyMap.Escape: {
          closeMenu();
          updateHighlightedOption('first');
          break;
        }

        case keyMap.Enter: {
          if (!isOpen) {
            openMenu();
          } else if (
            // Select the highlighted option if
            // the menu is open,
            // we're focused on input element,
            // and the highlighted option is not disabled
            isOpen &&
            focusedElementName === ComboboxElement.Input &&
            !isNull(highlightedOption) &&
            !isOptionDisabled(highlightedOption)
          ) {
            updateSelection(highlightedOption);
          } else if (
            // Focused on clear button
            focusedElementName === ComboboxElement.ClearButton
          ) {
            updateSelection(null);
            setInputFocus();
          }
          break;
        }

        case keyMap.Backspace: {
          // Backspace key focuses last chip if the input is focused
          // Note: Chip removal behavior is handled in `onRemove` defined in `renderChips`
          if (isMultiselect(selection)) {
            if (
              focusedElementName === 'Input' &&
              inputRef.current?.selectionStart === 0
            ) {
              updateFocusedChip('last');
            }
          }
          // Open the menu regardless
          openMenu();
          break;
        }

        case keyMap.ArrowDown: {
          if (isOpen) {
            // Prevent the page from scrolling
            event.preventDefault();
            // only change option if the menu is already open
            updateHighlightedOption('next');
          } else {
            openMenu();
          }
          break;
        }

        case keyMap.ArrowUp: {
          if (isOpen) {
            // Prevent the page from scrolling
            event.preventDefault();
            // only change option if the menu is already open
            updateHighlightedOption('prev');
          } else {
            openMenu();
          }
          break;
        }

        case keyMap.ArrowRight: {
          handleArrowKey('right', event);
          break;
        }

        case keyMap.ArrowLeft: {
          handleArrowKey('left', event);
          break;
        }

        default: {
          if (!isOpen) {
            openMenu();
          }
        }
      }
    }
  };

  /**
   *
   * Global Event Handler
   *
   */

  useBackdropClick(closeMenu, [menuRef, comboboxRef], isOpen);

  /**
   * Checks if multi-select and if there are chips selected. The left padding of the wrapper changes when there are chips selected so we use this to conditionally change the padding.
   */
  const isMultiselectWithSelections =
    isMultiselect(selection) && !!selection.length;

  /**
   * Function that calls the `checkScrollPosition` util to check the scroll position
   */
  const handleInputWrapperScroll = (e: UIEvent<HTMLDivElement>) => {
    setShouldShowOverflowShadow(checkScrollPosition(e.target as HTMLElement));
  };

  const debounceScroll = debounce(handleInputWrapperScroll, 50, {
    leading: true,
  });

  /**
   * Function called on scroll of the inputWrapperRef container
   */
  const handleOnScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (overflow === Overflow.expandY) {
        debounceScroll(e);
      }
    },
    [debounceScroll, overflow],
  );

  /**
   * On load check if an overflow shadow should be visible
   */
  useEffect(() => {
    if (inputWrapperRef.current) {
      setShouldShowOverflowShadow(checkScrollPosition(inputWrapperRef.current));
    }
  }, []);

  const popoverProps = {
    popoverZIndex,
    ...getPopoverRenderModeProps({
      dismissMode: DismissMode.Manual,
      portalClassName,
      portalContainer,
      portalRef,
      renderMode,
      scrollContainer,
    }),
  } as const;

  const formFieldFeedbackProps = {
    disabled,
    errorMessage,
    size,
    state,
    successMessage,
  } as const;

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ComboboxContext.Provider
        value={{
          multiselect,
          size,
          withIcons,
          disabled,
          isOpen,
          state,
          searchState,
          chipTruncationLocation,
          chipCharacterLimit,
          inputValue,
          overflow,
          popoverZIndex,
        }}
      >
        <div className={cx(comboboxParentStyle(size), className)} {...rest}>
          {(label || description) && (
            <div className={labelDescriptionContainerStyle}>
              {label && (
                <Label
                  id={labelId}
                  htmlFor={inputId}
                  darkMode={darkMode}
                  disabled={disabled}
                  className={cx({
                    [labelDescriptionLargeStyles]: size === ComboboxSize.Large,
                  })}
                >
                  {label}
                </Label>
              )}
              {description && (
                <Description
                  darkMode={darkMode}
                  disabled={disabled}
                  className={cx({
                    [labelDescriptionLargeStyles]: size === ComboboxSize.Large,
                  })}
                >
                  {description}
                </Description>
              )}
            </div>
          )}

          {/* Disable eslint: onClick sets focus. Key events would already have focus */}
          {}
          <div
            ref={comboboxRef}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-owns={menuId}
            tabIndex={-1}
            onMouseDown={handleInputWrapperMousedown}
            onClick={handleComboboxClick}
            onFocus={handleComboboxFocus}
            onKeyDown={handleKeyDown}
            onTransitionEnd={handleTransitionEnd}
            className={cx(
              baseComboboxStyles,
              comboboxThemeStyles[theme],
              comboboxSizeStyles(size, isMultiselectWithSelections),
              getComboboxStateStyles(theme)[state],
              {
                [comboboxFocusStyle[theme]]: isElementFocused(
                  ComboboxElement.Input,
                ),
                [getComboboxDisabledStyles(theme)]: disabled,
                [comboboxOverflowShadowStyles[theme]]: shouldShowOverflowShadow,
              },
            )}
          >
            <div
              onScroll={handleOnScroll}
              ref={inputWrapperRef}
              className={inputWrapperStyle({
                size,
                overflow,
              })}
            >
              {renderedChips}
              <input
                aria-label={ariaLabel ?? label}
                aria-autocomplete="list"
                aria-controls={menuId}
                aria-labelledby={labelId}
                ref={inputRef}
                id={inputId}
                className={cx(
                  baseInputElementStyle,
                  inputElementSizeStyle(size),
                  inputElementThemeStyle[theme],
                  inputElementTransitionStyles(isOpen),
                  {
                    [multiselectInputElementStyle(size, inputValue)]:
                      isMultiselect(selection),
                    [inputElementDisabledThemeStyle[theme]]: disabled,
                  },
                )}
                placeholder={placeholderValue}
                aria-disabled={disabled}
                readOnly={disabled}
                onChange={handleInputChange}
                value={inputValue}
                autoComplete="off"
              />
            </div>
            <div
              className={cx(
                iconsWrapperBaseStyles,
                iconsWrapperSizeStyles[size],
              )}
            >
              {clearable && doesSelectionExist(selection) && !disabled && (
                <IconButton
                  aria-label="Clear selection"
                  disabled={disabled}
                  ref={clearButtonRef}
                  onClick={handleClearButtonClick}
                  onFocus={handleClearButtonFocus}
                  className={cx(clearButtonStyle)}
                  darkMode={darkMode}
                >
                  <Icon glyph="XWithCircle" />
                </IconButton>
              )}
              <Icon
                glyph="CaretDown"
                className={iconStyle}
                fill={cx({
                  [getCaretIconFill(theme)]: !disabled,
                  [getCaretIconDisabledFill(theme)]: disabled,
                })}
              />
            </div>
          </div>
          <FormFieldFeedback {...formFieldFeedbackProps} />

          {/******* /
          *  Menu  *
          / *******/}

          <PopoverPropsProvider {...popoverProps}>
            <ComboboxMenu
              id={menuId}
              labelId={labelId}
              refEl={comboboxRef}
              ref={menuRef}
              menuWidth={menuWidth}
              searchLoadingMessage={searchLoadingMessage}
              searchErrorMessage={searchErrorMessage}
              searchEmptyMessage={searchEmptyMessage}
            >
              {renderedOptionsJSX}
            </ComboboxMenu>
          </PopoverPropsProvider>
        </div>
      </ComboboxContext.Provider>
    </LeafyGreenProvider>
  );

  // Closure-dependant utils

  /**
   * Scrolls the combobox to the far right if overflow === scroll-x
   * Scrolls the combobox to the bottom if overflow === expand-y
   */
  function scrollInputToEnd(overflow: Overflow) {
    if (inputWrapperRef && inputWrapperRef.current) {
      // TODO - consider converting to .scrollTo(). This is not yet supported in IE or jsdom
      if (overflow === Overflow.scrollX) {
        inputWrapperRef.current.scrollLeft =
          inputWrapperRef.current.scrollWidth;
      }

      if (overflow === Overflow.expandY) {
        inputWrapperRef.current.scrollTop =
          inputWrapperRef.current.scrollHeight;
      }
    }
  }

  /**
   * Returns the provided element as a ComboboxElement string
   */
  function getNameFromElement(
    element?: Element | null,
  ): ComboboxElement | undefined {
    if (!element) return;
    if (inputRef.current?.contains(element)) return ComboboxElement.Input;
    if (clearButtonRef.current?.contains(element))
      return ComboboxElement.ClearButton;

    const activeChipIndex = isMultiselect(selection)
      ? selection.findIndex(value =>
          getChipRef(value)?.current?.contains(element),
        )
      : -1;

    if (isMultiselect(selection)) {
      if (activeChipIndex === 0) return ComboboxElement.FirstChip;
      if (activeChipIndex === selection.length - 1)
        return ComboboxElement.LastChip;
      if (activeChipIndex > 0) return ComboboxElement.MiddleChip;
    }

    if (menuRef.current?.contains(element)) return ComboboxElement.Menu;
    if (comboboxRef.current?.contains(element)) return ComboboxElement.Combobox;
  }
}

/**
 * Why'd you have to go and make things so complicated?
 * - Avril; and also me to myself about this component
 */
