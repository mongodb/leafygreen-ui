import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface TableHeadProps extends HTMLElementProps<'thead'> {
  /**
   * Determines whether the table head will stick as the user scrolls down.
   */
  isSticky?: boolean;
}
