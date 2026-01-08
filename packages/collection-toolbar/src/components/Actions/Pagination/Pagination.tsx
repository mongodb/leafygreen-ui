import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { PaginationNavigation } from '@leafygreen-ui/pagination';
import React from 'react';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';
import { PaginationProps } from './Pagination.types';
import { getPaginationStyles } from './Pagination.styles';
import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';

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
