import React from 'react';

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
import { CollectionToolbarTitle } from './CollectionToolbarTitle';

export const CollectionToolbar = CompoundComponent(
  ({
    size = Size.Default,
    variant = Variant.Default,
    className,
    children,
  }: CollectionToolbarProps) => {
    const lgIds = getLgIds();
    const title = findChild(
      children,
      CollectionToolbarSubComponentProperty.Title,
    );

    const showTitle = title && variant === Variant.Collapsible;

    return (
      <div
        data-testid={lgIds.root}
        className={getCollectionToolbarStyles({ size, variant, className })}
      >
        {showTitle && title}
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
