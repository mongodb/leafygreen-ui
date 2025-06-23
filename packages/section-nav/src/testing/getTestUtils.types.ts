interface SectionNavItemUtils {
  /**
   * Returns the HTMLAnchorElement for the SectionNavItem.
   */
  getElement: () => HTMLAnchorElement | undefined;

  /**
   * Returns whether the SectionNavItem is active.
   */
  isActive: () => boolean | undefined;

  /**
   * Returns the depth level of the SectionNavItem.
   */
  getLevel: () => number | undefined;
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
   * Returns an array of all SectionNavItems
   */
  getAllSectionNavItems: () => Array<HTMLAnchorElement>;

  /**
   * Returns the SectionNavItem based on the text
   */
  getSectionNavItemByText: (text: string) => SectionNavItemUtils | null;

  /**
   * Returns the first active SectionNavItem
   */
  getActiveSectionNavItem: () => HTMLAnchorElement | undefined;
}
