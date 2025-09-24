import React from 'react';

import {
  stepContentStyles,
  stepDescriptionStyles,
  stepTitleStyles,
} from './WizardStep.styles';
import { WizardStepProps } from './WizardStep.types';

export function WizardStep({ title, description, children }: WizardStepProps) {
  return (
    <div>
      <div className={stepTitleStyles}>{title}</div>
      {description && (
        <div className={stepDescriptionStyles}>{description}</div>
      )}
      <div className={stepContentStyles}>{children}</div>
    </div>
  );
}

WizardStep.displayName = 'WizardStep';
