import { createDataProp, Either, HTMLElementProps } from '@leafygreen-ui/lib';

interface InternalCheckboxProps extends HTMLElementProps<'input', never> {
  darkMode?: boolean;
  checked?: boolean;
  label?: React.ReactNode;
  ['aria-label']?: string;
  ['aria-labelledby']?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  bold?: boolean;
  animate?: boolean;
}

export type CheckboxProps = Either<
  InternalCheckboxProps,
  'label' | 'aria-label' | 'aria-labelledby'
>;

export interface CheckProps {
  isChecked: boolean;
  disabled: boolean;
  animate: boolean;
  selector: ReturnType<typeof createDataProp>;
  indeterminate?: boolean;
}
