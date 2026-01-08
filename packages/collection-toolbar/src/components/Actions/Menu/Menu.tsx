import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import React from 'react';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';
import { Menu as LGMenu } from '@leafygreen-ui/menu';
import { MenuItem } from './MenuItem';
import { MenuProps } from './Menu.types';
import { IconButton } from '@leafygreen-ui/icon-button';
import { Icon } from '@leafygreen-ui/icon';
import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';

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
