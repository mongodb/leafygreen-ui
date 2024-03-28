import {
  type DropdownElements,
  type DropdownUtils,
  type FormElements,
  type FormUtils,
} from '@lg-tools/test-harnesses';

export type SelectElements = FormElements<HTMLButtonElement> & DropdownElements;
export type SelectUtils = Omit<FormUtils, 'isValid' | 'isOptional'> &
  DropdownUtils;

export type LGSelectTestUtilsReturnType = SelectElements & SelectUtils;
