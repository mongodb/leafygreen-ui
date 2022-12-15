import React, {
  EventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import isUndefined from 'lodash/isUndefined';

import { cx } from '@leafygreen-ui/emotion';
import {
  useBackdropClick,
  useDynamicRefs,
  useForwardedRef,
  useValue,
} from '@leafygreen-ui/hooks';
import MagnifyingGlass from '@leafygreen-ui/icon/dist/MagnifyingGlass';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { keyMap, validateChildren } from '@leafygreen-ui/lib';

import { SearchInputContextProvider } from '../SearchInputContext';
import { SearchResultsMenu } from '../SearchResultsMenu';

import {
  baseInputStyle,
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
import { SearchInputProps, SizeVariant } from './SearchInput.types';

/**
 * # SearchInput
 *
 * SearchInput component
 *
 * ```
<SearchInput  onChange={() => execute when value of input field changes}/>
```
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
      state,
      value: valueProp,
      onChange: onChangeProp,
      onClear: onClearProp,
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

    const searchBoxRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const inputRef = useForwardedRef(forwardRef, null);
    const resultRefs = useDynamicRefs<HTMLElement>({ prefix: 'result' });
    const withTypeAhead = !isUndefined(children);

    const { value, onChange, onClear } = useValue(
      valueProp,
      onChangeProp,
      onClearProp,
    );

    const validatedChildren = validateChildren(children, [
      'SearchResult',
      'SearchResultGroup',
    ])?.map((child, index) =>
      React.cloneElement(child, {
        ...child.props,
        ref: resultRefs(`${index}`),
      }),
    );

    type Direction = 'next' | 'prev' | 'first' | 'last';

    const updateHighlight = (direction: Direction) => {
      const resultsCount = React.Children.count(children);

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
      return (
        searchBoxRef.current?.contains(el) || menuRef.current?.contains(el)
      );
    };

    /** Event Handlers */

    const handleOpenMenuAction: EventHandler<SyntheticEvent<any>> = e => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        openMenu();
        updateHighlight('first');
      }
    };

    // Prevent container from gaining focus by default
    const handleInputWrapperMousedown = (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault();
      }
    };

    const handleInputWrapperClick: MouseEventHandler = handleOpenMenuAction;
    const handleInputWrapperFocus: FocusEventHandler = handleOpenMenuAction;

    const handleClearButton: MouseEventHandler<HTMLButtonElement> = e => {
      onClear(e);
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
            updateHighlight('next');
            break;
          }

          case keyMap.ArrowUp: {
            updateHighlight('prev');
            break;
          }
        }
      }
    };

    const handleBlur: FocusEventHandler = e => {
      if (
        !isElementInComponent(e.target) ||
        !isElementInComponent(document.activeElement)
      ) {
        closeMenu();
      }
    };

    useBackdropClick(closeMenu, [searchBoxRef, menuRef], isOpen);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <SearchInputContextProvider state={state} highlight={highlightIndex}>
          <form
            role="search"
            className={className}
            onSubmit={e => e.preventDefault()}
            onBlur={handleBlur}
            {...rest}
          >
            {/* Disable eslint: onClick sets focus. Key events would already have focus */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <div
              ref={searchBoxRef}
              role="searchbox"
              tabIndex={-1}
              onMouseDown={handleInputWrapperMousedown}
              onClick={handleInputWrapperClick}
              onFocus={handleInputWrapperFocus}
              onKeyDown={handleKeyDown}
              className={cx(
                inputWrapperStyle,
                inputWrapperSizeStyle[sizeVariant],
                inputWrapperThemeStyle[theme],
                inputWrapperFocusStyles[theme], // Always show focus styles
                {
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
                className={cx(baseInputStyle, inputThemeStyle[theme])}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                ref={inputRef}
                disabled={disabled}
              />
              {value && (
                <IconButton
                  type="button"
                  aria-label="Clear search"
                  onClick={handleClearButton}
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
                {validatedChildren}
              </SearchResultsMenu>
            )}
          </form>
        </SearchInputContextProvider>
      </LeafyGreenProvider>
    );
  },
);

SearchInput.displayName = 'SearchInput';
