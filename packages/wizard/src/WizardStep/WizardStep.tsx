import React from 'react';

import {
  CompoundSubComponent,
  filterChildren,
  findChild,
} from '@leafygreen-ui/compound-component';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { consoleOnce } from '@leafygreen-ui/lib';

import { WizardSubComponentProperties } from '../constants';
import { useWizardContext } from '../WizardContext';

import { WizardStepProps } from './WizardStep.types';
import { WizardStepProvider } from './WizardStepContext';

export const WizardStep = CompoundSubComponent(
  ({ children, requiresAcknowledgement = false }: WizardStepProps) => {
    const stepId = useIdAllocator({ prefix: 'wizard-step' });
    const { isWizardContext, lgIds } = useWizardContext();

    if (!isWizardContext) {
      consoleOnce.error(
        'Wizard.Step component must be used within a Wizard context.',
      );
      return null;
    }

    const footerChild = findChild(
      children,
      WizardSubComponentProperties.Footer,
    );

    const restChildren = filterChildren(children, [
      WizardSubComponentProperties.Footer,
    ]);

    return (
      <div data-lgid={lgIds.step}>
        <WizardStepProvider
          stepId={stepId}
          requiresAcknowledgement={requiresAcknowledgement}
        >
          {restChildren}
          {footerChild}
        </WizardStepProvider>
      </div>
    );
  },
  {
    displayName: 'WizardStep',
    key: WizardSubComponentProperties.Step,
  },
);
