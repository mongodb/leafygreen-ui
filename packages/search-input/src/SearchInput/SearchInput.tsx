import React, {
  ChangeEventHandler,
  EventHandler,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import isUndefined from 'lodash/isUndefined';

import { cx } from '@leafygreen-ui/emotion';
import {
  useAutoScroll,
  useBackdropClick,
  useControlledValue,
  useDynamicRefs,
  useForwardedRef,
} from '@leafygreen-ui/hooks';
import MagnifyingGlass from '@leafygreen-ui/icon/dist/MagnifyingGlass';
import XIcon from '@leafygreen-ui/icon/dist/XWithCircle';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import {
  createSyntheticEvent,
  getNodeTextContent,
  isComponentType,
  keyMap,
} from '@leafygreen-ui/lib';

import { SearchInputContextProvider } from '../SearchInputContext';
import { SearchResultsMenu } from '../SearchResultsMenu';

import {
  baseInputStyle,
  clearButtonSizeStyle,
  formStyle,
  inputThemeStyle,
  inputWrapperDisabledStyle,
  inputWrapperFocusStyles,
  inputWrapperInteractiveStyles,
  inputWrapperSizeStyle,
  inputWrapperStyle,
  inputWrapperThemeStyle,
  searchIconDisabledStyle,
  searchIconSizeStyle,
  searchIconThemeStyle,
} from './SearchInput.styles';
import { SearchInputProps, Size, State } from './SearchInput.types';

/**
 * # SearchInput
 *
 * SearchInput component
 *
 * @param props.state The current state of the SearchInput. This can be none, or loading.
 * @param props.darkMode determines whether or not the component appears in dark theme.
 * @param props.size determines the size of the text and the height of the input.
 * @param props.baseFontSize determines the base font size if size is set to default.
 */

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      placeholder = 'Search',
      className,
      darkMode: darkModeProp,
      size = Size.Default,
      disabled,
      children,
      state = State.Unset,
      value: valueProp,
      onChange: onChangeProp,
      onSubmit: onSubmitProp,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    }: SearchInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) {
    const { theme, darkMode } = useDarkMode(darkModeProp);
    const [isOpen, setOpen] = useState(false);
    // The index of the currently highlighted result option
    const [highlightIndex, setHighlightIndex] = useState<number>(0);

    const closeMenu = () => setOpen(false);
    const openMenu = () => setOpen(true);

    const formRef = useRef<HTMLFormElement>(null);
    const searchBoxRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const inputRef = useForwardedRef(forwardRef, null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const resultRefs = useDynamicRefs<HTMLElement>({ prefix: 'result' });
    const [focusedElement, trackFocusedElement] = useState<Element>();
    const highlightedElementRef = resultRefs(`${highlightIndex}`);

    const withTypeAhead = !isUndefined(children);

    const { value, handleChange } = useControlledValue(valueProp, onChangeProp);

    /** Fires a change event to update the input value */
    const changeInputValue = useCallback(
      (newVal: string) => {
        if (inputRef.current) {
          // We change the element's value
          // and then make sure that the change event is fired
          inputRef.current.value = newVal;
          const nativeChangeEvent = new Event('change', {
            cancelable: true,
            bubbles: true,
          });
          const syntheticChangeEvent = createSyntheticEvent(
            nativeChangeEvent,
            inputRef.current,
          );
          handleChange(syntheticChangeEvent);
        }
      },
      [handleChange, inputRef],
    );

    /**
     * Helper function that both counts the number of `SearchResult` descendants
     * and adds the appropriate props to said children
     */
    const processChildren = useCallback(() => {
      // Count results (not just children, since groups are still children)
      let resultsCount = 0;

      const processChild = (
        child: React.ReactNode,
      ): JSX.Element | undefined => {
        if (isComponentType(child, 'SearchResult')) {
          resultsCount += 1;
          const index = resultsCount - 1;

          const textValue = getNodeTextContent(child);

          const onElementClick: MouseEventHandler = e => {
            child.props.onClick?.(e); // call the child's onClick handler

            changeInputValue(textValue);

            const wasClickedWithMouse = e.detail >= 1;

            if (wasClickedWithMouse && formRef.current && inputRef.current) {
              // Selecting an option fires the `submit` event
              // We only fire a new `submit` event if the element was clicked with the mouse,
              // since the enter key also fires the `submit` event
              const submitEvent = new Event('submit', {
                cancelable: true,
                bubbles: true,
              });
              formRef.current?.dispatchEvent(submitEvent);
            }
          };

          return React.cloneElement(child, {
            ...child.props,
            id: `result-${index}`,
            key: `result-${index}`,
            ref: child.props.ref ?? resultRefs?.(`${index}`),
            focused: index === highlightIndex,
            onClick: onElementClick,
          });
        } else if (isComponentType(child, 'SearchResultGroup')) {
          const nestedChildren = React.Children.map(
            child.props.children,
            processChild,
          );

          if (nestedChildren && nestedChildren.length > 0) {
            return React.cloneElement(child, {
              ...child.props,
              children: nestedChildren,
            });
          }
        }
      };

      const updatedChildren = React.Children.map(children, processChild);

      return {
        resultsCount,
        updatedChildren,
      };
    }, [children, highlightIndex, inputRef, resultRefs, changeInputValue]);

    const { updatedChildren, resultsCount } = useMemo(
      () => processChildren(),
      [processChildren],
    );

    type Direction = 'next' | 'prev' | 'first' | 'last';
    const updateHighlight = (direction: Direction) => {
      switch (direction) {
        case 'first': {
          setHighlightIndex(0);
          break;
        }

        case 'last': {
          setHighlightIndex(resultsCount);
          break;
        }

        case 'next': {
          const nextIndex =
            !isUndefined(highlightIndex) && highlightIndex + 1 < resultsCount
              ? highlightIndex + 1
              : 0;
          setHighlightIndex(nextIndex);
          break;
        }

        case 'prev': {
          const nextIndex =
            !isUndefined(highlightIndex) && highlightIndex - 1 >= 0
              ? highlightIndex - 1
              : resultsCount - 1;
          setHighlightIndex(nextIndex);
        }
      }
    };

    /** Event Handlers */

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
      handleChange?.(e);
    };

    const handleOpenMenuAction: EventHandler<SyntheticEvent<any>> = e => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        openMenu();
      }
    };

    const handleSearchBoxMousedown: MouseEventHandler<HTMLDivElement> = e => {
      if (disabled) {
        // Prevent container from gaining focus by default
        e.preventDefault();
      }
    };

    const handleSearchBoxClick: MouseEventHandler<HTMLDivElement> = e => {
      if (e.target !== clearButtonRef.current) {
        // Don't open the menu if it was the clear button that was clicked.
        // Could use `e.stopPropagation` in clear button handler instead,
        // but users may still want to handle that click event
        handleOpenMenuAction(e);
      }
    };

    // Fired whenever the wrapper gains focus,
    // and any time the focus within changes
    const handleSearchBoxFocus: FocusEventHandler<HTMLDivElement> = e => {
      const eventTarget = e.target as HTMLElement;
      const target =
        eventTarget === clearButtonRef.current // If the click was on the button
          ? clearButtonRef.current // keep it there
          : inputRef.current ?? eventTarget; // otherwise move the focus to the input
      target.focus();
      trackFocusedElement(target);
    };

    const handleClearButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
      changeInputValue('');
      inputRef?.current?.focus();
    };

    const handleSearchBoxKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      const isFocusInMenu = menuRef.current?.contains(document.activeElement);
      const isFocusOnSearchBox = searchBoxRef.current?.contains(
        document.activeElement,
      );

      const isFocusInComponent = isFocusOnSearchBox || isFocusInMenu;

      if (isFocusInComponent) {
        switch (e.keyCode) {
          case keyMap.Enter: {
            e.stopPropagation();
            highlightedElementRef?.current?.click();
            break;
          }

          case keyMap.Escape: {
            closeMenu();
            inputRef.current?.focus();
            break;
          }

          case keyMap.ArrowDown: {
            if (withTypeAhead) {
              inputRef.current?.focus();
              openMenu();
              e.preventDefault(); // Stop page scroll
              updateHighlight('next');
            }
            break;
          }

          case keyMap.ArrowUp: {
            if (withTypeAhead) {
              inputRef.current?.focus();
              openMenu();
              e.preventDefault(); // Stop page scroll
              updateHighlight('prev');
            }
            break;
          }

          case keyMap.Tab: {
            if (isOpen) {
              closeMenu();
            }
            break;
          }

          default: {
            if (withTypeAhead) {
              openMenu();
            }
          }
        }
      }
    };

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = e => {
      e.preventDefault(); // prevent page reload

      onSubmitProp?.(e);
      if (withTypeAhead) {
        closeMenu();
      }
    };

    useAutoScroll(highlightedElementRef, menuRef, 12);
    useBackdropClick(closeMenu, [searchBoxRef, menuRef], isOpen);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <SearchInputContextProvider
          state={state}
          highlight={highlightIndex}
          resultDynamicRefs={resultRefs}
        >
          <form
            role="search"
            ref={formRef}
            className={cx(formStyle, className)}
            onSubmit={handleFormSubmit}
            {...rest}
          >
            {/* Disable eslint: onClick sets focus. Key events would already have focus */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <div
              ref={searchBoxRef}
              role="searchbox"
              tabIndex={-1}
              onMouseDown={handleSearchBoxMousedown}
              onClick={handleSearchBoxClick}
              onFocus={handleSearchBoxFocus}
              onKeyDown={handleSearchBoxKeyDown}
              className={cx(
                inputWrapperStyle,
                inputWrapperSizeStyle[size],
                inputWrapperThemeStyle[theme],
                {
                  [inputWrapperFocusStyles[theme]]:
                    focusedElement === inputRef.current,
                  [inputWrapperDisabledStyle[theme]]: disabled,
                  [inputWrapperInteractiveStyles[theme]]: !disabled,
                },
              )}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
            >
              <MagnifyingGlass
                className={cx(
                  searchIconThemeStyle[theme],
                  searchIconSizeStyle[size],
                  { [searchIconDisabledStyle[theme]]: disabled },
                )}
                role="presentation"
              />
              <input
                type="search"
                className={cx(baseInputStyle, inputThemeStyle[theme])}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                ref={inputRef}
                readOnly={disabled}
              />
              {value && (
                <IconButton
                  ref={clearButtonRef}
                  type="button"
                  aria-label="Clear search"
                  onClick={handleClearButtonClick}
                  className={clearButtonSizeStyle[size]}
                >
                  <XIcon />
                </IconButton>
              )}
            </div>
            {withTypeAhead && (
              <SearchResultsMenu
                open={isOpen}
                refEl={searchBoxRef}
                ref={menuRef}
              >
                {updatedChildren}
              </SearchResultsMenu>
            )}
          </form>
        </SearchInputContextProvider>
      </LeafyGreenProvider>
    );
  },
);

SearchInput.displayName = 'SearchInput';
