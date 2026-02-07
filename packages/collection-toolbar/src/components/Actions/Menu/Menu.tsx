import React, { forwardRef } from 'react';

import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';
import { Menu as LGMenu } from '@leafygreen-ui/menu';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';

import { MenuProps } from './Menu.types';

export const Menu = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, MenuProps>(({ children, ...props }, fwdRef) => {
    const { lgIds } = useCollectionToolbarContext();

    const menuItems = findChildren(
      children,
      CollectionToolbarActionsSubComponentProperty.MenuItem,
    );

    return (
      <LGMenu
        data-lgid={lgIds.menu}
        data-testid={lgIds.menu}
        ref={fwdRef}
        {...props}
        trigger={
          <IconButton aria-label="More options">
            <Icon glyph="Ellipsis" />
          </IconButton>
        }
      >
        {menuItems}
      </LGMenu>
    );
  }),
  {
    displayName: 'Menu',
    key: CollectionToolbarActionsSubComponentProperty.Menu,
  },
);
