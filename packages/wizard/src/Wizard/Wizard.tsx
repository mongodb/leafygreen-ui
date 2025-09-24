import React, { Children, cloneElement, isValidElement } from 'react';

import { useWizardControlledValue } from '../utils/useWizardControlledValue/useWizardControlledValue';
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
    setValue: setInternalActiveStep,
  } = useWizardControlledValue<number>(activeStepProp, undefined, 0);

  // Handle step changes
  const handleStepChange = (newStep: number) => {
    if (!isControlled) {
      setInternalActiveStep(newStep);
    }
    onStepChange?.(newStep);
  };

  // Filter children to separate steps from footer
  const childrenArray = Children.toArray(children);

  // For now, we'll look for components with displayName ending in 'Step' or 'Footer'
  // This will be more precise once Wizard.Step and Wizard.Footer are implemented
  const stepChildren = childrenArray.filter(child => {
    if (isValidElement(child)) {
      const displayName = (child.type as any)?.displayName;
      return displayName && displayName.includes('Step');
    }

    return false;
  });

  const footerChild = childrenArray.find(child => {
    if (isValidElement(child)) {
      const displayName = (child.type as any)?.displayName;
      return displayName && displayName.includes('Footer');
    }

    return false;
  });

  // Get the current step to render
  const currentStep = stepChildren[activeStep] || null;

  // Clone footer with step navigation handlers if it exists
  const clonedFooter =
    footerChild && isValidElement(footerChild)
      ? cloneElement(footerChild as React.ReactElement<any>, {
          activeStep,
          totalSteps: stepChildren.length,
          onStepChange: handleStepChange,
          isControlled,
        })
      : null;

  return (
    <div className={wizardContainerStyles}>
      <code>activeStep: {activeStep}</code>
      {/* Render current step */}
      <div className={stepContentStyles}>{currentStep}</div>

      {/* Render footer */}
      {clonedFooter}
    </div>
  );
}

Wizard.displayName = 'Wizard';
Wizard.Step = WizardStep;
Wizard.Footer = WizardFooter;
