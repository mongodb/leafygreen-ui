import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type TextAreaElements<T extends HTMLElement> = FormElements<T>;
type TextAreaUtils = Omit<FormUtils, 'isValid' | 'isOptional'>;

export type LGTextAreaTestUtilsReturnType<
  T extends HTMLElement = HTMLTextAreaElement,
> = TextAreaElements<T> & TextAreaUtils;
