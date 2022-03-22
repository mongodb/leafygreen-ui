import React from 'react';

// TODO: replace with common type across all components
export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

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

export type SingleStepStates =
  | StepStates.Completed
  | StepStates.Current
  | StepStates.Upcoming;

export interface StepperProps {
  currentStep: number;
  maxDisplayedSteps?: number;
  completedStepsShown?: number;
  darkMode?: boolean;
  className?: string;
}

export interface InternalStepProps {
  state: StepStates;
  index?: number;
  stepIcon?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  iconSize?: number;
  darkMode?: boolean;
  shouldDisplayLine?: boolean;
}

export type EllipsesStepProps = Omit<InternalStepProps, 'state'> & {
  startingStepIndex: number;
  state: StepStates.CompletedMultiple | StepStates.UpcomingMultiple;
  tooltipContent: Array<
    React.ReactChild | React.ReactFragment | React.ReactPortal
  >;
};

export interface StepIconProps {
  state: StepStates;
  size?: number;
  darkMode?: boolean;
  content?: string | number;
}
