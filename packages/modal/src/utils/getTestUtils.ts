import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LGIDS_MODAL } from '../constants';

import { GetTestUtilsReturnType } from './getTestUtils.types';

export const getLgIds = (root: `lg-${string}` = LGIDS_MODAL.root) => {
  return {
    root,
  } as const;
};

export const getTestUtils = <T extends HTMLElement = HTMLElement>(
  lgId: `lg-${string}` = LGIDS_MODAL.root,
): GetTestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);

  /**
   * @returns a promise that resolves to the element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findModal = () => findByLgId!<T>(lgIds.root);

  /**
   * @returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getModal = () => getByLgId!<T>(lgIds.root);

  /**
   * @returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryModal = () => queryByLgId!<T>(lgIds.root);

  return {
    findModal,
    getModal,
    queryModal,
  };
};
