import { getByLgId } from '@lg-tools/test-harnesses';

import { LGIDS } from '../../constants';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: string = LGIDS.root,
): TestUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: HTMLElement = getByLgId!(lgId);

  /**
   * Returns a nodelist of all indicators/dots in the gallery indicator
   */
  const getAllIndicators = () =>
    element.querySelectorAll<HTMLElement>(`[data-lgid=${LGIDS.indicator}]`);

  /**
   * Returns the number of indicators/dots in the gallery indicator
   */
  const getIndicatorCount = () => getAllIndicators().length;

  /**
   * Returns the index of the active indicator
   */
  const getActiveIndex = () =>
    Array.from(getAllIndicators()).findIndex(
      indicator => indicator.getAttribute('data-active') === 'true',
    );

  return {
    getIndicatorCount: () => getIndicatorCount(),
    getActiveIndex: () => getActiveIndex(),
  };
};
