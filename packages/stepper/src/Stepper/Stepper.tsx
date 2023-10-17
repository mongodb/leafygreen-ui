import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { EllipsesStep } from '../EllipsesStep';
import { InternalStep } from '../InternalStep';

import { baseStyles } from './Stepper.styles';
import { StepperProps, StepStates } from './Stepper.types';

export const Stepper = ({
  children,
  currentStep,
  maxDisplayedSteps = Array.isArray(children) ? children.length : 1,
  completedStepsShown = 1,
  darkMode: darkModeProp,
  className,
  ...rest
}: StepperProps) => {
  const { darkMode } = useDarkMode(darkModeProp);
  // Helper Variables
  const numSteps = React.Children.count(children);
  maxDisplayedSteps = Math.min(maxDisplayedSteps, numSteps);
  const childrenArray = React.Children.toArray(children);
  // first non-Ellipses step displayed
  let firstDisplayedStep = Math.min(
    Math.max(currentStep - completedStepsShown, 0),
    numSteps - maxDisplayedSteps,
  );
  let lastDisplayedStep = firstDisplayedStep + maxDisplayedSteps;
  const hasPriorSteps = firstDisplayedStep > 0;
  const hasLaterSteps = lastDisplayedStep < numSteps;
  if (hasPriorSteps) firstDisplayedStep++; // one step will be the prior Ellipses
  if (hasLaterSteps) lastDisplayedStep--; // one step will be the later Ellipses

  const getStepState = (step: number) => {
    if (step < currentStep) {
      return StepStates.Completed;
    } else if (step === currentStep) {
      return StepStates.Current;
    } else {
      return StepStates.Upcoming;
    }
  };

  // Helper Functions
  const isLastStep = (step: number) => step + 1 === numSteps;

  const getStepRangeText: (startStep: number, endStep: number) => string = (
    startStep,
    endStep,
  ) => {
    const stepRange = endStep - startStep;

    if (stepRange === 1) {
      return `Steps ${startStep} and ${endStep}`;
    } else {
      return `Steps ${startStep} to ${endStep}`;
    }
  };

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ol className={cx(baseStyles, className)} aria-label="progress" {...rest}>
        {hasPriorSteps && (
          <EllipsesStep
            state={StepStates.CompletedMultiple}
            startingStepIndex={1}
            shouldDisplayLine={maxDisplayedSteps > 1}
            tooltipContent={childrenArray.slice(0, firstDisplayedStep)}
          >
            {getStepRangeText(1, firstDisplayedStep)}
          </EllipsesStep>
        )}
        {React.Children.map(
          childrenArray.slice(firstDisplayedStep, lastDisplayedStep),
          (stepContents, i) => (
            <li>
              <InternalStep
                state={getStepState(firstDisplayedStep + i)}
                shouldDisplayLine={!isLastStep(firstDisplayedStep + i)}
                index={firstDisplayedStep + i + 1}
              >
                {stepContents}
              </InternalStep>
            </li>
          ),
        )}
        {hasLaterSteps && (
          <EllipsesStep
            state={StepStates.UpcomingMultiple}
            startingStepIndex={lastDisplayedStep + 1}
            shouldDisplayLine={false}
            tooltipContent={childrenArray.slice(lastDisplayedStep, numSteps)}
          >
            {getStepRangeText(lastDisplayedStep + 1, numSteps)}
          </EllipsesStep>
        )}
      </ol>
    </LeafyGreenProvider>
  );
};

Stepper.displayName = 'Stepper';

Stepper.propTypes = {
  currentStep: PropTypes.number,
  maxDisplayedSteps: PropTypes.number,
  completedStepsShown: PropTypes.number,
};
