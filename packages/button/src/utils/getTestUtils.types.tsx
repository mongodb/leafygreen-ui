import { FormUtils } from '@lg-tools/test-harnesses';

export interface GetTestUtilsReturnType<
  T extends React.ElementType<any> | HTMLButtonElement = HTMLButtonElement,
> {
  getButton: () => T;
  isDisabled: FormUtils['isDisabled'];
}
