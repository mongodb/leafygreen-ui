import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LgIdString } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * @returns a promise that resolves to the SkeletonLoader element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findSkeletonLoader = () => findByLgId!<HTMLDivElement>(lgIds.root);

  /**
   * @returns the SkeletonLoader element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getSkeletonLoader = () => getByLgId!<HTMLDivElement>(lgIds.root);

  /**
   * @returns the SkeletonLoader element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const querySkeletonLoader = () => queryByLgId!<HTMLDivElement>(lgIds.root);

  return {
    findSkeletonLoader,
    getSkeletonLoader,
    querySkeletonLoader,
  };
};
