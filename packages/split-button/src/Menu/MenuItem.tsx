import { ComponentType } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { MenuItem, type MenuItemProps } from '@leafygreen-ui/menu';

import { SplitButtonSubcomponentProperty } from '../shared.types';

export const SplitButtonMenuItem = CompoundSubComponent(
  MenuItem as ComponentType<MenuItemProps>,
  {
    displayName: 'SplitButtonMenuItem',
    key: SplitButtonSubcomponentProperty.MenuItem,
  },
);
