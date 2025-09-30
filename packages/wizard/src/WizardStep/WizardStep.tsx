import React from 'react';

import { Description, H3 } from '@leafygreen-ui/typography';

import { stepStyles } from './WizardStep.styles';
import { WizardStepProps } from './WizardStep.types';
import { WizardSubComponentProperties } from '../constants';
import { TextNode } from './TextNode';
import { useWizardContext } from '../WizardContext/WizardContext';
import { consoleOnce } from '@leafygreen-ui/lib';

export function WizardStep({
  title,
  description,
  children,
  ...rest
}: WizardStepProps) {
  const { isWizardContext } = useWizardContext();

  if (!isWizardContext) {
    consoleOnce.error(
      'Wizard.Step component must be used within a Wizard context.',
    );
    return null;
  }

  return (
    <div className={stepStyles} {...rest}>
      <TextNode as={H3}>{title}</TextNode>
      {description && <TextNode as={Description}>{description}</TextNode>}
      <div>{children}</div>
    </div>
  );
}

WizardStep.displayName = 'WizardStep';
WizardStep[WizardSubComponentProperties.Step] = true;
