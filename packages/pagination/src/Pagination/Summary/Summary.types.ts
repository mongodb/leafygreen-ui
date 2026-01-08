import { LgIdProps } from '@leafygreen-ui/lib';
import { PaginationProps } from '../Pagination.types';

export type SummaryProps<T extends number = number> = Pick<
  PaginationProps<T>,
  'itemsPerPage' | 'currentPage' | 'numTotalItems' | 'className'
> &
  LgIdProps;
