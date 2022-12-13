export interface CollapsedSideNavItemProps {
  /**
   * React Node rendered when the navigation is collapsed.
   */
  children: React.ReactNode;

  /**
   * Displays the collapsed item with an active state.
   */
  active?: boolean;

  /**
   * className applied to the root element rendered.
   */
  className?: string;
}
