import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type CheckboxElements = Omit<FormElements<HTMLInputElement>, 'getErrorMessage'>;
type CheckboxUtils = Pick<FormUtils<boolean>, 'getInputValue' | 'isDisabled'>;

export type CheckboxTestUtilsReturnType = CheckboxElements &
  CheckboxUtils & {
    isIndeterminate: () => boolean;
  };
