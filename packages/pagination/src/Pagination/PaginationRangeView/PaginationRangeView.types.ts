import { PaginationProps } from '../Pagination.types';

export type PaginationRangeViewProps = Pick<
  PaginationProps,
  'itemsPerPage' | 'currentPage' | 'numTotalItems'
>;
