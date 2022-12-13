import React, {
  EventHandler,
  FocusEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import isUndefined from 'lodash/isUndefined';

import { cx } from '@leafygreen-ui/emotion';
import { useBackdropClick } from '@leafygreen-ui/hooks';
import MagnifyingGlass from '@leafygreen-ui/icon/dist/MagnifyingGlass';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { SearchInputContextProvider } from '../SearchInputContext';
import { SearchResultsMenu } from '../SearchResultsMenu';

import {
  baseInputStyle,
  inputContainerStyle,
  inputFocusStyles,
  inputSizeStyles,
  inputThemeStyle,
  searchIconDisabledStyle,
  searchIconSizeStyle,
  searchIconStyle,
  searchIconThemeStyle,
  wrapperFontStyle,
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
      onChange,
      ...rest
    }: SearchInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) {
    const { theme, darkMode } = useDarkMode(darkModeProp);
    const [isOpen, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);
    const openMenu = () => setOpen(true);

    const searchBoxRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const withTypeAhead = !isUndefined(children);

    const handleOpenMenuAction: EventHandler<SyntheticEvent<any>> = e => {
      if (disabled) {
        e.preventDefault();
      } else {
        openMenu();
      }
    };

    const handleInputClick: MouseEventHandler = handleOpenMenuAction;
    const handleInputFocus: FocusEventHandler = handleOpenMenuAction;

    useBackdropClick(
      () => {
        closeMenu();
      },
      [searchBoxRef, menuRef],
      isOpen,
    );

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <SearchInputContextProvider state={state}>
          <form role="search">
            {/* Disable eslint: onClick sets focus. Key events would already have focus */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <div
              ref={searchBoxRef}
              role="searchbox"
              tabIndex={-1}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              className={cx(
                inputContainerStyle,
                wrapperFontStyle[sizeVariant],
                className,
              )}
              {...rest}
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
                  inputFocusStyles[theme], // Always show focus styles
                )}
                onChange={onChange}
                placeholder={placeholder}
                ref={forwardRef}
                disabled={disabled}
              />
            </div>
            {withTypeAhead && (
              <SearchResultsMenu
                open={isOpen}
                refEl={searchBoxRef}
                ref={menuRef}
              >
                {children}
              </SearchResultsMenu>
            )}
          </form>
        </SearchInputContextProvider>
      </LeafyGreenProvider>
    );
  },
);

SearchInput.displayName = 'SearchInput';
