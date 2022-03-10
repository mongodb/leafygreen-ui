import React from 'react';

export enum StepStates {
  CompletedMultiple = 'completed-multiple',
  Completed = 'completed',
  Current = 'current',
  Upcoming = 'upcoming',
  UpcomingMultiple = 'upcoming-multiple',
}

export type EllipsesStepStates =
  | StepStates.CompletedMultiple
  | StepStates.UpcomingMultiple;

export interface StepperProps {
  currentStep: number;
  maxDisplayedSteps?: number;
  completedStepsShown?: number;
  className?: string;
}

export interface StepProps {
  state: StepStates;
  index?: number;
  stepIcon?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  iconSize?: number;
  shouldDisplayLine?: boolean;
}

export type EllipsesStepProps = Omit<StepProps, 'state'> & {
  startingStepIndex: number;
  state: StepStates.CompletedMultiple | StepStates.UpcomingMultiple;
  tooltipContent: Array<
    React.ReactChild | React.ReactFragment | React.ReactPortal
  >;
};

export interface StepIconProps {
  state: StepStates;
  size?: number;
  content?: string | number;
}
