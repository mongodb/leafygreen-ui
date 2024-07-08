import { ButtonProps } from '@leafygreen-ui/button';
import { ModalProps } from '@leafygreen-ui/modal';

export const Variant = {
  Default: 'primary',
  Danger: 'danger',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

interface CustomButtonOnClick {
  onClick?: () => void;
}
type CustomConfirmButtonProps = Omit<ButtonProps, 'variant' | 'onClick'> &
  CustomButtonOnClick;
type CustomCancelButtonProps = Omit<ButtonProps, 'onClick'> &
  CustomButtonOnClick;

export interface ConfirmationModalProps extends Omit<ModalProps, 'size'> {
  /**
   * Text of header element
   */
  title: string;

  /**
   * The component is shown when the value is set to `true`.
   */
  open?: boolean;

  /**
   * Callback fired when the primary action button is clicked.
   * @deprecated Use `confirmButtonProps`.
   */
  onConfirm?: () => void;

  /**
   * Callback fired when the cancel button is clicked.
   * @deprecated Use `cancelButtonProps`.
   */
  onCancel?: () => void;

  /**
   * Text rendered in the primary button. Defaults to `"Confirm"`
   * @deprecated Use `confirmButtonProps`.
   */
  buttonText?: string;

  /**
   * Variant of the modal that represents the type of action handled by the modal.
   */
  variant?: Variant;

  /**
   * If set, the user will be prompted to type the requiredInputText into an input field
   */
  requiredInputText?: string;

  /**
   * If `true`, the primary action button will be disabled
   * @deprecated Use `confirmButtonProps`.
   */
  submitDisabled?: boolean;

  /**
   * An object that accepts all Button props except for the `variant` prop. The variant is controlled by the `variant` prop.
   */
  confirmButtonProps?: CustomConfirmButtonProps;

  /**
   * An object that accepts all Button props. The `onClick` property will also fire when the `X` button, or backdrop is clicked.
   */
  cancelButtonProps?: CustomCancelButtonProps;
}
