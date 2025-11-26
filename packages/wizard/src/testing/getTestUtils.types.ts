import { type GetTestUtilsReturnType as ButtonTestUtilsReturnType } from '@leafygreen-ui/button/testing';

export interface TestUtilsReturnType {
  // Footer utils
  findFooter: () => Promise<HTMLElement>;
  getFooter: () => HTMLElement;
  queryFooter: () => HTMLElement | null;

  // Primary Button utils
  getPrimaryButton: ButtonTestUtilsReturnType<HTMLButtonElement>['getButton'];
  queryPrimaryButton: ButtonTestUtilsReturnType<HTMLButtonElement>['queryButton'];
  findPrimaryButton: ButtonTestUtilsReturnType<HTMLButtonElement>['findButton'];
  isPrimaryButtonDisabled: ButtonTestUtilsReturnType<HTMLButtonElement>['isDisabled'];

  // Back Button utils
  getBackButton: ButtonTestUtilsReturnType<HTMLButtonElement>['getButton'];
  queryBackButton: ButtonTestUtilsReturnType<HTMLButtonElement>['queryButton'];
  findBackButton: ButtonTestUtilsReturnType<HTMLButtonElement>['findButton'];

  // Cancel Button utils
  getCancelButton: ButtonTestUtilsReturnType<HTMLButtonElement>['getButton'];
  queryCancelButton: ButtonTestUtilsReturnType<HTMLButtonElement>['queryButton'];
  findCancelButton: ButtonTestUtilsReturnType<HTMLButtonElement>['findButton'];
}
