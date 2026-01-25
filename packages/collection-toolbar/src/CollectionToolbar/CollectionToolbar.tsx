import React, { forwardRef } from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';

import {
  Actions,
  Filters,
  Option,
  SearchInput,
  Select,
  Title,
} from '../components';
import { CollectionToolbarProvider } from '../Context/CollectionToolbarProvider';
import {
  CollectionToolbarSubComponentProperty,
  Size,
  Variant,
} from '../shared.types';
import { getLgIds } from '../utils';

import { getCollectionToolbarStyles } from './CollectionToolbar.styles';
import { collapsibleContentStyles } from './CollectionToolbar.styles';
import { CollectionToolbarProps } from './CollectionToolbar.types';

export const CollectionToolbar = CompoundComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, CollectionToolbarProps>(
    (
      {
        size = Size.Default,
        variant = Variant.Default,
        className,
        children,
        'data-lgid': dataLgId,
        darkMode,
        ...rest
      },
      fwdRef,
    ) => {
      const lgIds = getLgIds(dataLgId);

      const title = findChild(
        children,
        CollectionToolbarSubComponentProperty.Title,
      );
      const searchInput = findChild(
        children,
        CollectionToolbarSubComponentProperty.SearchInput,
      );

      const actions = findChild(
        children,
        CollectionToolbarSubComponentProperty.Actions,
      );

      const filters = findChild(
        children,
        CollectionToolbarSubComponentProperty.Filters,
      );

      const isCollapsible = variant === Variant.Collapsible;

      return (
        <CollectionToolbarProvider
          darkMode={darkMode}
          size={size}
          variant={variant}
          lgIds={lgIds}
        >
          <div
            data-lgid={lgIds.root}
            className={getCollectionToolbarStyles({ variant, className })}
            ref={fwdRef}
            {...rest}
          >
            {isCollapsible && title}
            {!isCollapsible && searchInput}
            {actions}
            {!isCollapsible && filters}
            {isCollapsible && (
              <div className={collapsibleContentStyles}>
                {searchInput}
                {filters}
              </div>
            )}
          </div>
        </CollectionToolbarProvider>
      );
    },
  ),
  {
    displayName: 'CollectionToolbar',
    Title,
    Actions,
    Filters,
    Option,
    Select,
    SearchInput,
  },
);
