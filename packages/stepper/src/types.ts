import React, { Dispatch } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

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

export interface StepperProps extends HTMLElementProps<'ol'> {
  /**
   * The index of the step that should be marked as current. (zero-indexed)
   *
   * *NOTE:* Validations for this prop's value in relation to `completedStepsShown` and `maxDisplayedSteps` are not yet implemented.
   */
  currentStep: number;
  /**
   * Maximum number of steps displayed in the stepper. Includes the ellipses steps.
   *
   * *NOTE:* Validations for this prop's value in relation to `completedStepsShown` and `currentStep` are not yet implemented.
   *
   * @default children.length | 1
   */
  maxDisplayedSteps?: number;
  /**
   * Number of completed steps shown before the upcoming steps are displayed. Includes the ellipses step for prior steps.
   *
   * *NOTE:* Validations for this prop's value in relation to `maxDisplayedSteps` and `currentStep` are not yet implemented.
   */
  completedStepsShown?: number;
  darkMode?: boolean;
  className?: string;
}

export interface InternalStepProps extends HTMLElementProps<'div'> {
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
