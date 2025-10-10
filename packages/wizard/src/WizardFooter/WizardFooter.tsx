import React, { MouseEventHandler } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Direction } from '@leafygreen-ui/descendants';
import { FormFooter } from '@leafygreen-ui/form-footer';
import { consoleOnce } from '@leafygreen-ui/lib';

import { WizardSubComponentProperties } from '../constants';
import { getLgIds } from '../utils/getLgIds';
import { useWizardContext } from '../WizardContext';

import { WizardFooterProps } from './WizardFooter.types';

export const WizardFooter = CompoundSubComponent(
  ({
    backButtonProps,
    cancelButtonProps,
    primaryButtonProps,
    className,
    ...rest
  }: WizardFooterProps) => {
    const { isWizardContext, activeStep, updateStep, lgId } =
      useWizardContext();
    const LGIDs = getLgIds(lgId);

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
        data-lgid={LGIDs.footer}
        data-testid={LGIDs.footer}
        className={className}
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
    key: WizardSubComponentProperties.Footer,
  },
);
