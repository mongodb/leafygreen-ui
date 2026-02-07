import React, { forwardRef, useMemo } from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';
import { useIdAllocator } from '@leafygreen-ui/hooks';

import { Actions, Filters, SearchInput, Title } from '../components';
import { CollapsibleContent } from '../components/CollapsibleContent';
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
      const titleId = useIdAllocator({ prefix: 'collection-toolbar-title' });
      const collapsibleContentId = useIdAllocator({
        prefix: 'collection-toolbar-collapsible-content',
      });

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
      const isCompact = variant === Variant.Compact;

      const content = useMemo(() => {
        if (isCompact) {
          return (
            <>
              {searchInput}
              {filters}
              {actions}
            </>
          );
        }

        if (isCollapsible) {
          return (
            <>
              {title}
              {actions}
              <CollapsibleContent searchInput={searchInput} filters={filters} />
            </>
          );
        }

        return (
          <>
            {searchInput}
            {actions}
            {filters}
          </>
        );
      }, [isCompact, isCollapsible, title, searchInput, filters, actions]);

      return (
        <CollectionToolbarProvider
          darkMode={darkMode}
          size={size}
          variant={variant}
          lgIds={lgIds}
          titleId={titleId}
          collapsibleContentId={collapsibleContentId}
        >
          <div
            data-lgid={lgIds.root}
            className={getCollectionToolbarStyles({ className })}
            ref={fwdRef}
            {...rest}
          >
            {content}
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
    SearchInput,
  },
);
