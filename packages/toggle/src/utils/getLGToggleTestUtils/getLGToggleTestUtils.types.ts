import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type ToggleElements<T extends HTMLElement> = Pick<FormElements<T>, 'getInput'>;
type ToggleUtils = Pick<FormUtils, 'getInputValue' | 'isDisabled'>;

export type LGToggleTestUtilsReturnType<
  T extends HTMLElement = HTMLButtonElement,
> = ToggleElements<T> & ToggleUtils;
