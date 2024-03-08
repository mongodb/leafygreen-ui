import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type TextInputElements = FormElements;
type TextInputUtils = FormUtils;

export interface LGTextInputUtilsReturnType {
  elements: TextInputElements;
  utils: TextInputUtils & {
    /**
     * Returns whether the input is 'optional'
     */
    isOptional: () => boolean;
  };
}
