import React from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';
import { cx } from '@leafygreen-ui/emotion';
import { Wizard } from '@leafygreen-ui/wizard';

import { DeleteWizardSubComponentKeys } from './compoundComponentProperties';
import { wizardWrapperStyles } from './DeleteWizard.styles';
import { DeleteWizardProps } from './DeleteWizard.types';
import { DeleteWizardContextProvider } from './DeleteWizardContext';
import { DeleteWizardFooter } from './DeleteWizardFooter';
import { DeleteWizardHeader } from './DeleteWizardHeader';
import { DeleteWizardStep } from './DeleteWizardStep';

/**
 * The parent DeleteWizard component.
 * Pass a `DeleteWizard.Header` and any number of `DeleteWizard.Step`s as children
 */
export const DeleteWizard = CompoundComponent(
  ({
    activeStep,
    children,
    className,
    onCancel,
    onDelete,
    onStepChange,
  }: DeleteWizardProps) => {
    const header = findChild(children, DeleteWizardSubComponentKeys.Header);

    return (
      <div className={cx(wizardWrapperStyles, className)}>
        {header}
        <DeleteWizardContextProvider onCancel={onCancel} onDelete={onDelete}>
          <Wizard activeStep={activeStep} onStepChange={onStepChange}>
            {children}
          </Wizard>
        </DeleteWizardContextProvider>
      </div>
    );
  },
  {
    displayName: 'DeleteWizard',
    /**
     * A wrapper around the {@link CanvasHeader} component for embedding into a DeleteWizard
     */
    Header: DeleteWizardHeader,

    /**
     * A simple wrapper around Wizard.Step to ensure correct Wizard context
     */
    Step: DeleteWizardStep,

    /**
     * A wrapper around Wizard.Footer with embedded styles for the DeleteWizard template.
     * Render this inside of each Step with the relevant button props for that Step.
     *
     * Back and Primary buttons trigger onStepChange.
     * Automatically renders the "Back" button for all Steps except the first
     */
    Footer: DeleteWizardFooter,
  },
);
