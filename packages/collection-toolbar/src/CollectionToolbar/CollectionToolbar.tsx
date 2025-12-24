import React from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';

import { getCollectionToolbarStyles } from './CollectionToolbar.styles';
import {
  CollectionToolbarProps,
  CollectionToolbarSubComponentProperty,
  Size,
  Variant,
} from './CollectionToolbar.types';
import { CollectionToolbarTitle } from './CollectionToolbarTitle';

export const CollectionToolbar = CompoundComponent(
  ({
    size = Size.Default,
    variant = Variant.Default,
    className,
    children,
  }: CollectionToolbarProps) => {
    const title = findChild(
      children,
      CollectionToolbarSubComponentProperty.Title,
    );

    return (
      <div className={getCollectionToolbarStyles({ size, variant, className })}>
        {title}
        CollectionToolbar
      </div>
    );
  },
  {
    displayName: 'CollectionToolbar',
    Title: CollectionToolbarTitle,
  },
);

CollectionToolbar.displayName = 'CollectionToolbar';
