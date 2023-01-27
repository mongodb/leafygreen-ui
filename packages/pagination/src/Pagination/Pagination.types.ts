import { AccessibleIconButtonProps } from '@leafygreen-ui/icon-button';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { SelectProps } from '@leafygreen-ui/select';

interface PaginationProps extends HTMLElementProps<'div'>, DarkModeProps {
  itemsPerPage: number;
  itemsPerPageOptions: Array<number>;
  onItemsPerPageOptionChange?: SelectProps['onChange'];
  currentPage: number;
  onCurrentPageOptionChange?: SelectProps['onChange'];
  numTotalItems?: number;
  onForwardArrowClick: AccessibleIconButtonProps['onClick'];
  onBackArrowClick: AccessibleIconButtonProps['onClick'];
}

export { PaginationProps };
