import React, { useCallback } from 'react';

import {
  CompoundComponent,
  findChild,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { Direction } from '@leafygreen-ui/descendants';
import { useControlled } from '@leafygreen-ui/hooks';

import { WizardSubComponentProperties } from '../constants';
import { getLgIds } from '../utils/getLgIds';
import { WizardProvider } from '../WizardContext/WizardContext';
import { WizardFooter } from '../WizardFooter';
import { WizardStep } from '../WizardStep';

import { stepContentStyles, wizardContainerStyles } from './Wizard.styles';
import { WizardProps } from './Wizard.types';

export const Wizard = CompoundComponent(
  ({
    activeStep: activeStepProp,
    onStepChange,
    children,
    'data-lgid': dataLgid,
    ...rest
  }: WizardProps) => {
    const LGIDs = getLgIds(dataLgid);
    const stepChildren = findChildren(
      children,
      WizardSubComponentProperties.Step,
    );
    const footerChild = findChild(
      children,
      WizardSubComponentProperties.Footer,
    );

    // Controlled/Uncontrolled activeStep value
    const { value: activeStep, updateValue: setActiveStep } =
      useControlled<number>(activeStepProp, onStepChange, 0);

    if (
      activeStepProp &&
      (activeStepProp < 0 || activeStepProp >= stepChildren.length)
    ) {
      // Not consoleOnce, since we want to warn again if the step changes
      console.warn(
        'LeafyGreen Wizard received (zero-indexed) `activeStep` prop exceeding the number of Steps provided\n',
        `Received activeStep: ${activeStepProp}, Wizard.Steps count: ${stepChildren.length}`,
      );
    }

    const updateStep = useCallback(
      (direction: Direction) => {
        const getNextStep = (curr: number) => {
          switch (direction) {
            case Direction.Next:
              return Math.min(curr + 1, stepChildren.length - 1);
            case Direction.Prev:
              return Math.max(curr - 1, 0);
          }
        };

        // TODO pass getNextStep into setter as callback https://jira.mongodb.org/browse/LG-5607
        const nextStep = getNextStep(activeStep);
        setActiveStep(nextStep);
      },
      [activeStep, setActiveStep, stepChildren.length],
    );

    // Get the current step to render
    const currentStep = stepChildren[activeStep] || null;

    return (
      <WizardProvider activeStep={activeStep} updateStep={updateStep}>
        <div
          className={wizardContainerStyles}
          data-lgid={LGIDs.root}
          data-testid={LGIDs.root}
          {...rest}
        >
          <div className={stepContentStyles}>{currentStep}</div>
          {footerChild}
        </div>
      </WizardProvider>
    );
  },
  {
    displayName: 'Wizard',
    Step: WizardStep,
    Footer: WizardFooter,
  },
);

/**
 * 🤚 Wizard.
 * 🤚 Wizard.
 * 🤚 Wizard.
 * ...
 * 🤚 Wizard. 🤚 Wizard. 🤚 Wizard.
 * https://youtu.be/5jGWMtEhS1c
 */
