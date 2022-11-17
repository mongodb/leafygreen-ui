import { StepStates } from '../types';

export const getStepState = (step: number, currentStep: number) => {
  if (step < currentStep) {
    return StepStates.Completed;
  } else if (step === currentStep) {
    return StepStates.Current;
  } else {
    return StepStates.Upcoming;
  }
};

// Helper Functions
export const isLastStep = (step: number, numSteps: number) =>
  step + 1 === numSteps;

export const getStepRangeText: (
  startStep: number,
  endStep: number,
) => string = (startStep, endStep) => {
  const stepRange = endStep - startStep;

  if (stepRange === 1) {
    return `Steps ${startStep} and ${endStep}`;
  } else {
    return `Steps ${startStep} to ${endStep}`;
  }
};
