export interface TestUtilsReturnType {
  // Current Step utils
  findCurrentStep: () => Promise<HTMLDivElement>;
  getCurrentStep: () => HTMLDivElement;
  queryCurrentStep: () => HTMLDivElement | null;

  // Footer utils
  findFooter: () => Promise<HTMLElement>;
  getFooter: () => HTMLElement;
  queryFooter: () => HTMLElement | null;

  // Primary Button utils
  getPrimaryButton: () => HTMLButtonElement;
  queryPrimaryButton: () => HTMLButtonElement | null;
  findPrimaryButton: () => Promise<HTMLButtonElement>;

  // Back Button utils
  getBackButton: () => HTMLButtonElement;
  queryBackButton: () => HTMLButtonElement | null;
  findBackButton: () => Promise<HTMLButtonElement>;

  // Cancel Button utils
  getCancelButton: () => HTMLButtonElement;
  queryCancelButton: () => HTMLButtonElement | null;
  findCancelButton: () => Promise<HTMLButtonElement>;
}
