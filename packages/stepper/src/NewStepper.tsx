import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Step from './NewStep';
import { StepCompletionStates, StepperProps } from './types';
import EllipseStep from './EllipseStep';

const Stepper = ({
  children,
  currentStep,
  maxDisplayedSteps = Array.isArray(children) ? children.length : 1,
  className,
}: StepperProps) => {
  // Constants
  const COMPLETED_STEPS_SHOWN = 1; // Steps shown after prior ellipses and current step

  // Helper Variables
  const numSteps = React.Children.count(children);
  const childrenArray = React.Children.toArray(children);
  const firstDisplayedStep = Math.min(
    Math.max(currentStep - COMPLETED_STEPS_SHOWN, 0),
    numSteps - maxDisplayedSteps + 1, // +1 since Math.max is non-inclusive
  );
  let lastDisplayedStep = firstDisplayedStep + maxDisplayedSteps;
  const hasPriorSteps = currentStep - COMPLETED_STEPS_SHOWN > 0;
  const hasLaterSteps = lastDisplayedStep <= numSteps;
  if (hasPriorSteps) lastDisplayedStep--; // one step will be the prior ellipses
  if (hasLaterSteps) lastDisplayedStep--; // one step will be the later ellipses

  const getStepState = (step: number) => {
    if (step < currentStep) {
      return StepCompletionStates.Completed;
    } else if (step === currentStep) {
      return StepCompletionStates.Current;
    } else {
      return StepCompletionStates.Upcoming;
    }
  };

  // Helper Functions
  const getPriorEllipseState = () =>
    currentStep - COMPLETED_STEPS_SHOWN > 1
      ? StepCompletionStates.CompletedMultiple
      : StepCompletionStates.Completed;

  const isLastNonEllipseStep = (step: number) => step + 1 === numSteps;

  const getStepRangeText: (startStep: number, endStep?: number) => string = (
    startStep,
    endStep,
  ) => {
    const stepRange = endStep ? endStep - startStep : 0;

    if (stepRange < 1) {
      return `Step ${startStep}`;
    } else if (stepRange === 1) {
      return `Steps ${startStep} and ${endStep}`;
    } else {
      return `Steps ${startStep} to ${endStep}`;
    }
  };

  const baseStyles = css`
    list-style: none;
    padding-inline-start: 0;
    width: 100%;
    display: flex;
    & > * {
      flex: 1;
    }
  `;

  return (
    <ol className={cx(baseStyles, className)}>
      {hasPriorSteps && (
        <EllipseStep
          state={getPriorEllipseState()}
          tooltipContent={childrenArray.slice(0, firstDisplayedStep)}
        >
          {getStepRangeText(1, firstDisplayedStep)}
        </EllipseStep>
      )}
      {React.Children.map(
        childrenArray.slice(firstDisplayedStep, lastDisplayedStep),
        (stepContents, i) => (
          <Step
            state={getStepState(firstDisplayedStep + i)}
            shouldDisplayLine={!isLastNonEllipseStep(firstDisplayedStep + i)}
            index={firstDisplayedStep + i + 1}
          >
            {stepContents}
          </Step>
        ),
      )}
      {hasLaterSteps && (
        <EllipseStep
          state={StepCompletionStates.UpcomingMultiple}
          shouldDisplayLine={false}
          tooltipContent={childrenArray.slice(lastDisplayedStep, numSteps)}
        >
          {getStepRangeText(lastDisplayedStep + 1, numSteps)}
        </EllipseStep>
      )}
    </ol>
  );
};

export default Stepper;
