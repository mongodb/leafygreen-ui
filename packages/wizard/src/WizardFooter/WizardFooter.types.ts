import { FormFooterProps } from '@leafygreen-ui/form-footer';

export interface WizardFooterProps extends React.ComponentProps<'footer'> {
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
  primaryButtonProps: FormFooterProps['primaryButtonProps'];
}
