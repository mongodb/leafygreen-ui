import React, { PropsWithChildren } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Step from './Step';
import { StepStates, StepperProps } from './types';
import EllipsesStep from './EllipsesStep';

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
  // first non-Ellipses step displayed
  let firstDisplayedStep = Math.min(
    Math.max(currentStep - completedStepsShown, 0),
    numSteps - maxDisplayedSteps,
  );
  let lastDisplayedStep = firstDisplayedStep + maxDisplayedSteps;
  const hasPriorSteps = currentStep > completedStepsShown;
  const hasLaterSteps = lastDisplayedStep < numSteps;
  if (hasPriorSteps) firstDisplayedStep++; // one step will be the prior Ellipsess
  if (hasLaterSteps) lastDisplayedStep--; // one step will be the later Ellipsess

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
  const hasPriorEllipses = () => currentStep > completedStepsShown;

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
      {hasPriorEllipses() && (
        <EllipsesStep
          state={StepStates.CompletedMultiple}
          startingStepIndex={1}
          tooltipContent={childrenArray.slice(0, firstDisplayedStep)}
        >
          {getStepRangeText(1, firstDisplayedStep)}
        </EllipsesStep>
      )}
      {React.Children.map(
        childrenArray.slice(firstDisplayedStep, lastDisplayedStep),
        (stepContents, i) => (
          <li>
            <Step
              state={getStepState(firstDisplayedStep + i)}
              shouldDisplayLine={!isLastStep(firstDisplayedStep + i)}
              index={firstDisplayedStep + i + 1}
            >
              {stepContents}
            </Step>
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
  );
};

export default Stepper;
