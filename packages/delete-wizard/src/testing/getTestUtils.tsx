import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LgIdString } from '@leafygreen-ui/lib';
import { getTestUtils as getWizardTestUtils } from '@leafygreen-ui/wizard/testing';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import { DeleteWizardTestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): DeleteWizardTestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  // Get the Wizard test utils (the DeleteWizard wraps a Wizard component internally)
  const wizardUtils = getWizardTestUtils(lgIds.wizard);

  /**
   * @returns the DeleteWizard root element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getDeleteWizard = () => getByLgId!<HTMLElement>(lgIds.root);

  /**
   * @returns the DeleteWizard root element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryDeleteWizard = () => queryByLgId!<HTMLElement>(lgIds.root);

  /**
   * @returns a promise that resolves to the DeleteWizard root element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findDeleteWizard = () => findByLgId!<HTMLElement>(lgIds.root);

  /**
   * @returns the DeleteWizard Header element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getHeader = () => getByLgId!<HTMLElement>(lgIds.header);

  /**
   * @returns the DeleteWizard Header element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryHeader = () => queryByLgId!<HTMLElement>(lgIds.header);

  /**
   * @returns a promise that resolves to the DeleteWizard Header element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findHeader = () => findByLgId!<HTMLElement>(lgIds.header);

  /**
   * @returns the currently active WizardStep element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getActiveStep = () => getByLgId!<HTMLElement>(lgIds.step);

  /**
   * @returns the currently active WizardStep element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryActiveStep = () => queryByLgId!<HTMLElement>(lgIds.step);

  /**
   * @returns a promise that resolves to the currently active WizardStep element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findActiveStep = () => findByLgId!<HTMLElement>(lgIds.step);

  return {
    // Spread all Wizard test utils (footer, buttons, etc.)
    ...wizardUtils,
    // DeleteWizard-specific utils
    getDeleteWizard,
    queryDeleteWizard,
    findDeleteWizard,
    getHeader,
    queryHeader,
    findHeader,
    getActiveStep,
    queryActiveStep,
    findActiveStep,
  };
};
