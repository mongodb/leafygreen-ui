import {
  createUniqueClassName,
  DarkModeProps,
  Either,
  HTMLElementProps,
} from '@leafygreen-ui/lib';

interface InternalCheckboxProps
  extends HTMLElementProps<'input', never>,
    DarkModeProps {
  checked?: boolean;
  label?: React.ReactNode;
  ['aria-label']?: string;
  ['aria-labelledby']?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  animate?: boolean;
  bold?: boolean;
}

export type CheckboxProps = Either<
  InternalCheckboxProps,
  'label' | 'aria-label' | 'aria-labelledby'
>;

export interface CheckProps {
  isChecked: boolean;
  disabled: boolean;
  animate: boolean;
  selector: ReturnType<typeof createUniqueClassName>;
  indeterminate?: boolean;
}
