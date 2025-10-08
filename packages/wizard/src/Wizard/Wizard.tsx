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
    // Controlled/Uncontrolled activeStep value
    const {
      isControlled,
      value: activeStep,
      setValue: setActiveStep,
    } = useWizardControlledValue<number>(activeStepProp, undefined, 0);

    const stepChildren = findChildren(
      children,
      WizardSubComponentProperties.Step,
    );
    const footerChild = findChild(
      children,
      WizardSubComponentProperties.Footer,
    );

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
