import { DarkModeProps } from '@leafygreen-ui/lib';
import React, { Dispatch } from 'react';

export interface StepperContextValues {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<React.SetStateAction<boolean>>;
  stepIconClassName: string;
  stepLabelClassName: string;
}

// TODO: replace with common type across all components
export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;
export type Mode = typeof Mode[keyof typeof Mode];

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

export interface StepperProps extends DarkModeProps {
  currentStep: number;
  maxDisplayedSteps?: number;
  completedStepsShown?: number;
  className?: string;
}

export interface InternalStepProps {
  state: StepStates;
  index?: number;
  stepIcon?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  iconSize?: number;
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
  content?: string | number;
}

export type StepLabelProps = Pick<InternalStepProps, 'state'>;
