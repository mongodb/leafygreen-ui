import React from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';
import { cx } from '@leafygreen-ui/emotion';
import { Wizard } from '@leafygreen-ui/wizard';

import { wizardWrapperStyles } from './DeleteWizard.styles';
import { DeleteWizardProps } from './DeleteWizard.types';
import { DeleteWizardFooter } from './DeleteWizardFooter';
import {
  DeleteWizardHeader,
  DeleteWizardHeaderKey,
} from './DeleteWizardHeader';
import { DeleteWizardStepContents } from './DeleteWizardStepContents';

export const DeleteWizard = CompoundComponent(
  ({ children, className }: DeleteWizardProps) => {
    const header = findChild(children, DeleteWizardHeaderKey);

    return (
      <div className={cx(wizardWrapperStyles, className)}>
        {header}
        <Wizard>{children}</Wizard>
      </div>
    );
  },
  {
    displayName: 'DeleteWizard',
    Header: DeleteWizardHeader,
    Step: Wizard.Step,
    StepContent: DeleteWizardStepContents,
    Footer: DeleteWizardFooter,
  },
);
