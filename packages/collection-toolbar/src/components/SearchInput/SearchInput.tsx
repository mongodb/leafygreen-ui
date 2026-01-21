import React, { forwardRef } from 'react';

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
    ({ className, ...props }, fwdRef) => {
      const { size, variant, darkMode, lgIds } = useCollectionToolbarContext();

      validateAriaLabelProps(props, 'SearchInput');

      return (
        <LGSearchInput
          size={size}
          darkMode={darkMode}
          ref={fwdRef}
          data-lgid={lgIds.searchInput}
          className={getSearchInputStyles({ variant, size, className })}
          {...props}
        />
      );
    },
  ),
  {
    displayName: 'SearchInput',
    key: CollectionToolbarSubComponentProperty.SearchInput,
  },
);
