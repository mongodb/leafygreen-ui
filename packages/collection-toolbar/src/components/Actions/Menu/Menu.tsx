import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';
import { Menu as LGMenu } from '@leafygreen-ui/menu';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';

import { MenuProps } from './Menu.types';
import { MenuItem } from './MenuItem';

const Menu = CompoundSubComponent(
  ({ children, ...props }: MenuProps) => {
    const { lgIds } = useCollectionToolbarContext();

    return (
      <LGMenu
        data-lgid={lgIds.menu}
        data-testid={lgIds.menu}
        {...props}
        trigger={
          <IconButton aria-label="More options">
            <Icon glyph="Ellipsis" />
          </IconButton>
        }
      >
        {children}
      </LGMenu>
    );
  },
  {
    displayName: 'Menu',
    key: CollectionToolbarActionsSubComponentProperty.Menu,
    MenuItem,
  },
);

export default Menu;
