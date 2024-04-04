import { FormUtils } from '@lg-tools/test-harnesses';

export interface GetTestUtilsReturnType<T extends HTMLElement> {
  getButton: () => T;
  isDisabled: FormUtils['isDisabled'];
}
