import React, { useRef } from 'react';
import isUndefined from 'lodash/isUndefined';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import MagnifyingGlass from '@leafygreen-ui/icon/dist/MagnifyingGlass';
import { SearchInputProps, SizeVariant } from './types';
import {
  baseInputStyle,
  wrapperFontStyle,
  inputContainerStyle,
  inputFocusStyles,
  inputThemeStyle,
  inputSizeStyles,
  searchIconStyle,
  searchIconThemeStyle,
  searchIconSizeStyle,
  searchIconDisabledStyle,
} from './styles';
import { cx } from '@leafygreen-ui/emotion';
import { SearchResultsMenu } from './SearchResultsMenu';

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

type SearchInputType = React.ForwardRefExoticComponent<SearchInputProps>;
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      placeholder = 'Search',
      className,
      darkMode: darkModeProp,
      sizeVariant = SizeVariant.Default,
      disabled,
      children,
      ...rest
    }: SearchInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) {
    const { theme } = useDarkMode(darkModeProp);

    const searchBoxRef = useRef<HTMLDivElement>(null);
    const withTypeahead = !isUndefined(children);

    return (
      <div>
        <div
          ref={searchBoxRef}
          className={cx(
            inputContainerStyle,
            wrapperFontStyle[sizeVariant],
            className,
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
            className={cx(
              baseInputStyle,
              inputThemeStyle[theme],
              inputSizeStyles[sizeVariant],
              inputFocusStyles[theme], // Always show focus styles
            )}
            placeholder={placeholder}
            ref={forwardRef}
            disabled={disabled}
            {...rest}
          />
        </div>
        {withTypeahead && (
          <SearchResultsMenu refEl={searchBoxRef}>{children}</SearchResultsMenu>
        )}
      </div>
    );
  },
) as SearchInputType;

SearchInput.displayName = 'SearchInput';

export default SearchInput;
