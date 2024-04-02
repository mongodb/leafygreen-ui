import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type ToggleElements = Pick<FormElements<HTMLButtonElement>, 'getInput'>;
type ToggleUtils = Pick<FormUtils<boolean>, 'getInputValue' | 'isDisabled'>;

export type TestUtilsReturnType = ToggleElements & ToggleUtils;
