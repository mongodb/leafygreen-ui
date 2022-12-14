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
import {
  useBackdropClick,
  useForwardedRef,
  useValue,
} from '@leafygreen-ui/hooks';
import MagnifyingGlass from '@leafygreen-ui/icon/dist/MagnifyingGlass';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { SearchInputContextProvider } from '../SearchInputContext';
import { SearchResultsMenu } from '../SearchResultsMenu';

import {
  baseInputStyle,
  inputThemeStyle,
  inputWrapperDisabledStyle,
  inputWrapperFocusStyles,
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
    const closeMenu = () => setOpen(false);
    const openMenu = () => setOpen(true);

    const searchBoxRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const inputRef = useForwardedRef(forwardRef, null);
    const withTypeAhead = !isUndefined(children);

    const { value, onChange, onClear } = useValue(
      valueProp,
      onChangeProp,
      onClearProp,
    );

    /** Event Handlers */

    const handleOpenMenuAction: EventHandler<SyntheticEvent<any>> = e => {
      if (disabled) {
        e.preventDefault();
      } else {
        openMenu();
      }
    };

    const handleInputClick: MouseEventHandler = handleOpenMenuAction;
    const handleInputFocus: FocusEventHandler = handleOpenMenuAction;

    const handleClearButton: MouseEventHandler<HTMLButtonElement> = e => {
      onClear(e);
      inputRef?.current?.focus();
    };

    useBackdropClick(closeMenu, [searchBoxRef, menuRef], isOpen);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <SearchInputContextProvider state={state}>
          <form role="search" className={className} {...rest}>
            {/* Disable eslint: onClick sets focus. Key events would already have focus */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <div
              ref={searchBoxRef}
              role="searchbox"
              tabIndex={-1}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              className={cx(
                inputWrapperStyle,
                inputWrapperSizeStyle[sizeVariant],
                inputWrapperThemeStyle[theme],
                inputWrapperFocusStyles[theme], // Always show focus styles
                { [inputWrapperDisabledStyle[theme]]: disabled },
              )}
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
