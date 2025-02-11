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

  const getAllIndicators = () =>
    element.querySelectorAll<HTMLElement>(`[data-lgid=${LGIDS.indicator}]`);

  const getIndicatorCount = () => getAllIndicators().length;

  const getActiveIndex = () =>
    Array.from(getAllIndicators()).findIndex(
      indicator => indicator.getAttribute('data-active') === 'true',
    );

  return {
    getIndicatorCount: () => getIndicatorCount(),
    getActiveIndex: () => getActiveIndex(),
  };
};
