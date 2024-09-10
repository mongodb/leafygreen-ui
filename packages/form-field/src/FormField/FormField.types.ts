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
       * A label for screen readers which is used if `label` or `aria-labelledby` are not defined
       * {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label See aria-label MDN docs}
       */
      'aria-label': string;
      'aria-labelledby'?: string;
    }
  | {
      label?: React.ReactNode;
      'aria-label'?: string;

      /**
       * A reference to an external label element which is used if `label` is not defined
       * {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby See aria-labelledby MDN docs}
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
     * Defines whether the component is disabled. This will set the `aria-disabled` and `readonly` attributes on the input, not the `disabled` attribute.
     */
    disabled?: boolean;

    /**
     * The message to display below the form field when in an error state
     */
    errorMessage?: React.ReactNode;

    /**
     * The message to display below the form field when in a valid state
     */
    successMessage?: React.ReactNode;

    /**
     * Base font size of the component. Only effective when `size == 'default'`
     */
    baseFontSize?: BaseFontSize;

    /**
     * Whether or not the field is labeled as optional.
     */
    optional?: boolean;

    /**
     * Whether or not the field is readonly.
     */
    readOnly?: boolean;
  };
