import { PaginationProps } from '../Pagination.types';

export type PaginationItemsPerPageProps<T extends number = number> = Pick<
  PaginationProps<T>,
  | 'itemsPerPageOptions'
  | 'id'
  | 'onItemsPerPageOptionChange'
  | 'itemsPerPage'
  | 'className'
>;
