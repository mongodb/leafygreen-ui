import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';
import { screen } from '@testing-library/react';

import { LgIdString } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import {
  WizardButtonUtils,
  WizardTestUtilsReturnType,
} from './getTestUtils.types';

// FormFooter button test IDs (since Wizard.Footer uses FormFooter internally)
const getFormFooterTestIds = (wizardLgId: LgIdString) => {
  const footerLgId = `${wizardLgId}-footer`;
  return {
    backButton: `${footerLgId}-back_button`,
    cancelButton: `${footerLgId}-cancel_button`,
    primaryButton: `${footerLgId}-primary_button`,
  } as const;
};

/**
 * Creates button utilities that query by testid (since FormFooter uses testids for buttons)
 */
const createButtonUtils = (testId: string): WizardButtonUtils => {
  const findButton = async () => {
    return screen.findByTestId(testId) as Promise<HTMLButtonElement>;
  };

  const getButton = () => {
    return screen.getByTestId(testId) as HTMLButtonElement;
  };

  const queryButton = () => {
    return screen.queryByTestId(testId) as HTMLButtonElement | null;
  };

  const isDisabled = () => {
    const button = getButton();
    return button.getAttribute('aria-disabled') === 'true';
  };

  return {
    findButton,
    getButton,
    queryButton,
    isDisabled,
  };
};

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): WizardTestUtilsReturnType => {
  const lgIds = getLgIds(lgId);
  const footerButtonTestIds = getFormFooterTestIds(lgId);

  /**
   * @returns a promise that resolves to the wizard root element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findWizard = () => findByLgId!<HTMLElement>(lgIds.root);

  /**
   * @returns the wizard root element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getWizard = () => getByLgId!<HTMLElement>(lgIds.root);

  /**
   * @returns the wizard root element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryWizard = () => queryByLgId!<HTMLElement>(lgIds.root);

  /**
   * @returns a promise that resolves to the current step element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findCurrentStep = () => findByLgId!<HTMLElement>(lgIds.step);

  /**
   * @returns the current step element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getCurrentStep = () => getByLgId!<HTMLElement>(lgIds.step);

  /**
   * @returns the current step element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryCurrentStep = () => queryByLgId!<HTMLElement>(lgIds.step);

  /**
   * @returns a promise that resolves to the footer element using the `data-testid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findFooter = () =>
    screen.findByTestId(lgIds.footer) as Promise<HTMLElement>;

  /**
   * @returns the footer element using the `data-testid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getFooter = () => screen.getByTestId(lgIds.footer) as HTMLElement;

  /**
   * @returns the footer element using the `data-testid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryFooter = () =>
    screen.queryByTestId(lgIds.footer) as HTMLElement | null;

  /**
   * Returns test utilities for the back button in the footer
   */
  const getBackButtonUtils = () =>
    createButtonUtils(footerButtonTestIds.backButton);

  /**
   * Returns test utilities for the cancel button in the footer
   */
  const getCancelButtonUtils = () =>
    createButtonUtils(footerButtonTestIds.cancelButton);

  /**
   * Returns test utilities for the primary button in the footer
   */
  const getPrimaryButtonUtils = () =>
    createButtonUtils(footerButtonTestIds.primaryButton);

  return {
    findWizard,
    getWizard,
    queryWizard,
    findCurrentStep,
    getCurrentStep,
    queryCurrentStep,
    findFooter,
    getFooter,
    queryFooter,
    getBackButtonUtils,
    getCancelButtonUtils,
    getPrimaryButtonUtils,
  };
};
