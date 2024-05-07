import { ButtonProps } from '@leafygreen-ui/button';
import { ModalProps } from '@leafygreen-ui/modal';

export const Variant = {
  Default: 'primary',
  Danger: 'danger',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

type CustomButtonProps = Pick<
  ButtonProps,
  | 'children'
  | 'leftGlyph'
  | 'onClick'
  | 'isLoading'
  | 'loadingIndicator'
  | 'loadingText'
>;

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
   * @deprecated
   */
  onConfirm?: () => void;
  /**
   * Callback fired when the cancel button is clicked.
   * @deprecated
   */
  onCancel?: () => void;
  /**
   * Text rendered in the primary button. Defaults to `"Confirm"`
   * @deprecated
   */
  buttonText: string;
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
   */
  submitDisabled?: boolean;

  primaryButtonProps: CustomButtonProps;

  cancelButtonProps: CustomButtonProps;
}
