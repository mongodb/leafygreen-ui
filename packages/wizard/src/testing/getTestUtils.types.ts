export interface WizardButtonUtils {
  /**
   * Returns a promise that resolves to the button element
   */
  findButton: () => Promise<HTMLButtonElement>;

  /**
   * Returns the button element. Will throw if not found
   */
  getButton: () => HTMLButtonElement;

  /**
   * Returns the button element or null if not found
   */
  queryButton: () => HTMLButtonElement | null;

  /**
   * Returns whether the button is disabled
   */
  isDisabled: () => boolean;
}

export interface WizardTestUtilsReturnType {
  /**
   * Returns a promise that resolves to the wizard root element
   */
  findWizard: () => Promise<HTMLElement>;

  /**
   * Returns the wizard root element. Will throw if not found
   */
  getWizard: () => HTMLElement;

  /**
   * Returns the wizard root element or null if not found
   */
  queryWizard: () => HTMLElement | null;

  /**
   * Returns a promise that resolves to the current step element
   */
  findCurrentStep: () => Promise<HTMLElement>;

  /**
   * Returns the current step element. Will throw if not found
   */
  getCurrentStep: () => HTMLElement;

  /**
   * Returns the current step element or null if not found
   */
  queryCurrentStep: () => HTMLElement | null;

  /**
   * Returns a promise that resolves to the footer element
   */
  findFooter: () => Promise<HTMLElement>;

  /**
   * Returns the footer element. Will throw if not found
   */
  getFooter: () => HTMLElement;

  /**
   * Returns the footer element or null if not found
   */
  queryFooter: () => HTMLElement | null;

  /**
   * Returns test utilities for the back button
   */
  getBackButtonUtils: () => WizardButtonUtils;

  /**
   * Returns test utilities for the cancel button
   */
  getCancelButtonUtils: () => WizardButtonUtils;

  /**
   * Returns test utilities for the primary button
   */
  getPrimaryButtonUtils: () => WizardButtonUtils;
}
