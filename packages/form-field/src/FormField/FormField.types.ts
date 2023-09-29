import { HTMLElementProps } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

export const FormFieldState = {
  Unset: 'unset',
  Error: 'error',
  Valid: 'valid',
} as const;
export type FormFieldState =
  (typeof FormFieldState)[keyof typeof FormFieldState];

interface FormFieldInputWrapperProps extends HTMLElementProps<'div'> {}

interface FormFieldChildrenProps {
  id: string;
  'aria-labelledby': string;
  [key: string]: any;
}
type FormFieldChildren = React.ReactElement<FormFieldChildrenProps>;

export interface FormFieldProps
  extends Omit<HTMLElementProps<'div'>, 'children'> {
  children: FormFieldChildren;
  label?: React.ReactNode;
  description?: React.ReactNode;
  state?: FormFieldState;
  size?: Size;
  disabled?: boolean;
  notificationMessage?: React.ReactNode;
  icon?: React.ReactElement;
  inputWrapperProps?: FormFieldInputWrapperProps;
}
