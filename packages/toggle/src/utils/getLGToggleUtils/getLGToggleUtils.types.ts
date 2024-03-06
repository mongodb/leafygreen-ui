import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type ToggleElements<T extends HTMLElement> = Pick<FormElements<T>, 'getInput'>;
type ToggleUtils = Pick<FormUtils, 'inputValue' | 'isDisabled'>;

export interface LGToggleUtilsReturnType<
  T extends HTMLElement = HTMLButtonElement,
> {
  elements: ToggleElements<T>;
  utils: ToggleUtils;
}
