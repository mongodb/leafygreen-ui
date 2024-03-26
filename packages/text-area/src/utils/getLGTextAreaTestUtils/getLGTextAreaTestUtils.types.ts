import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type TextAreaElements<T extends HTMLElement> = FormElements<T>;
type TextAreaUtils = Omit<FormUtils, 'isValid' | 'isOptional'>;

export interface LGTextAreaTestUtilsReturnType<
  T extends HTMLElement = HTMLTextAreaElement,
> {
  elements: TextAreaElements<T>;
  utils: TextAreaUtils;
}
