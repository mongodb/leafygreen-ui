import React, { MouseEventHandler } from 'react';

import { Direction } from '@leafygreen-ui/descendants';
import FormFooter from '@leafygreen-ui/form-footer';

import { WIZARD_FOOTER_KEY } from '../constants';
import { useWizardContext } from '../WizardContext/WizardContext';

import { WizardFooterProps } from './WizardFooter.types';

export const WizardFooter = ({
  backButtonProps,
  cancelButtonProps,
  primaryButtonProps,
}: WizardFooterProps) => {
  const { activeStep, updateStep } = useWizardContext();

  const handleBackButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
    updateStep(Direction.Prev);
    backButtonProps?.onClick?.(e);
  };

  const handlePrimaryButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
    updateStep(Direction.Next);
    primaryButtonProps.onClick?.(e);
  };

  return (
    <FormFooter
      backButtonProps={
        activeStep > 0
          ? {
              ...backButtonProps,
              onClick: handleBackButtonClick,
            }
          : undefined
      }
      cancelButtonProps={cancelButtonProps}
      primaryButtonProps={{
        ...primaryButtonProps,
        onClick: handlePrimaryButtonClick,
      }}
    />
  );
};

WizardFooter.displayName = 'WizardFooter';
WizardFooter[WIZARD_FOOTER_KEY] = true;
