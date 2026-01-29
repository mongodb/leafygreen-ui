import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Option as LGOption } from '@leafygreen-ui/select';

import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { SelectOptionProps } from './SelectOption.types';

export const SelectOption = CompoundSubComponent(
  (props: SelectOptionProps) => <LGOption {...props} />,
  {
    displayName: 'SelectOption',
    key: CollectionToolbarFiltersSubComponentProperty.SelectOption,
  },
);
