import React, { forwardRef } from 'react';
import { SearchInputProps, SizeVariant, State } from './types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';
import MagnifyingGlass from '@leafygreen-ui/icon/dist/MagnifyingGlass';
import {
  baseInputStyle,
  getWrapperFontSize,
  inputContainerStyle,
  inputFocusStyles,
  inputThemeStyle,
  inputSizeStyles,
  searchIconStyle,
  searchIconThemeStyle,
  searchIconSizeStyle,
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
 * @param props.id id associated with the SearchInput component.
 * @param props.onChange Callback to be executed when the value of the input field changes.
 * @param props.onBlur Callback to be executed when the input stops being focused.
 * @param props.placeholder The placeholder text shown in the input field before the user begins typing.
 * @param props.state The current state of the SearchInput. This can be none, or loading.
 * @param props.value The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
 * @param props.className className supplied to the SearchInput container.
 * @param props.darkMode determines whether or not the component appears in dark theme.
 * @param props.sizeVariant determines the size of the text and the height of the input.
 */
type SearchInput = React.ForwardRefExoticComponent<SearchInputProps>;
const SearchInput: SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onChange,
      onBlur,
      placeholder = 'Search',
      state = State.None,
      id: propsId,
      value: controlledValue,
      className,
      darkMode: darkModeProp,
      sizeVariant = SizeVariant.Default,
      'aria-labelledby': ariaLabelledby,
      baseFontSize: baseFontSizeProp,
      ...rest
    }: SearchInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) => {
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const { theme } = useDarkMode(darkModeProp);

    return (
      <div
        className={cx(
          inputContainerStyle,
          getWrapperFontSize(sizeVariant, baseFontSize),
        )}
      >
        <MagnifyingGlass
          className={cx(
            searchIconStyle,
            searchIconThemeStyle[theme],
            searchIconSizeStyle[sizeVariant],
          )}
          role="presentation"
        />
        <input
          type="search"
          aria-labelledby={ariaLabelledby}
          placeholder={placeholder}
          className={cx(
            baseInputStyle,
            inputThemeStyle[theme],
            inputSizeStyles[sizeVariant],
            inputFocusStyles[theme], // Always show focus styles
            className,
          )}
          ref={forwardRef}
          {...rest}
        />
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
