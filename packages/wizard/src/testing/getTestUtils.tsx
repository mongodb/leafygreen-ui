import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LgIdString } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * @returns a promise that resolves to the WizardFooter element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findFooter = () => findByLgId!<HTMLElement>(lgIds.footer);

  /**
   * @returns the WizardFooter element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getFooter = () => getByLgId!<HTMLElement>(lgIds.footer);

  /**
   * @returns the WizardFooter element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryFooter = () => queryByLgId!<HTMLElement>(lgIds.footer);

  /**
   * @returns the primary button element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getPrimaryButton = () =>
    getByLgId!<HTMLButtonElement>(lgIds.footerPrimaryButton);

  /**
   * @returns the primary button element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryPrimaryButton = () =>
    queryByLgId!<HTMLButtonElement>(lgIds.footerPrimaryButton);

  /**
   * @returns a promise that resolves to the primary button element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findPrimaryButton = () =>
    findByLgId!<HTMLButtonElement>(lgIds.footerPrimaryButton);

  /**
   * @returns the back button element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getBackButton = () =>
    getByLgId!<HTMLButtonElement>(lgIds.footerBackButton);

  /**
   * @returns the back button element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryBackButton = () =>
    queryByLgId!<HTMLButtonElement>(lgIds.footerBackButton);

  /**
   * @returns a promise that resolves to the back button element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findBackButton = () =>
    findByLgId!<HTMLButtonElement>(lgIds.footerBackButton);

  /**
   * @returns the cancel button element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getCancelButton = () =>
    getByLgId!<HTMLButtonElement>(lgIds.footerCancelButton);

  /**
   * @returns the cancel button element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryCancelButton = () =>
    queryByLgId!<HTMLButtonElement>(lgIds.footerCancelButton);

  /**
   * @returns a promise that resolves to the cancel button element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findCancelButton = () =>
    findByLgId!<HTMLButtonElement>(lgIds.footerCancelButton);

  return {
    findFooter,
    getFooter,
    queryFooter,
    getPrimaryButton,
    queryPrimaryButton,
    findPrimaryButton,
    getBackButton,
    queryBackButton,
    findBackButton,
    getCancelButton,
    queryCancelButton,
    findCancelButton,
  };
};
