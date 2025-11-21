import React, { MouseEventHandler } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { FormFooter } from '@leafygreen-ui/form-footer';
import { consoleOnce } from '@leafygreen-ui/lib';

import { WizardSubComponentProperties } from '../constants';
import { useWizardContext } from '../WizardContext';
import { useWizardStepContext } from '../WizardStep';

import { WizardFooterProps } from './WizardFooter.types';

export const WizardFooter = CompoundSubComponent(
  ({
    backButtonProps,
    cancelButtonProps,
    primaryButtonProps,
    className,
    ...rest
  }: WizardFooterProps) => {
    const { isWizardContext, activeStep, updateStep } = useWizardContext();
    const { isAcknowledged, requiresAcknowledgement } = useWizardStepContext();
    const isPrimaryButtonDisabled = requiresAcknowledgement && !isAcknowledged;

    const handleBackButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
      updateStep(activeStep - 1);
      backButtonProps?.onClick?.(e);
    };

    const handlePrimaryButtonClick: MouseEventHandler<
      HTMLButtonElement
    > = e => {
      updateStep(activeStep + 1);
      primaryButtonProps.onClick?.(e);
    };

    if (!isWizardContext) {
      consoleOnce.error(
        'Wizard.Footer component must be used within a Wizard context.',
      );
      return null;
    }

    return (
      <FormFooter
        {...rest}
        className={className}
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
          disabled: isPrimaryButtonDisabled,
          onClick: handlePrimaryButtonClick,
        }}
      />
    );
  },
  {
    displayName: 'WizardFooter',
    key: WizardSubComponentProperties.Footer,
  },
);
