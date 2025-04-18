import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type TextAreaElements = FormElements<HTMLTextAreaElement>;
type TextAreaUtils = Omit<FormUtils, 'isValid' | 'isOptional'>;

export type TestUtilsReturnType = TextAreaElements & TextAreaUtils;
