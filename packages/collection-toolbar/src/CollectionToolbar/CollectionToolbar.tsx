import React, { forwardRef } from 'react';

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
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, CollectionToolbarProps>(
    ({
      size = Size.Default,
      variant = Variant.Default,
      className,
      children,
      ...rest
    }) => {
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
          {...rest}
        >
          {showTitle && title}
        </div>
      );
    },
  ),
  {
    displayName: 'CollectionToolbar',
    Title,
  },
);
