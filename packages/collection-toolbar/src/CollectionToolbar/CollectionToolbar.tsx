import React, { forwardRef } from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';

import { Title } from '../components';
import { CollectionToolbarProvider } from '../Context/CollectionToolbarProvider';
import {
  CollectionToolbarSubComponentProperty,
  Size,
  Variant,
} from '../shared.types';
import { getLgIds } from '../utils';

import { getCollectionToolbarStyles } from './CollectionToolbar.styles';
import { CollectionToolbarProps } from './CollectionToolbar.types';

export const CollectionToolbar = CompoundComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, CollectionToolbarProps>(
    ({
      size = Size.Default,
      variant = Variant.Default,
      className,
      children,
      'data-lgid': dataLgId,
      darkMode,
      ...rest
    }) => {
      const lgIds = getLgIds(dataLgId);
      const title = findChild(
        children,
        CollectionToolbarSubComponentProperty.Title,
      );

      const showTitle = title && variant === Variant.Collapsible;

      return (
        <CollectionToolbarProvider
          darkMode={darkMode}
          size={size}
          lgIds={lgIds}
        >
          <div
            data-lgid={lgIds.root}
            className={getCollectionToolbarStyles({ size, variant, className })}
            {...rest}
          >
            {showTitle && title}
          </div>
        </CollectionToolbarProvider>
      );
    },
  ),
  {
    displayName: 'CollectionToolbar',
    Title,
  },
);
