import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { PaginationNavigation } from '@leafygreen-ui/pagination';
import React from 'react';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';
import { PaginationProps } from './Pagination.types';

const Pagination = CompoundSubComponent(
  ({ ...props }: PaginationProps) => <PaginationNavigation {...props} />,
  {
    displayName: 'Pagination',
    key: CollectionToolbarActionsSubComponentProperty.Pagination,
  },
);

export default Pagination;
