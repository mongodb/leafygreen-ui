import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LgIdString } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * Returns a promise that resolves to the element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findSectionNav = () => findByLgId!<HTMLElement>(lgIds.root);

  /**
   * Returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getSectionNav = () => getByLgId!<HTMLElement>(lgIds.root);

  /**
   * Returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const querySectionNav = () => queryByLgId!<HTMLElement>(lgIds.root);

  /**
   * Returns the title element of the SectionNav.
   */
  const getSectionTitle = () => {
    const element = getSectionNav();
    return element.querySelector<HTMLParagraphElement>(
      `[data-lgid=${lgIds.title}]`,
    );
  };

  /**
   * Returns an array of all SectionNavItem
   */
  const getAllSectionNavItems = (): Array<HTMLAnchorElement> => {
    const element = getSectionNav();

    return Array.from(
      element.querySelectorAll<HTMLAnchorElement>(`[data-lgid^=${lgIds.item}]`),
    );
  };

  /**
   * Returns the SectionNavItem based on the text
   */
  const getSectionNavItemByLabel = (text: string) => {
    if (!text) throw new Error('text cannot be empty');

    const item = getAllSectionNavItems().find(
      item => item.textContent === text,
    );

    if (!item) {
      throw new Error(
        `SectionNavItem with the text content "${text}" could not be found`,
      );
    }

    return {
      getElement: () => item,
      isActive: () => item?.getAttribute('data-active') === 'true',
    };
  };

  /**
   * Returns the first active SectionNavIconButton
   */
  const getActiveSectionNavItem = () => {
    const activeItem = getAllSectionNavItems().find(
      activeItem => activeItem.getAttribute('data-active') === 'true',
    );
    return activeItem;
  };

  return {
    findSectionNav,
    getSectionNav,
    querySectionNav,
    getSectionTitle: () => getSectionTitle(),
    getAllSectionNavItems: () => getAllSectionNavItems(),
    getSectionNavItemByLabel: (label: string) =>
      getSectionNavItemByLabel(label),
    getActiveSectionNavItem: () => getActiveSectionNavItem(),
  };
};
