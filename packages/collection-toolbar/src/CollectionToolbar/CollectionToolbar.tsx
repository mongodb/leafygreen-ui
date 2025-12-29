import React, { useState } from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';

import { getLgIds } from '../utils/getLgIds';

import { getCollectionToolbarStyles } from './CollectionToolbar.styles';
import {
  CollectionToolbarProps,
  CollectionToolbarSubComponentProperty,
  Size,
  Variant,
} from './CollectionToolbar.types';
import { CollectionToolbarActions } from './CollectionToolbarActions';
import { CollectionToolbarContextProvider } from './CollectionToolbarContext';

export const CollectionToolbar = CompoundComponent(
  ({
    size = Size.Default,
    variant = Variant.Default,
    className,
    children,
  }: CollectionToolbarProps) => {
    const lgIds = getLgIds();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
      setIsCollapsed(curr => !curr);
    };

    const Actions = findChild(
      children,
      CollectionToolbarSubComponentProperty.Actions,
    );

    return (
      <CollectionToolbarContextProvider
        variant={variant}
        isCollapsed={isCollapsed}
        onCollapse={toggleCollapse}
        size={size}
      >
        <div
          data-testid={lgIds.root}
          className={getCollectionToolbarStyles({ size, variant, className })}
        >
          {Actions}
        </div>
      </CollectionToolbarContextProvider>
    );
  },
  {
    displayName: 'CollectionToolbar',
    Actions: CollectionToolbarActions,
  },
);
