import { screen } from '@testing-library/react';

import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LgIdString } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * @returns a promise that resolves to the current WizardStep element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findCurrentStep = () => findByLgId!<HTMLDivElement>(lgIds.step);

  /**
   * @returns the current WizardStep element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getCurrentStep = () => getByLgId!<HTMLDivElement>(lgIds.step);

  /**
   * @returns the current WizardStep element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryCurrentStep = () => queryByLgId!<HTMLDivElement>(lgIds.step);

  /**
   * @returns a promise that resolves to the WizardFooter element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findFooter = () => screen.findByTestId<HTMLElement>(lgIds.footer);

  /**
   * @returns the WizardFooter element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getFooter = () => screen.getByTestId<HTMLElement>(lgIds.footer);

  /**
   * @returns the WizardFooter element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryFooter = () => screen.queryByTestId<HTMLElement>(lgIds.footer);

  /**
   * @returns the primary button element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getPrimaryButton = () =>
    screen.getByTestId<HTMLButtonElement>(lgIds.footerPrimaryButton);

  /**
   * @returns the primary button element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryPrimaryButton = () =>
    screen.queryByTestId<HTMLButtonElement>(lgIds.footerPrimaryButton);

  /**
   * @returns a promise that resolves to the primary button element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findPrimaryButton = () =>
    screen.findByTestId<HTMLButtonElement>(lgIds.footerPrimaryButton);

  /**
   * @returns the back button element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getBackButton = () =>
    screen.getByTestId<HTMLButtonElement>(lgIds.footerBackButton);

  /**
   * @returns the back button element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryBackButton = () =>
    screen.queryByTestId<HTMLButtonElement>(lgIds.footerBackButton);

  /**
   * @returns a promise that resolves to the back button element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findBackButton = () =>
    screen.findByTestId<HTMLButtonElement>(lgIds.footerBackButton);

  /**
   * @returns the cancel button element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getCancelButton = () =>
    screen.getByTestId<HTMLButtonElement>(lgIds.footerCancelButton);

  /**
   * @returns the cancel button element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryCancelButton = () =>
    screen.queryByTestId<HTMLButtonElement>(lgIds.footerCancelButton);

  /**
   * @returns a promise that resolves to the cancel button element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findCancelButton = () =>
    screen.findByTestId<HTMLButtonElement>(lgIds.footerCancelButton);

  return {
    findCurrentStep,
    getCurrentStep,
    queryCurrentStep,
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
