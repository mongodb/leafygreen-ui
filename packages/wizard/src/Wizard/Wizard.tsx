import React, { Children, isValidElement } from 'react';

import { Direction } from '@leafygreen-ui/descendants';
import { findChild } from '@leafygreen-ui/lib';

import { WIZARD_FOOTER_KEY } from '../constants';
import { useWizardControlledValue } from '../utils/useWizardControlledValue/useWizardControlledValue';
import { WizardContext } from '../WizardContext/WizardContext';
import { WizardFooter } from '../WizardFooter';
import { WizardStep } from '../WizardStep';

import { stepContentStyles, wizardContainerStyles } from './Wizard.styles';
import { WizardProps } from './Wizard.types';

export function Wizard({
  activeStep: activeStepProp,
  onStepChange,
  children,
}: WizardProps) {
  // Controlled/Uncontrolled activeStep value
  const {
    isControlled,
    value: activeStep,
    setValue: setActiveStep,
  } = useWizardControlledValue<number>(activeStepProp, undefined, 0);

  const stepChildren = Children.toArray(children).filter(child => {
    if (isValidElement(child)) {
      const displayName = (child.type as any)?.displayName;
      return displayName && displayName.includes('Step');
    }

    return false;
  });

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

  const footerChild = findChild(children, WIZARD_FOOTER_KEY);

  // Get the current step to render
  const currentStep = stepChildren[activeStep] || null;

  return (
    <WizardContext.Provider
      value={{
        activeStep,
        updateStep,
      }}
    >
      <div className={wizardContainerStyles}>
        <div className={stepContentStyles}>{currentStep}</div>
        {/* Render footer */}
        {footerChild}
      </div>
    </WizardContext.Provider>
  );
}

Wizard.displayName = 'Wizard';
Wizard.Step = WizardStep;
Wizard.Footer = WizardFooter;
