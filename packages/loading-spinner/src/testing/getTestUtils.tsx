import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LgIdString } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = <T extends Element = SVGSVGElement>(
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): TestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);

  /**
   * @returns a promise that resolves to the LoadingSpinner element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findLoadingSpinner = () =>
    findByLgId!(lgIds.root) as unknown as Promise<T>;

  /**
   * @returns the LoadingSpinner element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getLoadingSpinner = () => getByLgId!(lgIds.root) as unknown as T;

  /**
   * @returns the LoadingSpinner element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryLoadingSpinner = () =>
    queryByLgId!(lgIds.root) as unknown as T | null;

  return {
    findLoadingSpinner,
    getLoadingSpinner,
    queryLoadingSpinner,
  };
};
