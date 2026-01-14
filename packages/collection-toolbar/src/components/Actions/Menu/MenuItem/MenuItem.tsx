import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { MenuItem as LGMenuItem, MenuItemProps } from '@leafygreen-ui/menu';

import { useCollectionToolbarContext } from '../../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../../shared.types';

export const MenuItem = CompoundSubComponent(
  ({ children, ...props }: MenuItemProps) => {
    const { lgIds } = useCollectionToolbarContext();
    const menuItemId = useIdAllocator({
      prefix: lgIds.menuItem,
    });

    return (
      <LGMenuItem
        {...props}
        id={menuItemId}
        data-lgid={lgIds.menuItem}
        data-testid={lgIds.menuItem}
      >
        {children}
      </LGMenuItem>
    );
  },
  {
    displayName: 'MenuItem',
    key: CollectionToolbarActionsSubComponentProperty.MenuItem,
  },
);
