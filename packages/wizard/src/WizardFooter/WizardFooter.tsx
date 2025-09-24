import React from 'react';

import FormFooter from '@leafygreen-ui/form-footer';

import { WizardFooterProps } from './WizardFooter.types';

export function WizardFooter({
  backButtonProps,
  cancelButtonProps,
  primaryButtonProps,
  activeStep = 0,
  totalSteps = 1,
  onStepChange,
  isControlled: _isControlled,
}: WizardFooterProps) {
  // Handle back button click
  const handleBackClick = () => {
    if (activeStep > 0) {
      onStepChange?.(activeStep - 1);
    }
  };

  // Handle primary button click (forward navigation)
  const handlePrimaryClick = () => {
    if (activeStep < totalSteps - 1) {
      onStepChange?.(activeStep + 1);
    }
  };

  // Merge navigation handlers with user-provided props
  const mergedBackButtonProps = backButtonProps
    ? {
        ...backButtonProps,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          backButtonProps.onClick?.(event);
          if (!event.defaultPrevented) {
            handleBackClick();
          }
        },
      }
    : undefined;

  const mergedPrimaryButtonProps = primaryButtonProps
    ? {
        ...primaryButtonProps,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          primaryButtonProps.onClick?.(event);
          if (!event.defaultPrevented) {
            handlePrimaryClick();
          }
        },
      }
    : undefined;

  // Hide back button if we're on the first step
  const finalBackButtonProps =
    activeStep === 0 ? undefined : mergedBackButtonProps;

  return (
    <FormFooter
      backButtonProps={finalBackButtonProps}
      cancelButtonProps={cancelButtonProps}
      primaryButtonProps={
        mergedPrimaryButtonProps || { children: 'Next', variant: 'primary' }
      }
    />
  );
}

WizardFooter.displayName = 'WizardFooter';
