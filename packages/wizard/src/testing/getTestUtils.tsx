import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { getTestUtils as getButtonUtils } from '@leafygreen-ui/button/testing';
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
  const getPrimaryButton = getButtonUtils<HTMLButtonElement>(
    lgIds.footerPrimaryButton,
  ).getButton;

  /**
   * @returns the primary button element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryPrimaryButton = getButtonUtils<HTMLButtonElement>(
    lgIds.footerPrimaryButton,
  ).queryButton;

  /**
   * @returns a promise that resolves to the primary button element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findPrimaryButton = getButtonUtils<HTMLButtonElement>(
    lgIds.footerPrimaryButton,
  ).findButton;

  /**
   * @returns whether the primary button is disabled (via `aria-disabled`)
   */
  const isPrimaryButtonDisabled = getButtonUtils<HTMLButtonElement>(
    lgIds.footerPrimaryButton,
  ).isDisabled;

  /**
   * @returns the back button element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getBackButton = getButtonUtils<HTMLButtonElement>(
    lgIds.footerBackButton,
  ).getButton;

  /**
   * @returns the back button element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryBackButton = getButtonUtils<HTMLButtonElement>(
    lgIds.footerBackButton,
  ).queryButton;

  /**
   * @returns a promise that resolves to the back button element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findBackButton = getButtonUtils<HTMLButtonElement>(
    lgIds.footerBackButton,
  ).findButton;

  /**
   * @returns the cancel button element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getCancelButton = getButtonUtils<HTMLButtonElement>(
    lgIds.footerCancelButton,
  ).getButton;

  /**
   * @returns the cancel button element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryCancelButton = getButtonUtils<HTMLButtonElement>(
    lgIds.footerCancelButton,
  ).queryButton;

  /**
   * @returns a promise that resolves to the cancel button element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findCancelButton = getButtonUtils<HTMLButtonElement>(
    lgIds.footerCancelButton,
  ).findButton;

  return {
    findFooter,
    getFooter,
    queryFooter,
    getPrimaryButton,
    queryPrimaryButton,
    findPrimaryButton,
    isPrimaryButtonDisabled,
    getBackButton,
    queryBackButton,
    findBackButton,
    getCancelButton,
    queryCancelButton,
    findCancelButton,
  };
};
