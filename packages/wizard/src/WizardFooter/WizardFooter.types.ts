import type {
  BackStandardButtonProps,
  CancelStandardButtonProps,
  FormFooterProps,
  PrimaryStandardButtonProps,
} from '@leafygreen-ui/form-footer';

export interface WizardFooterProps
  extends React.ComponentProps<'footer'>,
    FormFooterProps {
  backButtonProps?: BackStandardButtonProps;
  cancelButtonProps?: CancelStandardButtonProps;
  primaryButtonProps: PrimaryStandardButtonProps;
}
