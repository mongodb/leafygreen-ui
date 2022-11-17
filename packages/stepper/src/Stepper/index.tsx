import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@leafygreen-ui/emotion';
import Step from '../InternalStep';
import { StepperProps } from './types';
import { StepStates } from '../types';
import EllipsesStep from '../EllipsesStep';
import StepperContextProvider from '../StepperContext';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import baseStyles from './styles';
import { getStepRangeText, getStepState, isLastStep } from './utils';

const Stepper = ({
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

  return (
    <StepperContextProvider darkMode={darkMode}>
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
              <Step
                state={getStepState(firstDisplayedStep + i, currentStep)}
                shouldDisplayLine={
                  !isLastStep(firstDisplayedStep + i, numSteps)
                }
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
    </StepperContextProvider>
  );
};

Stepper.propTypes = {
  currentStep: PropTypes.number,
  maxDisplayedSteps: PropTypes.number,
  completedStepsShown: PropTypes.number,
};

export default Stepper;
