import React from 'react';

import { Direction } from '@leafygreen-ui/descendants';
import { findChild, findChildren } from '@leafygreen-ui/lib';

import { WizardSubComponentProperties } from '../constants';
import { CompoundComponent } from '../utils/CompoundComponent';
import { useWizardControlledValue } from '../utils/useWizardControlledValue/useWizardControlledValue';
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
    ...rest
  }: WizardProps) => {
    const stepChildren = findChildren(
      children,
      WizardSubComponentProperties.Step,
    );
    const footerChild = findChild(
      children,
      WizardSubComponentProperties.Footer,
    );

    // Controlled/Uncontrolled activeStep value
    const {
      isControlled,
      value: activeStep,
      setValue: setActiveStep,
    } = useWizardControlledValue<number>(activeStepProp, undefined, 0);

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

    const updateStep = (direction: Direction) => {
      const getNextStep = (curr: number) => {
        switch (direction) {
          case Direction.Next:
            return Math.min(curr + 1, stepChildren.length - 1);
          case Direction.Prev:
            return Math.max(curr - 1, 0);
        }
      };

      if (!isControlled) {
        setActiveStep(getNextStep);
      }

      onStepChange?.(getNextStep(activeStep));
    };

    // Get the current step to render
    const currentStep = stepChildren[activeStep] || null;

    return (
      <WizardProvider activeStep={activeStep} updateStep={updateStep}>
        <div className={wizardContainerStyles} {...rest}>
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
