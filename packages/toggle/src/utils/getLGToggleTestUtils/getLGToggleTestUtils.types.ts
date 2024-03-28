import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type ToggleElements = Pick<FormElements<HTMLButtonElement>, 'getInput'>;
type ToggleUtils = Pick<FormUtils, 'getInputValue' | 'isDisabled'>;

export type LGToggleTestUtilsReturnType = ToggleElements & ToggleUtils;
