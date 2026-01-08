import { LgIdProps } from '@leafygreen-ui/lib';
import { PaginationProps } from '../Pagination.types';

export type PageSizeProps<T extends number = number> = Pick<
  PaginationProps<T>,
  | 'itemsPerPageOptions'
  | 'id'
  | 'onItemsPerPageOptionChange'
  | 'itemsPerPage'
  | 'className'
> &
  LgIdProps;
