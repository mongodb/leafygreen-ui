import { TestUtilsReturnType as WizardTestUtilsReturnType } from '@leafygreen-ui/wizard/testing';

export interface DeleteWizardTestUtilsReturnType
  extends WizardTestUtilsReturnType {
  // DeleteWizard root element utils
  getDeleteWizard: () => HTMLElement;
  queryDeleteWizard: () => HTMLElement | null;
  findDeleteWizard: () => Promise<HTMLElement>;

  // Header utils
  getHeader: () => HTMLElement;
  queryHeader: () => HTMLElement | null;
  findHeader: () => Promise<HTMLElement>;

  // Active Step utils (from Wizard)
  getActiveStep: () => HTMLElement;
  queryActiveStep: () => HTMLElement | null;
  findActiveStep: () => Promise<HTMLElement>;
}
