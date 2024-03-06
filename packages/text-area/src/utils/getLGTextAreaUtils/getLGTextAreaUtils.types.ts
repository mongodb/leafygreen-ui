import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type TextAreaElements = FormElements;
type TextAreaUtils = Omit<FormUtils, 'isValid'>;

export interface LGTextAreaUtilsReturnType {
  elements: TextAreaElements;
  utils: TextAreaUtils;
}
