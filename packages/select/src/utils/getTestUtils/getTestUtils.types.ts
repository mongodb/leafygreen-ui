import {
  type DropdownElements,
  type FormElements,
  type FormUtils,
} from '@lg-tools/test-harnesses';

export type SelectElements = FormElements<HTMLButtonElement> & DropdownElements;
export type SelectUtils = Omit<FormUtils, 'isValid' | 'isOptional'>;

export type TestUtilsReturnType = SelectElements & SelectUtils;
