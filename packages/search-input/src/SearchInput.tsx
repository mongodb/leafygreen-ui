import React, { forwardRef } from 'react';
import { SearchInputProps, SizeVariant } from './types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import MagnifyingGlass from '@leafygreen-ui/icon/dist/MagnifyingGlass';
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
type SearchInput = React.ForwardRefExoticComponent<SearchInputProps>;
const SearchInput: SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = 'Search',
      className,
      darkMode: darkModeProp,
      sizeVariant = SizeVariant.Default,
      disabled,
      ...rest
    }: SearchInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);

    return (
      <div className={cx(inputContainerStyle, wrapperFontStyle[sizeVariant])}>
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
            className,
          )}
          placeholder={placeholder}
          ref={forwardRef}
          disabled={disabled}
          {...rest}
        />
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
