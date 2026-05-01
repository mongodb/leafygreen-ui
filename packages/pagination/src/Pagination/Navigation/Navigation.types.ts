import { LgIdProps } from '@leafygreen-ui/lib';

import { PaginationProps } from '../Pagination.types';

export type NavigationProps = Pick<
  PaginationProps,
  | 'onCurrentPageOptionChange'
  | 'currentPage'
  | 'numTotalItems'
  | 'itemsPerPage'
  | 'shouldDisableBackArrow'
  | 'shouldDisableForwardArrow'
  | 'onBackArrowClick'
  | 'onForwardArrowClick'
  | 'className'
> &
  LgIdProps;
