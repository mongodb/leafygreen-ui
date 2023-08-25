import { HTMLElementProps } from '@leafygreen-ui/lib';
export interface MenuGroupProps extends HTMLElementProps<'div'> {
  /**
   * Content that will appear inside of MenuGroup component.
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children: React.ReactNode;
}
