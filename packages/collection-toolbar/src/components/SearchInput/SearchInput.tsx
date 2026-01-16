import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import {
  SearchInput as LGSearchInput,
  SearchInputProps,
} from '@leafygreen-ui/search-input';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';
import { CollectionToolbarSubComponentProperty } from '../../shared.types';

import { getSearchInputStyles } from './SearchInput.styles';

export const SearchInput = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLInputElement, SearchInputProps>(
    (
      { 'aria-labelledby': ariaLabelledby = '', className, ...props },
      fwdRef,
    ) => {
      const { size, variant, darkMode, lgIds } = useCollectionToolbarContext();
      return (
        <LGSearchInput
          size={size}
          darkMode={darkMode}
          ref={fwdRef}
          data-lgid={lgIds.searchInput}
          aria-labelledby={ariaLabelledby}
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
