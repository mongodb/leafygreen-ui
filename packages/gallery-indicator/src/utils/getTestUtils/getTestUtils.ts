import { getByLgId } from '@lg-tools/test-harnesses';

import { DEFAULT_LGID_ROOT, getLgIds } from '../getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: HTMLElement = getByLgId!(lgIds.root);

  /**
   * Returns a nodelist of all indicators/dots in the gallery indicator
   */
  const getAllIndicators = () =>
    element.querySelectorAll<HTMLElement>(`[data-lgid=${lgIds.indicator}]`);

  /**
   * Returns the number of indicators/dots in the gallery indicator
   */
  const getIndicatorLength = () => getAllIndicators().length;

  /**
   * Returns the index of the active indicator
   */
  const getActiveIndex = () =>
    Array.from(getAllIndicators()).findIndex(
      indicator => indicator.getAttribute('data-active') === 'true',
    );

  return {
    getIndicatorLength: () => getIndicatorLength(),
    getActiveIndex: () => getActiveIndex(),
  };
};
