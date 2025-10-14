import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LgIdString } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * @returns a promise that resolves to the LoadingSpinner element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findLoadingSpinner = () =>
    findByLgId!(lgIds.spinner) as unknown as Promise<SVGSVGElement>;

  /**
   * @returns the LoadingSpinner element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getLoadingSpinner = () =>
    getByLgId!(lgIds.spinner) as unknown as SVGSVGElement;

  /**
   * @returns the LoadingSpinner element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryLoadingSpinner = () =>
    queryByLgId!(lgIds.spinner) as unknown as SVGSVGElement | null;

  /**
   * @returns a promise that resolves to the PageLoader element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findPageLoader = () => findByLgId!<HTMLDivElement>(lgIds.pageLoader);

  /**
   * @returns the PageLoader element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getPageLoader = () => getByLgId!<HTMLDivElement>(lgIds.pageLoader);

  /**
   * @returns the PageLoader element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryPageLoader = () => queryByLgId!<HTMLDivElement>(lgIds.pageLoader);

  return {
    findLoadingSpinner,
    getLoadingSpinner,
    queryLoadingSpinner,
    findPageLoader,
    getPageLoader,
    queryPageLoader,
  };
};
