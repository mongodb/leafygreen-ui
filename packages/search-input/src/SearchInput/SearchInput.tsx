import React, {
  ChangeEvent,
  EventHandler,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isUndefined from 'lodash/isUndefined';

import { cx } from '@leafygreen-ui/emotion';
import {
  useBackdropClick,
  useControlledValue,
  useDynamicRefs,
  useForwardedRef,
} from '@leafygreen-ui/hooks';
import MagnifyingGlass from '@leafygreen-ui/icon/dist/MagnifyingGlass';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';

import { SearchInputContextProvider } from '../SearchInputContext';
import { SearchResultsMenu } from '../SearchResultsMenu';

import {
  baseInputStyle,
  clearButtonSizeStyle,
  formStyle,
  inputSizeStyles,
  inputThemeStyle,
  inputWrapperDisabledStyle,
  inputWrapperFocusStyles,
  inputWrapperInteractiveStyles,
  inputWrapperSizeStyle,
  inputWrapperStyle,
  inputWrapperThemeStyle,
  searchIconDisabledStyle,
  searchIconSizeStyle,
  searchIconStyle,
  searchIconThemeStyle,
} from './SearchInput.styles';
import { SearchInputProps, SizeVariant, State } from './SearchInput.types';

/**
 * # SearchInput
 *
 * SearchInput component
 *
 * @param props.state The current state of the SearchInput. This can be none, or loading.
 * @param props.darkMode determines whether or not the component appears in dark theme.
 * @param props.sizeVariant determines the size of the text and the height of the input.
 * @param props.baseFontSize determines the base font size if sizeVariant is set to default.
 */

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      placeholder = 'Search',
      className,
      darkMode: darkModeProp,
      sizeVariant = SizeVariant.Default,
      disabled,
      children,
      state = State.Unset,
      value: valueProp,
      onChange: onChangeProp,
      onSubmit: onSubmitProp,
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
    const withTypeAhead = !isUndefined(children);
    const [focusedElement, trackFocusedElement] = useState<Element>();

    const { value, handleChange } = useControlledValue(valueProp, onChangeProp);

    /**
     * Helper function that both counts the number of `SearchResult` descendants
     * and adds the appropriate props to said children
     */
    const processChildren = () => {
      let resultsCount = 0;

      const processChild = (
        child: React.ReactNode,
      ): JSX.Element | undefined => {
        if (isComponentType(child, 'SearchResult')) {
          resultsCount += 1;
          const index = resultsCount - 1;
          return React.cloneElement(child, {
            ...child.props,
            id: `result-${index}`,
            ref: child.props.ref ?? resultRefs?.(`${index}`),
            focused: index === highlightIndex,
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
    };

    const { updatedChildren, resultsCount } = processChildren();

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

    const isElementInComponent = (el: Element | null) => {
      return formRef.current?.contains(el) || menuRef.current?.contains(el);
    };

    /** Event Handlers */

    const handleOpenMenuAction: EventHandler<SyntheticEvent<any>> = e => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        openMenu();
      }
    };

    const handleSearchBoxMousedown = (e: React.MouseEvent) => {
      if (disabled) {
        // Prevent container from gaining focus by default
        e.preventDefault();
      }
    };

    const handleSearchBoxClick: MouseEventHandler = handleOpenMenuAction;

    // Fired whenever the wrapper gains focus,
    // and any time the focus within changes
    const handleSearchBoxFocus: FocusEventHandler = e => {
      const target =
        e.target !== clearButtonRef.current
          ? inputRef.current ?? (e.target as HTMLElement)
          : clearButtonRef.current;
      target.focus();
      trackFocusedElement(target);
      handleOpenMenuAction(e);
    };

    const handleClearButton: MouseEventHandler<HTMLButtonElement> = e => {
      // We convert the click event into a Change event,
      // Update the target & value,
      // Then fire any `onChange` handler
      const changeEvent: ChangeEvent<any> = {
        ...cloneDeep(e),
        type: 'change',
        target: inputRef.current as EventTarget,
      };
      changeEvent.target.value = '';
      handleChange(changeEvent);
      inputRef?.current?.focus();
    };

    const handleKeyDown: KeyboardEventHandler = e => {
      const isFocusInMenu = menuRef.current?.contains(document.activeElement);
      const isFocusOnSearchBox = searchBoxRef.current?.contains(
        document.activeElement,
      );

      const isFocusInComponent = isFocusOnSearchBox || isFocusInMenu;

      if (isFocusInComponent) {
        switch (e.keyCode) {
          case keyMap.Enter: {
            const highlightedElementRef = resultRefs(`${highlightIndex}`);
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
              e.preventDefault(); // Stop page scroll
              updateHighlight('next');
            }
            break;
          }

          case keyMap.ArrowUp: {
            if (withTypeAhead) {
              inputRef.current?.focus();
              e.preventDefault(); // Stop page scroll
              updateHighlight('prev');
            }
            break;
          }
        }
      }
    };

    const handleBlur: FocusEventHandler = _ => {
      if (!isElementInComponent(document.activeElement)) {
        closeMenu();
      }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
      if (withTypeAhead) {
        e.preventDefault();
      } else {
        onSubmitProp?.(e);
      }
    };

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
            onSubmit={handleSubmit}
            onBlur={handleBlur}
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
              onKeyDown={handleKeyDown}
              className={cx(
                inputWrapperStyle,
                inputWrapperSizeStyle[sizeVariant],
                inputWrapperThemeStyle[theme],
                {
                  [inputWrapperFocusStyles[theme]]:
                    focusedElement === inputRef.current,
                  [inputWrapperDisabledStyle[theme]]: disabled,
                  [inputWrapperInteractiveStyles[theme]]: !disabled,
                },
              )}
              aria-label={rest['aria-label']}
              aria-labelledby={rest['aria-labelledby']}
            >
              <MagnifyingGlass
                className={cx(
                  searchIconStyle,
                  searchIconThemeStyle[theme],
                  searchIconSizeStyle[sizeVariant],
                  { [searchIconDisabledStyle[theme]]: disabled },
                )}
                aria-label="Search Icon"
                role="presentation"
              />
              <input
                type="search"
                className={cx(
                  baseInputStyle,
                  inputThemeStyle[theme],
                  inputSizeStyles[sizeVariant],
                )}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                ref={inputRef}
                disabled={disabled}
              />
              {value && (
                <IconButton
                  ref={clearButtonRef}
                  type="button"
                  aria-label="Clear search"
                  onClick={handleClearButton}
                  className={clearButtonSizeStyle[sizeVariant]}
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
