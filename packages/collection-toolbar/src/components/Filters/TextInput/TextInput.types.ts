import { TextInputProps as LGTextInputProps } from '@leafygreen-ui/text-input';

export type TextInputProps = Omit<LGTextInputProps, 'sizeVariant' | 'darkMode'>;
