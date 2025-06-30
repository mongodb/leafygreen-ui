import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface SectionNavItemProps extends HTMLElementProps<'a'> {
  /**
   *  Whether the item is active.
   */
  active?: boolean;

  /**
   * The heading label.
   */
  label: React.ReactNode;
}
