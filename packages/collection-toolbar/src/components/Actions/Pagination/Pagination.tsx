import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { PaginationNavigation } from '@leafygreen-ui/pagination';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';

import { getPaginationStyles } from './Pagination.styles';
import { PaginationProps } from './Pagination.types';

const Pagination = CompoundSubComponent(
  ({ className, ...props }: PaginationProps) => {
    const { lgIds } = useCollectionToolbarContext();
    return (
      <PaginationNavigation
        data-testid={lgIds.pagination}
        data-lgid={lgIds.pagination}
        className={getPaginationStyles({ className })}
        {...props}
      />
    );
  },
  {
    displayName: 'Pagination',
    key: CollectionToolbarActionsSubComponentProperty.Pagination,
  },
);

export default Pagination;
