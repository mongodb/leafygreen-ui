import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { SearchInput as LGSearchInput } from '@leafygreen-ui/search-input';

import { CollectionToolbarSubComponentProperty } from '../../shared.types';

import { SearchInputProps } from './SearchInput.types';

export const SearchInput = CompoundSubComponent(
  (props: SearchInputProps, fwdRef) => {
    return <LGSearchInput {...props} ref={fwdRef} />;
  },
  {
    displayName: 'SearchInput',
    key: CollectionToolbarSubComponentProperty.SearchInput,
  },
);
