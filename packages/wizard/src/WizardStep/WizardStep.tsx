import React from 'react';

import { Description, H3 } from '@leafygreen-ui/typography';

import { stepStyles } from './WizardStep.styles';
import { WizardStepProps } from './WizardStep.types';

export function WizardStep({ title, description, children }: WizardStepProps) {
  return (
    <div className={stepStyles}>
      <H3>{title}</H3>
      {description && <Description>{description}</Description>}
      <div>{children}</div>
    </div>
  );
}

WizardStep.displayName = 'WizardStep';
