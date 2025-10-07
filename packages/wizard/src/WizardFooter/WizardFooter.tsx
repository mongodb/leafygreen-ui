import React, { MouseEventHandler } from 'react';

import { Direction } from '@leafygreen-ui/descendants';
import { FormFooter } from '@leafygreen-ui/form-footer';
import { consoleOnce } from '@leafygreen-ui/lib';

import { WizardSubComponentProperties } from '../constants';
import { CompoundSubComponent } from '../utils/CompoundSubComponent';
import { useWizardContext } from '../WizardContext';

import { WizardFooterProps } from './WizardFooter.types';

export const WizardFooter = CompoundSubComponent(
  ({
    backButtonProps,
    cancelButtonProps,
    primaryButtonProps,
    ...rest
  }: WizardFooterProps) => {
    const { isWizardContext, activeStep, updateStep } = useWizardContext();

    const handleBackButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
      updateStep(Direction.Prev);
      backButtonProps?.onClick?.(e);
    };

    const handlePrimaryButtonClick: MouseEventHandler<
      HTMLButtonElement
    > = e => {
      updateStep(Direction.Next);
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
  },
  {
    displayName: 'WizardFooter',
    [WizardSubComponentProperties.Footer]: true,
  },
);
