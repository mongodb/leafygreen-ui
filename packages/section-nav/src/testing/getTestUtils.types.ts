interface SectionNavItemUtils {
  /**
   * Returns the HTML element for the SectionNavItem.
   */
  getElement: () => HTMLAnchorElement | undefined;

  /**
   * Returns whether the SectionNavItem is active.
   */
  isActive: () => boolean | undefined;
}

export interface TestUtilsReturnType {
  /**
   * Returns a promise that resolves to the element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  findSectionNav: () => Promise<HTMLElement>;

  /**
   * Returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  getSectionNav: () => HTMLElement;

  /**
   * Returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  querySectionNav: () => HTMLElement | null;

  /**
   * Returns the title element of the SectionNav.
   */
  getTitle: () => HTMLHeadingElement | null;

  /**
   * Returns an array of all SectionNavItems
   */
  getAllSectionNavItems: () => Array<HTMLAnchorElement>;

  /**
   * Returns the SectionNavItem based on the label text
   */
  getSectionNavItemByLabel: (label: string) => SectionNavItemUtils;

  /**
   * Returns the first active SectionNavItem
   */
  getActiveSectionNavItem: () => HTMLAnchorElement | undefined;
}
