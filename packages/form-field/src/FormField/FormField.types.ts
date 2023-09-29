import { HTMLElementProps } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

export const FormFieldState = {
  Unset: 'unset',
  Error: 'error',
  Valid: 'valid',
} as const;
export type FormFieldState =
  (typeof FormFieldState)[keyof typeof FormFieldState];

export interface FormFieldInputWrapperProps extends HTMLElementProps<'div'> {}

export interface FormFieldChildrenProps {
  id: string;
  'aria-labelledby': string;
  [key: string]: any;
}

export type FormFieldChildren = React.ReactElement<FormFieldChildrenProps>;

type AriaLabelProps =
  | {
      label: React.ReactNode;
      'aria-label'?: string;
      'aria-labelledby'?: string;
    }
  | {
      label?: React.ReactNode;
      'aria-label': string;
      'aria-labelledby'?: string;
    }
  | {
      label?: React.ReactNode;
      'aria-label'?: string;
      'aria-labelledby': string;
    };

export type FormFieldProps = Omit<HTMLElementProps<'div'>, 'children'> &
  AriaLabelProps & {
    children: FormFieldChildren;
    description?: React.ReactNode;
    state?: FormFieldState;
    size?: Size;
    disabled?: boolean;
    errorMessage?: React.ReactNode;
    icon?: React.ReactElement;
    inputWrapperProps?: FormFieldInputWrapperProps;
  };
