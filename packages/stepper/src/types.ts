import React from 'react';

export enum StepCompletionStates {
  CompletedMultiple = 'completed-multiple',
  Completed = 'completed',
  Current = 'current',
  Upcoming = 'upcoming',
  UpcomingMultiple = 'upcoming-multiple',
}

export interface StepperProps {
  currentStep: number;
  maxDisplayedSteps?: number;
  completedStepsShown?: number;
  className?: string;
}

export interface StepProps {
  state: StepCompletionStates;
  index?: number;
  stepIcon?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  iconSize?: number;
  shouldDisplayLine?: boolean;
}

export type EllipseStepProps = Omit<StepProps, 'state'> & {
  startingStepIndex?: number;
  state:
    | StepCompletionStates.CompletedMultiple
    | StepCompletionStates.UpcomingMultiple;
  tooltipContent: Array<
    React.ReactChild | React.ReactFragment | React.ReactPortal
  >;
};

export interface StepIconProps {
  state: StepCompletionStates;
  size?: number;
  content?: string | number;
}
