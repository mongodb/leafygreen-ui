import React from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';

import { Title } from '../components';
import {
  CollectionToolbarSubComponentProperty,
  Size,
  Variant,
} from '../shared.types';
import { getLgIds } from '../utils';

import { getCollectionToolbarStyles } from './CollectionToolbar.styles';
import { CollectionToolbarProps } from './CollectionToolbar.types';

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
        data-lgid={lgIds.root}
        className={getCollectionToolbarStyles({ size, variant, className })}
      >
        {showTitle && title}
      </div>
    );
  },
  {
    displayName: 'CollectionToolbar',
    Title,
  },
);

CollectionToolbar.displayName = 'CollectionToolbar';
