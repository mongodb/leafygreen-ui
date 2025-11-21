import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import {
  useWizardStepContext,
  Wizard,
  WizardStepProps,
} from '@leafygreen-ui/wizard';

import { DeleteWizardSubComponentKeys } from './compoundComponentProperties';

export const useDeleteWizardStepContext = useWizardStepContext;

/**
 * A wrapper around Wizard.Step
 */
export const DeleteWizardStep = CompoundSubComponent(
  (props: WizardStepProps) => {
    return <Wizard.Step {...props} />;
  },
  {
    displayName: 'DeleteWizardStep',
    key: DeleteWizardSubComponentKeys.Step,
  },
);
