import React, { PropsWithChildren } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Step from './NewStep';
import { StepCompletionStates, StepperProps } from './types';
import EllipseStep from './EllipseStep';

const Stepper = ({
  children,
  currentStep,
  maxDisplayedSteps = Array.isArray(children) ? children.length : 1,
  completedStepsShown = 1,
  className,
}: PropsWithChildren<StepperProps>) => {
  // Helper Variables
  const numSteps = React.Children.count(children);
  const childrenArray = React.Children.toArray(children);
  let firstDisplayedStep = Math.min(
    Math.max(currentStep - completedStepsShown, 0),
    numSteps - maxDisplayedSteps,
  );
  let lastDisplayedStep = firstDisplayedStep + maxDisplayedSteps;
  const hasPriorSteps = currentStep > completedStepsShown;
  const hasLaterSteps = lastDisplayedStep < numSteps;
  if (hasPriorSteps) firstDisplayedStep++; // one step will be the prior ellipses
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
  const hasPriorEllipse = () => currentStep > completedStepsShown;

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
      {hasPriorEllipse() && (
        <EllipseStep
          state={StepCompletionStates.CompletedMultiple}
          tooltipContent={childrenArray.slice(
            0,
            currentStep - firstDisplayedStep,
          )}
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
