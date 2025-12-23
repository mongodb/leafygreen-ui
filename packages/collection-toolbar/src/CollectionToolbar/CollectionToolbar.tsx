import React from 'react';

import { getCollectionToolbarStyles } from './CollectionToolbar.styles';
import {
  CollectionToolbarProps,
  Size,
  Variant,
} from './CollectionToolbar.types';

export function CollectionToolbar({
  size = Size.Default,
  variant = Variant.Default,
  className,
}: CollectionToolbarProps) {
  return (
    <div className={getCollectionToolbarStyles({ size, variant, className })}>
      CollectionToolbar
    </div>
  );
}

CollectionToolbar.displayName = 'CollectionToolbar';
