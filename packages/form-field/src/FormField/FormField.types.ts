import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

export const FormFieldState = {
  None: 'none',
  Error: 'error',
  Valid: 'valid',
} as const;
export type FormFieldState =
  (typeof FormFieldState)[keyof typeof FormFieldState];

export interface FormFieldInputWrapperProps extends HTMLElementProps<'div'> {
  [key: `data-${string}`]: any;
}

export interface FormFieldChildrenProps {
  id: string;
  'aria-labelledby': string;
  [key: string]: any;
}

export type FormFieldChildren = React.ReactElement<FormFieldChildrenProps>;

type AriaLabelProps =
  | {
      /**
       * The label rendered before the input
       */
      label: React.ReactNode;
      'aria-label'?: string;
      'aria-labelledby'?: string;
    }
  | {
      label?: React.ReactNode;

      /**
       * A label for screen readers
       */
      'aria-label': string;
      'aria-labelledby'?: string;
    }
  | {
      label?: React.ReactNode;
      'aria-label'?: string;

      /**
       * A reference to an external label element
       */
      'aria-labelledby': string;
    };

export type FormFieldProps = Omit<HTMLElementProps<'div'>, 'children'> &
  AriaLabelProps &
  DarkModeProps & {
    /**
     * `FormFieldInputContainer` component, or other custom input component
     */
    children: FormFieldChildren;

    /**
     * A description for the form field
     */
    description?: React.ReactNode;

    /**
     * The state of the component
     */
    state?: FormFieldState;

    /**
     * The size of the component
     */
    size?: Size;

    /**
     * Defines whether the component is disabled
     */
    disabled?: boolean;

    /**
     * The message to display below the form field when in an error state
     */
    errorMessage?: React.ReactNode;

    /**
     * Base font size of the component. Only effective when `size == 'default'`
     */
    baseFontSize?: BaseFontSize;

    /**
     * Whether or not the field is labeled as optional.
     */
    optional?: boolean;
  };
