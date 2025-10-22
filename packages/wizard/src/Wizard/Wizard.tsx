import React, { useCallback } from 'react';

import {
  CompoundComponent,
  findChild,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { useControlled } from '@leafygreen-ui/hooks';

import { WizardSubComponentProperties } from '../constants';
import { WizardProvider } from '../WizardContext/WizardContext';
import { WizardFooter } from '../WizardFooter';
import { WizardStep } from '../WizardStep';

import { wizardContainerStyles } from './Wizard.styles';
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
      (step: number) => {
        // Clamp the step value between 0 and stepChildren.length - 1
        const clampedStep = Math.max(
          0,
          Math.min(step, stepChildren.length - 1),
        );
        setActiveStep(clampedStep);
      },
      [setActiveStep, stepChildren.length],
    );

    // Get the current step to render
    const currentStep = stepChildren[activeStep] || null;

    return (
      <WizardProvider activeStep={activeStep} updateStep={updateStep}>
        <div className={wizardContainerStyles} {...rest}>
          {currentStep}
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
