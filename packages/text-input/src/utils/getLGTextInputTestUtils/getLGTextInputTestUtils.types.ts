import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type TextInputElements = FormElements;
type TextInputUtils = FormUtils;

export interface LGTextInputTestUtilsReturnType {
  elements: TextInputElements;
  utils: TextInputUtils;
}
