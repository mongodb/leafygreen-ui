import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Option as LGOption } from '@leafygreen-ui/select';

import { CollectionToolbarFiltersSubComponentProperty } from '../../share.types';

import { OptionProps } from './Option.types';

export const Option = CompoundSubComponent(
  (props: OptionProps) => <LGOption {...props} />,
  {
    displayName: 'Option',
    key: CollectionToolbarFiltersSubComponentProperty.Option,
  },
);
