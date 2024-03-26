import {
  type DropdownElements,
  type DropdownUtils,
  type FormElements,
  type FormUtils,
} from '@lg-tools/test-harnesses';

export type SelectElements<T extends HTMLElement> = FormElements<T> &
  DropdownElements;
export type SelectUtils = Omit<FormUtils, 'isValid' | 'isOptional'> &
  DropdownUtils;

export interface LGSelectTestUtilsReturnType<
  T extends HTMLElement = HTMLButtonElement,
> {
  elements: SelectElements<T>;
  utils: SelectUtils;
}
