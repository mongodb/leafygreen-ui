import { FormFooterProps } from '@leafygreen-ui/form-footer';

export interface WizardFooterProps {
  /**
   * Props for the back button (left-most button)
   */
  backButtonProps?: FormFooterProps['backButtonProps'];

  /**
   * Props for the cancel button (center button)
   */
  cancelButtonProps?: FormFooterProps['cancelButtonProps'];

  /**
   * Props for the primary button (right-most button)
   */
  primaryButtonProps?: FormFooterProps['primaryButtonProps'];

  // Internal props passed by the Wizard component
  /** @internal */
  activeStep?: number;
  /** @internal */
  totalSteps?: number;
  /** @internal */
  onStepChange?: (step: number) => void;
  /** @internal */
  isControlled?: boolean;
}
