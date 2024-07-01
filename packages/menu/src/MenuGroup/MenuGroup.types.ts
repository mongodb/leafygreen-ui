import { HTMLElementProps } from '@leafygreen-ui/lib';
export interface MenuGroupProps extends HTMLElementProps<'div'> {
  /**
   * Main text rendered in `MenuGroup`.
   */
  title?: string;

  /**
   * Slot to pass in an Icon rendered to the left of the text.
   */
  glyph?: React.ReactElement;

  /**
   * Content that will appear inside of MenuGroup component.
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children: React.ReactNode;
}
