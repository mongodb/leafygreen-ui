import React, { ComponentType, forwardRef } from 'react';

import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { SearchInput as LGSearchInput } from '@leafygreen-ui/search-input';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';
import { CollectionToolbarSubComponentProperty } from '../../shared.types';

import { getSearchInputStyles } from './SearchInput.styles';
import { SearchInputProps } from './SearchInput.types';

export const SearchInput = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, 'aria-label': ariaLabel = '', ...props }, fwdRef) => {
      const { size, darkMode, lgIds } = useCollectionToolbarContext();

      validateAriaLabelProps(props, 'SearchInput');

      return (
        <LGSearchInput
          size={size}
          darkMode={darkMode}
          ref={fwdRef}
          aria-label={ariaLabel}
          data-lgid={lgIds.searchInput}
          className={getSearchInputStyles({ className })}
          {...props}
        />
      );
    },
    // Cast required: TypeScript cannot reconcile ForwardRefExoticComponent's propTypes
    // with the AriaLabelProps discriminated union (aria-label OR aria-labelledby required)
  ) as ComponentType<SearchInputProps>,
  {
    displayName: 'SearchInput',
    key: CollectionToolbarSubComponentProperty.SearchInput,
  },
);
