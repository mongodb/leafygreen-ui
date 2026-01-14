import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { PaginationNavigation } from '@leafygreen-ui/pagination';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';

import { getPaginationStyles } from './Pagination.styles';
import { PaginationProps } from './Pagination.types';

export const Pagination = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, PaginationProps>(
    ({ className, ...props }, fwdRef) => {
      const { lgIds } = useCollectionToolbarContext();
      return (
        <div ref={fwdRef}>
          <PaginationNavigation
            data-testid={lgIds.pagination}
            data-lgid={lgIds.pagination}
            className={getPaginationStyles({ className })}
            {...props}
          />
        </div>
      );
    },
  ),
  {
    displayName: 'Pagination',
    key: CollectionToolbarActionsSubComponentProperty.Pagination,
  },
);
