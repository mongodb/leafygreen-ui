import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface SectionNavItemProps extends HTMLElementProps<'a'> {
  /**
   *  Whether the item is active.
   */
  active?: boolean;

  /**
   * The depth of the item in the section nav hierarchy.
   * This is used to determine the indentation of the item.
   *
   * @default 1
   */
  depth?: number;
}
