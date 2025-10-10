import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { cx } from '@leafygreen-ui/emotion';
import { consoleOnce } from '@leafygreen-ui/lib';
import { Description, H3 } from '@leafygreen-ui/typography';

import { WizardSubComponentProperties } from '../constants';
import { getLgIds } from '../utils/getLgIds';
import { useWizardContext } from '../WizardContext';

import { TextNode } from './TextNode';
import { stepStyles } from './WizardStep.styles';
import { WizardStepProps } from './WizardStep.types';

export const WizardStep = CompoundSubComponent(
  ({ title, description, children, className, ...rest }: WizardStepProps) => {
    const { isWizardContext, lgId } = useWizardContext();
    const LGIDs = getLgIds(lgId);

    if (!isWizardContext) {
      consoleOnce.error(
        'Wizard.Step component must be used within a Wizard context.',
      );
      return null;
    }

    return (
      <div
        className={cx(stepStyles, className)}
        data-lgid={LGIDs.step}
        data-testid={LGIDs.step}
        {...rest}
      >
        <TextNode as={H3}>{title}</TextNode>
        {description && <TextNode as={Description}>{description}</TextNode>}
        <div>{children}</div>
      </div>
    );
  },
  {
    displayName: 'WizardStep',
    key: WizardSubComponentProperties.Step,
  },
);
