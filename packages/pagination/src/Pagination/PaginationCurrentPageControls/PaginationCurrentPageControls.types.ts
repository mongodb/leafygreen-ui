import { PaginationProps } from '../Pagination.types';

export type PaginationCurrentPageControlsProps = Pick<
  PaginationProps,
  | 'onCurrentPageOptionChange'
  | 'currentPage'
  | 'numTotalItems'
  | 'itemsPerPage'
  | 'shouldDisableBackArrow'
  | 'shouldDisableForwardArrow'
  | 'onBackArrowClick'
  | 'onForwardArrowClick'
>;
