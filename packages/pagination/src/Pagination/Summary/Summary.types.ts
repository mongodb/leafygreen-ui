import { PaginationProps } from '../Pagination.types';

export type SummaryProps<T extends number = number> = Pick<
  PaginationProps<T>,
  'itemsPerPage' | 'currentPage' | 'numTotalItems' | 'className'
>;
