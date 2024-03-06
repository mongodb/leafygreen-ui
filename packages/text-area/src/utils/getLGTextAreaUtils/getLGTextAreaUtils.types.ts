import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type TextInputElements = FormElements;
type TextInputUtils = Omit<FormUtils, 'isValid'>;

export interface LGTextAreaUtilsReturnType {
  elements: TextInputElements;
  utils: TextInputUtils;
}
