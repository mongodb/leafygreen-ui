import React from 'react';

import FormFooter from '@leafygreen-ui/form-footer';

import { WizardFooterProps } from './WizardFooter.types';

export function WizardFooter({
  backButtonProps,
  cancelButtonProps,
  primaryButtonProps,
}: WizardFooterProps) {
  // Handle back button click

  return (
    <FormFooter
      backButtonProps={backButtonProps}
      cancelButtonProps={cancelButtonProps}
      primaryButtonProps={primaryButtonProps}
    />
  );
}

WizardFooter.displayName = 'WizardFooter';
