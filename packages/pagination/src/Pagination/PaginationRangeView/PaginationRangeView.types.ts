import { PaginationProps } from '../Pagination.types';

export type PaginationRangeViewProps<T extends number = number> = Pick<
  PaginationProps<T>,
  'itemsPerPage' | 'currentPage' | 'numTotalItems' | 'className'
>;
