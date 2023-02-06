export interface MenuGroupProps {
  /**
   * Content that will appear inside of MenuGroup component.
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children: React.ReactNode;

  /**
   * className that will be applied to root MenuGroup element.
   */
  className?: string;
}
