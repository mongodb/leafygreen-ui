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
  children,
}: CollectionToolbarProps) {
  return (
    <div className={getCollectionToolbarStyles({ size, variant, className })}>
      {children}
    </div>
  );
}

CollectionToolbar.displayName = 'CollectionToolbar';
