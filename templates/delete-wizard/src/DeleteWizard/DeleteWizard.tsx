import React from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';
import { cx } from '@leafygreen-ui/emotion';
import { useWizardContext, Wizard } from '@leafygreen-ui/wizard';

import { DeleteWizardSubComponentKeys } from './compoundComponentProperties';
import { wizardWrapperStyles } from './DeleteWizard.styles';
import { DeleteWizardProps } from './DeleteWizard.types';
import { DeleteWizardFooter } from './DeleteWizardFooter';
import { DeleteWizardHeader } from './DeleteWizardHeader';
import { DeleteWizardStep } from './DeleteWizardStep';
import { DeleteWizardStepContent } from './DeleteWizardStepContents';

/**
 * A re-export of `useWizardContext` specifically for this DeleteWizard
 */
export const useDeleteWizardContext = useWizardContext;

/**
 * The parent DeleteWizard component.
 * Pass a `DeleteWizard.Header` and any number of `DeleteWizard.Step`s as children
 */
export const DeleteWizard = CompoundComponent(
  ({ activeStep, onStepChange, children, className }: DeleteWizardProps) => {
    const header = findChild(children, DeleteWizardSubComponentKeys.Header);

    return (
      <div className={cx(wizardWrapperStyles, className)}>
        {header}
        <Wizard activeStep={activeStep} onStepChange={onStepChange}>
          {children}
        </Wizard>
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
     * A styled `div` for use inside a `DeleteWizard.Step` to ensure proper page scrolling and footer positioning
     */
    StepContent: DeleteWizardStepContent,

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
