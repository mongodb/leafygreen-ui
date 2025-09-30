import React from 'react';

import { TextNode, Description, H3 } from '@leafygreen-ui/typography';

import { stepStyles } from './WizardStep.styles';
import { WizardStepProps } from './WizardStep.types';
import { WizardSubComponentProperties } from '../constants';

export function WizardStep({ title, description, children }: WizardStepProps) {
  return (
    <div className={stepStyles}>
      <TextNode as={H3}>{title}</TextNode>
      {description && <TextNode as={Description}>{description}</TextNode>}
      <div>{children}</div>
    </div>
  );
}

WizardStep.displayName = 'WizardStep';
WizardStep[WizardSubComponentProperties.Step] = true;
