import React from 'react';

export enum StepCompletionStates {
  CompletedMultiple = 'completed-multiple',
  Completed = 'completed',
  Current = 'current',
  Upcoming = 'upcoming',
  UpcomingMultiple = 'upcoming-multiple',
}

export type StepElements = React.ReactNode;

export interface StepperProps {
  currentStep: number;
  maxDisplayedSteps?: number;
  children: StepElements;
  className?: string;
}

export interface StepProps {
  children: React.ReactNode;
  state: StepCompletionStates;
  index?: number;
  stepIcon?: React.ReactNode;
  className?: string;
  iconSize?: number;
  shouldDisplayLine?: boolean;
}

export interface StepIconProps {
  state: StepCompletionStates;
  size?: number;
  content?: string | number;
}
